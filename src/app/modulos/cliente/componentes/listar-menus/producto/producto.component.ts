import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Producto, CantidadProducto } from '../../../interfaces/alimento';
import { ListaProductosService } from '../../../services/lista-productos.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {
constructor(private listaProductosService: ListaProductosService,
  private cdr: ChangeDetectorRef
){}

  @Input() cardProduct!: Producto;

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
