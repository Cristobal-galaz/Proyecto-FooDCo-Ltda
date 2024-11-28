import { Component } from '@angular/core';
import { ListarMenusComponent } from '../../../modulos/cliente/componentes/listar-menus/listar-menus.component';
import { FiltrarProductoComponent } from '../../../modulos/cliente/componentes/listar-menus/filtrar-producto/filtrar-producto.component';
import { ListaProductosComponent } from '../../../modulos/cliente/componentes/listar-menus/lista-productos/lista-productos.component';
import {CdkDrag} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [ListarMenusComponent, FiltrarProductoComponent, ListaProductosComponent, CdkDrag],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss'
})
export class MenusComponent {

}
