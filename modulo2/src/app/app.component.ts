import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from "./navbar/navbar.component";
import { PersonalComponent } from "./personal/personal.component";

import { InicioComponent } from "./inicio/inicio.component";
import { OrdenCompraComponent } from './orden-compra/orden-compra.component';
import { MostrarordenComponent } from './mostrarorden/mostrarorden.component';


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
