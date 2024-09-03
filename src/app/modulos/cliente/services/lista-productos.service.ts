import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Producto} from '../interfaces/alimento'

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

}
