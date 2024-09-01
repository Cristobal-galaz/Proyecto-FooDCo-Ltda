import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import { ProductoComponent } from './producto/producto.component';

@Component({
  selector: 'app-listar-menus',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule, CommonModule, MatTabsModule, ProductoComponent],
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
      imagen: 'assets/images/dietas/omnivoro.jpg'
    },
    {
      nombre: 'Vegetariano',
      imagen: 'assets/images/dietas/vegetariano.jpg'
    },
    {
      nombre: 'Vegano',
      imagen: 'assets/images/dietas/vegano.jpg'
    },
    {
      nombre: 'Sin gluten',
      imagen: 'assets/images/dietas/sin_gluten.jpg'
    }
  ];
  tipos = ["Cafeteria", "Eventos", "Snacks"]


  seleccionarDieta(dieta: string){
    this.dietaSeleccionada = dieta;
    console.log(this.dietaSeleccionada);
    console.log(this.productos);
  }
}
