import { Component } from '@angular/core';
import { ListarMenusComponent } from '../../../modulos/cliente/componentes/listar-menus/listar-menus.component';
import { FiltrarProductoComponent } from '../../../modulos/cliente/componentes/listar-menus/filtrar-producto/filtrar-producto.component';

@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [ListarMenusComponent, FiltrarProductoComponent],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss'
})
export class MenusComponent {

}
