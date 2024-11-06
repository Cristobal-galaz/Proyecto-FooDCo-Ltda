import { Component, HostListener} from '@angular/core';
import { NavBarClienteComponent } from '../../modulos/cliente/componentes/nav-bar-cliente/nav-bar-cliente.component';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { TodosPedidosComponent } from '../../modulos/cliente/componentes/pedidos/todos-pedidos/todos-pedidos.component';
import { ActualesComponent } from '../../modulos/cliente/componentes/pedidos/actuales/actuales.component';
import { CompletadosComponent } from '../../modulos/cliente/componentes/pedidos/completados/completados.component';
import { DatosEmpresaComponent } from '../../modulos/cliente/componentes/editar/datos-empresa/datos-empresa.component';

import { NavbarVentasComponent } from "../../modulos/ventas/componentes/navbar-ventas/navbar-ventas.component";
import { EjeInicioComponent } from '../../modulos/ventas/componentes/Espanol-comp/eje-inicio/eje-inicio.component';
import { EjePersonalComponent } from '../../modulos/ventas/componentes/Espanol-comp/eje-personal/eje-personal.component';
import { SubcontratosComponent } from '../../modulos/ventas/componentes/Espanol-comp/subcontratos/subcontratos.component';
import { VentasPagoComponent } from '../../modulos/ventas/componentes/Espanol-comp/ventas-pago/ventas-pago.component';
import { MostrarordenComponent } from '../../modulos/ventas/componentes/Espanol-comp/mostrarorden/mostrarorden.component';
import { OrdenCompraComponent } from '../../modulos/cliente/componentes/orden-compra/orden-compra.component';

import { UserService } from '../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NavbarDespachoComponent } from '../../modulos/Despacho/navbar-despacho/navbar-despacho.component';
import { AsignacionDespachoComponent } from '../../modulos/Despacho/componentes/asignacion-despacho/asignacion-despacho.component';
import { DetalleDespachoComponent } from '../../modulos/Despacho/componentes/detalle-despacho/detalle-despacho.component';




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
              MatIconModule,
              MatProgressSpinnerModule,
              OrdenCompraComponent,
              MostrarordenComponent,
              VentasPagoComponent,
              EjeInicioComponent,
              EjePersonalComponent,
              SubcontratosComponent,
              NavbarVentasComponent,
              NavbarDespachoComponent,
              AsignacionDespachoComponent,
              DetalleDespachoComponent,
            ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  rol!: string| null;
  isSmallScreen: boolean = false;
  menuOpen: boolean = false;
  isLoading: boolean = true; 
  constructor (private user: UserService, private router: Router) {}

  ngOnInit() {
    this.checkScreenSize();
    this.loadUserRole();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    if (typeof window !== 'undefined') {
      this.isSmallScreen = window.innerWidth < 960;
    }
  }

  loadUserRole() {
    setTimeout(() => {
      // Simula la carga
      this.rol = this.user.getRolUser();
      this.navigateByRole();
      this.isLoading = false; // Quita el spinner cuando la carga esté completa
    }, 2000); // Tiempo simulado de carga
  }

  navigateByRole() {
    if (this.rol === 'Cliente') {
      this.router.navigate(['/dashboard/cliente']);
    } else if (this.rol === 'Ejecutivo de Ventas') {
      this.router.navigate(['/dashboard/ventas']);
    } else if (this.rol === 'Desarrollador') {
      this.router.navigate(['/dashboard/despacho']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }


}