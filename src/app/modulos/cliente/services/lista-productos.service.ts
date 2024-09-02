import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Producto} from '../interfaces/producto'

@Injectable({
  providedIn: 'root'
})
export class ListaProductosService {

  private productos: Producto[] = [];
  private _productos: BehaviorSubject<Producto[]>;

  constructor() {
    this._productos = new BehaviorSubject<Producto[]>([]);
   }


   get listaProductos(){
    return this._productos.asObservable();
   }

   agregarProducto(productoBuscado: Producto) {
    const productoExistente = this.productos.find(producto => producto.nombre === productoBuscado.nombre);
    if (productoExistente) {
      productoExistente.cantidad += productoBuscado.cantidad;
    } else {
      this.productos.push(productoBuscado);
    }
  }
}
