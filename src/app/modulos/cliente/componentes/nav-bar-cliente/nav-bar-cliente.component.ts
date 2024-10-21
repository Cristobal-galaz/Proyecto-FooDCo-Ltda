import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { Main, Links, Otros } from '../../interfaces/navBar';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-nav-bar-cliente',
  standalone: true,
  imports: [RouterLink,MatSidenavModule, MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './nav-bar-cliente.component.html',
  styleUrl: './nav-bar-cliente.component.scss'
})
export class NavBarClienteComponent {
  main = Main;
  otros = Otros;

  childrenAccessor = (node: Links) => node.children ?? [];

  hasChild = (_: number, node: Links) => !!node.children && node.children.length > 0;
}
