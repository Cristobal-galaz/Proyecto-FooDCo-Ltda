import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import { ProductoComponent } from './producto/producto.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FiltrarProductoComponent } from './filtrar-producto/filtrar-producto.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';


@Component({
  selector: 'app-listar-menus',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule, CommonModule, MatTabsModule, 
    ProductoComponent, MatFormFieldModule, MatInputModule, FiltrarProductoComponent, ListaProductosComponent],
  templateUrl: './listar-menus.component.html',
  styleUrl: './listar-menus.component.scss'

})
export class ListarMenusComponent  {
  constructor() {}
  
  dietaSeleccionada: string = '';

  productos: string[] = Array.from({ length: 200 }, (_, i) => `Producto${i + 1}`);


  dietas = [
    {
      nombre: 'Omnivoro',
      imagen: 'assets/images/dietas/omnivoro.webp'
    },
    {
      nombre: 'Vegetariano',
      imagen: 'assets/images/dietas/vegetariano.webp'
    },
    {
      nombre: 'Vegano',
      imagen: 'assets/images/dietas/vegano.webp'
    },
    {
      nombre: 'Sin gluten',
      imagen: 'assets/images/dietas/sin_gluten.webp'
    },
    {
      nombre: 'Todo incluido',
      imagen: 'assets/images/dietas/todo.webp'
    }
  ];
  tipos = ["Cafeteria", "Eventos", "Snacks"]


  seleccionarDieta(dieta: string){
    this.dietaSeleccionada = dieta;
    console.log(this.dietaSeleccionada);
    console.log(this.productos);
  }
}