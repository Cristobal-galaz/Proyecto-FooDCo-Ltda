import { Component } from '@angular/core';
import { NavBarClienteComponent } from '../../modulos/cliente/componentes/nav-bar-cliente/nav-bar-cliente.component';
import { HistorialComprasComponent } from '../../modulos/cliente/componentes/historial-compras/historial-compras.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavBarClienteComponent, HistorialComprasComponent, RouterOutlet,RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
