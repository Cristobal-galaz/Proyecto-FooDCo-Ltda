import { Component } from '@angular/core';
import { ListarMenusComponent } from '../../../modulos/cliente/componentes/listar-menus/listar-menus.component';

@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [ListarMenusComponent],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss'
})
export class MenusComponent {

}
