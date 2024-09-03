import { Injectable } from '@angular/core';
import { Menu } from '../interfaces/alimento';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MostrarProductosService {

  private menus: Menu[] = []
  private _menus: BehaviorSubject<Menu[]>;

  constructor() { 
    this._menus = new BehaviorSubject<Menu[]>([]);
  }


  get listamMenus(){
    return this._menus.asObservable();
  } 
}
