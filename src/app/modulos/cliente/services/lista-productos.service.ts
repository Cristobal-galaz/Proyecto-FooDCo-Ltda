import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Producto, CantidadProducto} from '../interfaces/alimento'

@Injectable({
  providedIn: 'root'
})
export class ListaProductosService {


  private _productos= new BehaviorSubject<CantidadProducto[]>([]);
  productos = this._productos.asObservable();
  
  
  constructor() {
   }

   get totalProductos(){
    return this._productos.getValue().length;
   }


   addProductos(productoCantidad: CantidadProducto) {
    const productosActuales = this._productos.getValue(); // Obtiene los productos actuales
    const productoExistente = productosActuales.find(
      p => p.producto._id === productoCantidad.producto._id
    );

    if (productoExistente) {
      // Si el producto ya existe, actualiza la cantidad
      productoExistente.cantidad += productoCantidad.cantidad;
    } else {
      // Si no existe, lo agrega a la lista
      productosActuales.push({ ...productoCantidad });
    }

    // Notifica a los suscriptores con la nueva lista
    this._productos.next([...productosActuales]);
  }


  deleteProducto(i: number) {
    const productosActuales = this._productos.getValue(); // Obtiene la lista actual
  
    if (i >= 0 && i < productosActuales.length) {
      // Verifica que el índice sea válido
      productosActuales.splice(i, 1); // Elimina el producto en la posición indicada
      this._productos.next([...productosActuales]); // Notifica con una nueva copia de la lista
    } else {
      console.error('Índice fuera de rango');
    }
  }

  editProducto(index: number, cantidad: number) {
    const productosActuales = this._productos.getValue(); // Obtiene la lista actual
  
    if (index >= 0 && index < productosActuales.length) {
      // Verifica que el índice sea válido
      productosActuales[index].cantidad = cantidad; // Actualiza la cantidad del producto
      this._productos.next([...productosActuales]); // Notifica con una nueva copia de la lista
    } else {
      console.error('Índice fuera de rango'); // Manejo de errores para índices inválidos
    }
  }
  

  actualizarLista(nuevaLista: CantidadProducto[]){
    this._productos.next(nuevaLista);
    console.log('servicio',this._productos.getValue());
  }

}
