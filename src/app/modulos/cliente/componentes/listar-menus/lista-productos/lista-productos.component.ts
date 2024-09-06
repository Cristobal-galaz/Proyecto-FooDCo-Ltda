import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CantidadProducto } from '../../../interfaces/alimento';
import { ListaProductosService } from '../../../services/lista-productos.service';
@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.scss'
})
export class ListaProductosComponent {
  constructor(private listaProductoService: ListaProductosService){}

  listaProductos?: CantidadProducto[];

  ngOnInit(): void {
    this.listaProductoService.listaProductos.subscribe(
      cantidadProducts => {
        this.listaProductos = cantidadProducts;
      });

  }
  }

