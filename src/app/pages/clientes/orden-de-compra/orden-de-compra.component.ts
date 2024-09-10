import { Component } from '@angular/core';
import { OrdenCompraComponent } from '../../../modulos/cliente/componentes/orden-compra/orden-compra.component';
@Component({
  selector: 'app-orden-de-compra',
  standalone: true,
  imports: [OrdenCompraComponent],
  templateUrl: './orden-de-compra.component.html',
  styleUrl: './orden-de-compra.component.scss'
})
export class OrdenDeCompraComponent {

}
