import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../interfaces/task';
@Injectable({
  providedIn: 'root'
})
export class MostrarProductosService {

  filters: Task = ({
    name: 'Categoria',
    completed: false,
    subtasks: [
      {name: 'Desayuno', completed: false},
      {name: 'Almuerzo', completed: false},
      {name: 'Cena', completed: false},
      {name: 'Colación', completed: false},
    ],
  });
  
  private _filters: BehaviorSubject<Task>;
  

  constructor() {
    this._filters = new BehaviorSubject<Task>(this.filters);
  }

  updateFilters(newfilters: Task) {
    this.filters = newfilters;
    this._filters.next(newfilters);

    console.log(this.filters);
  }

  get filters$() {
    return this._filters.asObservable();
  }

}