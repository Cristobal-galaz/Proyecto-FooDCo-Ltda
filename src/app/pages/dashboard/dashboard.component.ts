import { Component} from '@angular/core';
import { NavBarClienteComponent } from '../../modulos/cliente/componentes/nav-bar-cliente/nav-bar-cliente.component';
import { HistorialComprasComponent } from '../../modulos/cliente/componentes/historial-compras/historial-compras.component';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { TodosPedidosComponent } from '../../modulos/cliente/componentes/pedidos/todos-pedidos/todos-pedidos.component';
import { ActualesComponent } from '../../modulos/cliente/componentes/pedidos/actuales/actuales.component';
import { CompletadosComponent } from '../../modulos/cliente/componentes/pedidos/completados/completados.component';
import { DatosEmpresaComponent } from '../../modulos/cliente/componentes/editar/datos-empresa/datos-empresa.component';
import { DatosContactoComponent } from '../../modulos/cliente/componentes/editar/datos-contacto/datos-contacto.component';
import { UserService } from '../../services/user.service';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
              MatSidenavModule,
              MatButtonModule,
              NavBarClienteComponent, 
              RouterOutlet,
              RouterLink, 
              RouterLinkActive,
              TodosPedidosComponent,
              ActualesComponent,
              CompletadosComponent,
              DatosEmpresaComponent,
              DatosContactoComponent
            ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  rol!: string| null;
  constructor (private user: UserService, private router: Router) {}

  ngOnInit() {
    if (this.user.getRolUser() != null){

      this.rol = this.user.getRolUser();
    }

    if (this.rol === 'Cliente') {
      this.router.navigate(['/dashboard/cliente']);
    } else if (this.rol === 'Ejecutivo de Ventas') {
      this.router.navigate(['/dashboard/ventas']);
    } else if (this.rol === 'Encargado de Despacho'){
      this.router.navigate(['/dashboard/despacho']);
    }else {
      this.router.navigate(['/dashboard']);
    };
    }

}
