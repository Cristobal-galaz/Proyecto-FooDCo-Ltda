import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaProductosComponent } from "./lista-productos/lista-productos.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { PersonalComponent } from "./personal/personal.component";
import { CarritoComponent } from './carrito/carrito.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaProductosComponent, NavbarComponent, PersonalComponent, CarritoComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'modulo2';
}
