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
    const productoExistente = this.productos.find(p => p.producto._id === productoCantidad.producto._id);

    if (productoExistente) {
      productoExistente.cantidad += productoCantidad.cantidad;

    } else {
      this.productos.push(productoCantidad);
    }
    this._productos.next(this.productos);
  }

  deleteProducto(index: number) {
    this.productos.splice(index, 1);
    this._productos.next(this.productos);
  }
  editProducto(index: number, cantidad: number){
    this.productos[index].cantidad = cantidad;
    this._productos.next(this.productos);
  }

}
