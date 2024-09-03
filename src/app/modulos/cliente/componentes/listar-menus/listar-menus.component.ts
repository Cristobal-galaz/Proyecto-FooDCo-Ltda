import { Component, OnInit } from '@angular/core';
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
import { ApiMenusService } from '../../services/api-menus.service';
import { Menu, Producto } from '../../interfaces/alimento';
@Component({
  selector: 'app-listar-menus',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule, CommonModule, MatTabsModule, 
    ProductoComponent, MatFormFieldModule, MatInputModule, FiltrarProductoComponent, ListaProductosComponent],
  templateUrl: './listar-menus.component.html',
  styleUrl: './listar-menus.component.scss'

})
export class ListarMenusComponent implements OnInit {
  constructor(private menus:ApiMenusService) {}

  ngOnInit(): void {
    this.menus.getMenus().subscribe(
      (data: any) => {
        data.menus.forEach((menu: Menu) => {
          const dietaEncontrada = this.dietas.find(d => d.nombre === menu.dieta);
          if (dietaEncontrada) {
            dietaEncontrada.dieta = dietaEncontrada.dieta.concat(menu.productos);
          }
          
        }); 
        console.log(this.dietas);
      },
      (error) => {
        console.error('Error al obtener los menús', error);
      }
    );
  }
  
  productos: Producto[] = [];

  dietaSeleccionada: string = '';

  dietas = [
    {
      nombre: 'Omnivoro',
      imagen: 'assets/images/dietas/omnivoro.webp',
      dieta: [] as Producto[]
    },
    {
      nombre: 'Vegetariano',
      imagen: 'assets/images/dietas/vegetariano.webp',
      dieta: [] as Producto[]
    },
    {
      nombre: 'Vegano',
      imagen: 'assets/images/dietas/vegano.webp',
      dieta: [] as Producto[]
    },
    {
      nombre: 'Sin Gluten',
      imagen: 'assets/images/dietas/sin_gluten.webp',
      dieta: [] as Producto[]
    },
    {
      nombre: 'Todo incluido',
      imagen: 'assets/images/dietas/todo.webp',
      dieta: [] as Producto[]
    }
  ];
  tipos = ["Cafeteria", "Eventos", "Snacks"]
  tipo = this.tipos[0];

  seleccionarDieta(dieta: string){
      this.dietaSeleccionada = dieta;
      const dietaEncontrada = this.dietas.find(d => d.nombre === this.dietaSeleccionada);
      if (dietaEncontrada) {
          this.productos = dietaEncontrada.dieta;
          this.productos = this.productos.filter(producto => producto.tipoDeServicio === this.tipo);
      }
  }

  productosFiltrados(tipo: string): Producto[] {
    return this.productos.filter(producto => producto.tipoDeServicio === tipo);
  }

  onTabChange(event: any): void {
    const tipoSeleccionado = this.tipos[event.index];
    this.tipo = tipoSeleccionado;
    const dietaEncontrada = this.dietas.find(d => d.nombre === this.dietaSeleccionada);
    if (dietaEncontrada) {
      this.productos = dietaEncontrada.dieta;
      this.productos = this.productos.filter(producto => producto.tipoDeServicio === tipoSeleccionado);
    }
    console.log(this.productos);// Aquí puedes realizar cualquier acción adicional que necesites al cambiar de pestaña
    
  }


}
