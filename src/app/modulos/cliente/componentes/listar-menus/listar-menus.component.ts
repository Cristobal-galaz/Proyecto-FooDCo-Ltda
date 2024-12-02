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
  productos: Producto[] = [];
  menu: Menu[] = [];
  constructor(private menus: ApiMenusService) {}

  ngOnInit(): void {
    this.menus.cargarProductos();

    this.menus.filteredProductos$.subscribe(filteredProductos => {
      this.productos = filteredProductos;
    })
  }
}
