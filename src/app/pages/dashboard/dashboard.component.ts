import { Component } from '@angular/core';
import { NavbarVentasComponent } from "../../modulos/ventas/componentes/navbar-ventas/navbar-ventas.component";

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { EjeInicioComponent } from '../../modulos/ventas/componentes/Espanol-comp/eje-inicio/eje-inicio.component';
import { EjePersonalComponent } from '../../modulos/ventas/componentes/Espanol-comp/eje-personal/eje-personal.component';
import { SubcontratosComponent } from '../../modulos/ventas/componentes/Espanol-comp/subcontratos/subcontratos.component';
import { VentasPagoComponent } from '../../modulos/ventas/componentes/Espanol-comp/ventas-pago/ventas-pago.component';
import { MostrarordenComponent } from '../../modulos/ventas/componentes/Espanol-comp/mostrarorden/mostrarorden.component';
import { OrdenCompraComponent } from '../../modulos/cliente/componentes/orden-compra/orden-compra.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarVentasComponent,
    RouterOutlet,
    RouterLink, 
    RouterLinkActive,
    MatSidenavModule,
    MatButtonModule,
    OrdenCompraComponent,
    MostrarordenComponent,
    VentasPagoComponent,
    EjeInicioComponent,
    EjePersonalComponent,
    SubcontratosComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor (private user: UserService) {}

  ngOnInit() {
    console.log(this.user.getRolUser());
  }

}
