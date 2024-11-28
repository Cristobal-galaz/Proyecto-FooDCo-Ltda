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
    MatDatepickerModule,
    MatButtonToggleModule],
  templateUrl: './orden-compra.component.html',
  styleUrl: './orden-compra.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class OrdenCompraComponent {
  form!: FormGroup;

  constructor(
    private servicioListaProducto: ListaProductosService,
    private fb: FormBuilder
  ) { 
    this.form = this.fb.group({
      productos: this.fb.array([]),
    })
  }

  ngOnInit() {
    this.servicioListaProducto.productos.subscribe(
      (productos) => {
        this.setProductos(productos);
      }
    )
    console.log(this.productos);
  }

  get productos(): FormArray {
    return this.form.get('productos') as FormArray
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

}
