import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './modulos/ventas/componentes/navbar/navbar.component';
import { PersonalComponent } from './modulos/ventas/componentes/personal/personal.component';

import { InicioComponent } from "./modulos/ventas/componentes/inicio/inicio.component";
import { OrdenCompraComponent } from './modulos/ventas/componentes/orden-compra/orden-compra.component';
import { MostrarordenComponent } from './modulos/ventas/componentes/mostrarorden/mostrarorden.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, PersonalComponent, InicioComponent,OrdenCompraComponent, MostrarordenComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'modulo2';
}
