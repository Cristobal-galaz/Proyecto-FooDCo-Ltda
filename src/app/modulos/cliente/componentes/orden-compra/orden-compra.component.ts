import { ChangeDetectionStrategy, ChangeDetectorRef, Component, model, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { ConfirmComponent } from '../layout/confirm/confirm.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { ListaProductosService } from '../../services/lista-productos.service';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { CantidadProducto } from '../../interfaces/alimento';
import { MatDividerModule } from '@angular/material/divider';
import { BlobOptions } from 'buffer';
import { DatePipe } from '@angular/common';
import { UserService } from '../../../../services/user.service';
import { ApiMenusService } from '../../services/api-menus.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-orden-compra',
  standalone: true,
  providers: [provideNativeDateAdapter(), DatePipe],
  imports: [MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    ConfirmComponent,
    MatDatepickerModule,
    MatButtonToggleModule,
  MatDividerModule],
  templateUrl: './orden-compra.component.html',
  styleUrl: './orden-compra.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class OrdenCompraComponent {
  readonly dialog = inject(MatDialog);
  form!: FormGroup;
  listaProductos: CantidadProducto[] = [];
  descuento: number = 0.2;
  envio: number = 0;
  abrirFormulario: boolean = false;
  private _snackBar = inject(MatSnackBar);

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    
    private servicioListaProducto: ListaProductosService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private user: UserService,
    private apiMenu: ApiMenusService,
    private router: Router
  ) { 
    this.form = this.fb.group({
      productos: this.fb.array([]),
      fechaRequerida: [null, Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      pais: ['', Validators.required],
      clienteId: [this.user.getIdUser(), Validators.required] 
    })
  }

  ngOnInit() {
    this.servicioListaProducto.productos.subscribe(
      (productos) => {
        this.listaProductos = productos;
      }
    )
  }

  get totalCompra(): number {
    return (this.listaProductos ?? []).reduce((total, producto) => {
      return ((total + this.envio + producto.producto.precio * producto.cantidad) * (1 - this.descuento));
    }, 0);
  }
  get subTotalCompra(): number {
    return (this.listaProductos ?? []).reduce((total, producto) => {
      return (total + producto.producto.precio * producto.cantidad);
    }, 0);
  }

  get descuentoCompra(): number {
    return (this.listaProductos ?? []).reduce((total, producto) => {
      return ((total + producto.producto.precio * producto.cantidad) * this.descuento) ;
    }, 0);
  }  

  get productos(): FormArray {
    return this.form.get('productos') as FormArray
  }

  dateFilter = (date: Date | null): boolean => {
    const today = new Date(); // Fecha actual
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Hoy
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15); // 15 días después de hoy

    return date !== null && date >= minDate && date >= maxDate; // Solo fechas dentro del rango permitido
  };

  actualizarDireccion(calle: string, numero: string, departamento: string): void {
    const direccion = `${calle} ${numero}${departamento ? ', ' + departamento : ''}`.trim();
    this.form.get('direccion')?.setValue(direccion);
  }

  private setProductos(productos: CantidadProducto[]) {
    this.productos.clear();

    productos.forEach((producto) => {
      this.productos.push(
        this.fb.group({
          nombre: [producto.producto.nombre],
          imagen: [producto.producto.imagenes[0]],
          precio: [producto.producto.precio],
          producto: [producto.producto._id, Validators.required],
          cantidad: [producto.cantidad, Validators.required]
        })
      )
    })
  }

  onFechaChange(event: any): void {
    const fechaSeleccionada = event.value;
    const fechaFormateada = this.datePipe.transform(fechaSeleccionada, 'yyyy-MM-dd'); // Formato deseado
    this.form.get('fechaRequerida')?.setValue(fechaFormateada);
    console.log('Fecha formateada:', fechaFormateada); // Confirmar el formato
  }

  deleteProducto(producto:number){
    this.servicioListaProducto.deleteProducto(producto);
    console.log('componente', this.listaProductos);
  }

  editarProducto(producto: number, cantidad: number) {
    console.log(producto);
    this.servicioListaProducto.editProducto(producto, cantidad);
    console.log('componente', this.listaProductos);
  }

  manejarFormulario() {
    if (this.servicioListaProducto.totalProductos === 0){
      this.openSnackBar('No hay productos elegidos');
    }
    else {
      this.abrirFormulario = !this.abrirFormulario;
    }
  }

  onSubmit() {
    
    if (this.form.valid){
      if(this.servicioListaProducto.totalProductos === 0){ 
        this.openSnackBar('No hay productos elegidos');      
      return;
    }

    this.setProductos(this.listaProductos);      
    this.apiMenu.sendOrdenCompra(this.form.value);
    this.onBack();
    this.openSnackBar('Pedido creado, espere que nuestros ejecutivos se contacto con usted');  
    }
    else{
      
    }    
  }

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }


  onBack() {
    this.router.navigate(['/home']); // Usa navigate para ir a la ruta deseada
  }

}
