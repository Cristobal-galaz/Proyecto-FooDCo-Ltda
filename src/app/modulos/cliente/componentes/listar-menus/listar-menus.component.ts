import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductoComponent } from './producto/producto.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FiltrarProductoComponent } from './filtrar-producto/filtrar-producto.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ApiMenusService } from '../../services/api-menus.service';
import { Menu, Producto } from '../../interfaces/alimento';
import { MostrarProductosService } from '../../services/mostrar-productos.service';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-listar-menus',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule, CommonModule, MatTabsModule,
    ProductoComponent, MatFormFieldModule, MatInputModule, FiltrarProductoComponent, ListaProductosComponent],
  templateUrl: './listar-menus.component.html',
  styleUrl: './listar-menus.component.scss'
})
export class ListarMenusComponent implements OnInit {
  constructor(private menus: ApiMenusService, private mostrarProductoService: MostrarProductosService) {}

  productos: Producto[] = [];
  filters!: Task;
  dietaSeleccionada: string = '';
  tipos = ["Cafeteria", "Eventos", "Snacks"];
  tipo = this.tipos[0];

  dietas = [
    { nombre: 'Omnivoro', imagen: 'assets/images/dietas/omnivoro.webp', dieta: [] as Producto[] },
    { nombre: 'Vegetariano', imagen: 'assets/images/dietas/vegetariano.webp', dieta: [] as Producto[] },
    { nombre: 'Vegano', imagen: 'assets/images/dietas/vegano.webp', dieta: [] as Producto[] },
    { nombre: 'Sin Gluten', imagen: 'assets/images/dietas/sin_gluten.webp', dieta: [] as Producto[] },
    { nombre: 'Todo incluido', imagen: 'assets/images/dietas/todo.webp', dieta: [] as Producto[] }
  ];

  ngOnInit(): void {
    this.mostrarProductoService.filters$.subscribe(
      (data: Task) => {
        this.filters = data;
        this.applyFilters();
      }
    );

    this.menus.getMenus().subscribe(
      (data: any) => {
        data.menus.forEach((menu: Menu) => {
          const dietaEncontrada = this.dietas.find(d => d.nombre === menu.dieta);
          if (dietaEncontrada) {
            dietaEncontrada.dieta = dietaEncontrada.dieta.concat(menu.productos);
          }
        });
        this.applyFilters();
      },
      (error) => {
        console.error('Error al obtener los menús', error);
      }
    );
  }

  seleccionarDieta(dieta: string): void {
    this.dietaSeleccionada = dieta;
    this.applyFilters();
  }

  applyFilters(): void {
    const dietaEncontrada = this.dietas.find(d => d.nombre === this.dietaSeleccionada);
    if (dietaEncontrada) {
      let productosFiltrados = dietaEncontrada.dieta.filter(producto => producto.tipoDeServicio === this.tipo);

      // Aplicar filtros de categorías seleccionadas
      if (this.filters && this.filters.subtasks) {
        const categoriasSeleccionadas = this.filters.subtasks.filter(subtask => subtask.completed).map(subtask => subtask.name);
        if (categoriasSeleccionadas.length > 0) {
          productosFiltrados = productosFiltrados.filter(producto => categoriasSeleccionadas.includes(producto.categoria));
        }
      }

      this.productos = productosFiltrados;
    }
  }

  onTabChange(event: any): void {
    this.tipo = this.tipos[event.index];
    this.applyFilters();
  }
}
