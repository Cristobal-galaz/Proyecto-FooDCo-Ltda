import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormArray} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ListaProductosService } from '../../services/lista-productos.service';
import { CantidadProducto } from '../../interfaces/alimento';
@Component({
  selector: 'app-orden-compra',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatTableModule],
  templateUrl: './orden-compra.component.html',
  styleUrl: './orden-compra.component.scss'
})
export class OrdenCompraComponent {


  constructor(private listaProductosService:ListaProductosService) {  }
  
  private _formBuilder = inject(FormBuilder);

  dataSource!: MatTableDataSource<CantidadProducto>;
  seleccionPedidos = this._formBuilder.group({
    direccion: ['', Validators.required],
    ciudad: ['', Validators.required],
    pais: ['', Validators.required],
    productos: this._formBuilder.array([])
  });



  ngOnInit(): void {
    // Suscribirse al servicio y llenar el FormArray
    this.listaProductosService.listaProductos.subscribe(cantidadProductos => {
      this.dataSource = new MatTableDataSource(cantidadProductos);
      this.clearProductosFormArray();
      cantidadProductos.forEach(producto => {
        this.agregarProductoAlFormulario(producto);
      });
    });
    console.log(this.seleccionPedidos.value);
  }

  displayedColumns: string[] = ['nombre', 'cantidad', 'acciones'];
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  get productos(): FormArray {
    return this.seleccionPedidos.get('productos') as FormArray;
  }

  // Función para agregar un producto al FormArray usando la interfaz CantidadProducto
  agregarProductoAlFormulario(producto: CantidadProducto) {
    const productoForm = this._formBuilder.group({
        nombre: [producto.producto.nombre, Validators.required],
        cantidad: [producto.cantidad, [Validators.required, Validators.min(1)]]
      });
    this.productos.push(productoForm);
  }

  // Limpiar el FormArray antes de agregar nuevos productos
  clearProductosFormArray() {
    while (this.productos.length !== 0) {
      this.productos.removeAt(0);
    }
  }

  // Función para eliminar un producto del FormArray
  eliminarProducto(index: number) {
    this.productos.removeAt(index);
    this.dataSource.data.splice(index, 1); // Elimina también del dataSource
    this.dataSource._updateChangeSubscription(); // Refresca la tabla
  }

  

}
