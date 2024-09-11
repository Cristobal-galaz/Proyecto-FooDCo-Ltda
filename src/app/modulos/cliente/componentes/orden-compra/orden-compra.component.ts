import {ChangeDetectionStrategy, ChangeDetectorRef, Component,model, inject, OnInit,ViewEncapsulation }  from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormArray, FormControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule, MatCalendarCellClassFunction} from '@angular/material/datepicker';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ListaProductosService } from '../../services/lista-productos.service';
import { CantidadProducto } from '../../interfaces/alimento';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../layout/confirm/confirm.component';
import { Observable, pairs } from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import { ApiMenusService } from '../../services/api-menus.service';
import {UserService} from '../../../../services/user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-orden-compra',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
  ConfirmComponent,
  MatDatepickerModule],
  templateUrl: './orden-compra.component.html',
  styleUrl: './orden-compra.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdenCompraComponent {
  readonly dialog = inject(MatDialog);
  formOrdenCompra!: FormGroup;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  productos!: CantidadProducto[];
  editMode: boolean[]= [];
  displayedColumns = ['producto','cantidad','acciones'];
  dateInitial!: Date;
  selected = model<Date | null>(null);
constructor(private listaProductosService: ListaProductosService,
  private _fb: FormBuilder, private cd: ChangeDetectorRef,
private apiMenu: ApiMenusService,
private user: UserService, private router:Router) { }


  ngOnInit(): void {
    this.dateInitial = new Date();
    this.dateInitial.setDate(this.dateInitial.getDate() + 15);
    this.formOrdenCompra = this._fb.group({
      productos: this._fb.array([]),
      clienteId: [this.user.getIdUser(), Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      pais: ['', Validators.required],
      fechaRequerida: ['', Validators.required],
    });

    this.listaProductosService.listaProductos.subscribe(
      (productos: CantidadProducto[]) => {
        this.productosForm.clear();
        productos.forEach(producto => {
          this.addCantidad(producto);

          this.editMode = new Array(productos.length).fill(false);
        });
        this.dataSource = new MatTableDataSource(this.productosForm.controls);
      });
  }
  get productosForm(){
    return this.formOrdenCompra.controls['productos'] as FormArray;
  }

  onSubmit() {
    if (this.formOrdenCompra.valid){
      if(this.listaProductosService.totalProductos === 0){
      this.openDialog('sin_productos');
      this.onBack();
      return;
    }      
    this.apiMenu.sendOrdenCompra(this.formOrdenCompra.value);
    }
    else{
      this.openDialog('invalido');
    }
    
  }

  addCantidad(producto: CantidadProducto){
    const formProducto = this._fb.group({
      productoNombre: [producto.producto.nombre],
      producto: [producto.producto._id],
      cantidad: [producto.cantidad]
    });

    this.productosForm.push(formProducto);
    this.dataSource = new MatTableDataSource(this.productosForm.controls);
    this.cd.detectChanges();
  }

  onEdit(index: number){
    this.openDialog('editar').subscribe(result => {
      if(result){
        this.editMode[index] = true;
        this.cd.detectChanges();
      }
    });
  }
  onSave(index: number){
    this.openDialog('confirmar_edicion').subscribe(result => {
      if(result){
        this.editMode[index] = false;
        this.listaProductosService.editProducto(index, this.productosForm.at(index).value.cantidad);
        this.cd.detectChanges();
      }
    });
  }

  onDelete(index: number){
    this.openDialog('eliminar').subscribe(result => {
      if(result){
        this.productosForm.removeAt(index);
        this.dataSource = new MatTableDataSource(this.productosForm.controls);
        this.cd.detectChanges();
        this.listaProductosService.deleteProducto(index);
      }
    });
    
  }

  openDialog(tipoMensaje: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { message: tipoMensaje },
      width: '250px',
      panelClass: ['custom-dialog', 'additional-class-for-animation']
    });
  
    return dialogRef.afterClosed();
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date());
    // Prevent Saturday and Sunday from being selected.
    return day >= this.dateInitial;
  };

  onBack() {
    this.router.navigate(['/cliente/menus']); // Usa navigate para ir a la ruta deseada
  }
}
