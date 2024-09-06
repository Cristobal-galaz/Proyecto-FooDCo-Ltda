import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Producto, CantidadProducto } from '../../../interfaces/alimento';
import { ListaProductosService } from '../../../services/lista-productos.service';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, FormsModule, MatInputModule, MatFormFieldModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {
constructor(private listaProductosService: ListaProductosService,
  private cdr: ChangeDetectorRef
){}

  @Input() cardProduct!: Producto;
  cantidadProducto: number = 1;
  showInput = false;

  onSelect(){
    this.showInput = true;
  }

  onClick(producto: Producto) {
    console.log('Producto seleccionado', producto._id);
    const cantidadProducto: CantidadProducto = {
      producto: producto,
      cantidad: 1
    };
    this.listaProductosService.addProductos(cantidadProducto);

    this.cdr.detectChanges();

    console.log(producto.imagenes[0]);
  }



}
