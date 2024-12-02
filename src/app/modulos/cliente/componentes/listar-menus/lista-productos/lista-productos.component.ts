import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CantidadProducto } from '../../../interfaces/alimento';
import { ListaProductosService } from '../../../services/lista-productos.service';
import { RouterLink } from '@angular/router';
import { MatIconModule} from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge'
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [TranslateModule, FormsModule, MatCheckboxModule, MatCardModule, MatButtonModule, RouterLink, MatBadgeModule, MatButtonModule, MatIconModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.scss',
})

export class ListaProductosComponent {
  editMode: boolean = false;

  constructor(private listaProductoService: ListaProductosService){
  }  
  

  listaProductos: CantidadProducto[] = [];

  ngOnInit(): void {
    this.listaProductoService.productos.subscribe(
      cantidadProducts => {
        this.listaProductos = cantidadProducts;
      });

  }

  eliminarSeleccionados() {
    console.log('antes',this.listaProductos);
    const nuevaLista = this.listaProductos.filter(producto => !producto.seleccionado);
    this.listaProductos = nuevaLista;
    this.listaProductoService.actualizarLista(nuevaLista);
  }

  

}
