import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Producto, CantidadProducto} from '../interfaces/alimento'

@Injectable({
  providedIn: 'root'
})
export class ListaProductosService {

  private productos:  CantidadProducto[] = [];
  private _productos: BehaviorSubject<CantidadProducto[]>;

  constructor() {
    this._productos = new BehaviorSubject<CantidadProducto[]>([]);
   }


   get listaProductos(){
    return this._productos.asObservable();
   }

   addProductos(productoCantidad: CantidadProducto) {
    const productoExistente = this.productos.find(p => p.producto.id === productoCantidad.producto.id);
    
    
    if (productoExistente) {
      productoExistente.cantidad += productoCantidad.cantidad;
      console.log(productoExistente);
    } else {
      this.productos.push(productoCantidad);
      console.log(productoExistente);
    }
    this._productos.next(this.productos);
  }
}
