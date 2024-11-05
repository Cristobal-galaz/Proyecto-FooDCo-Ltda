import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { Main, Links, Otros } from '../interfaces/navBar.js';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar-despacho',
  standalone: true,
  imports: [RouterLink, RouterLinkActive , MatSidenavModule, MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar-despacho.component.html',
  styleUrl: './navbar-despacho.component.scss'
})
export class NavbarDespachoComponent {
  main = Main;
  otros = Otros;

  constructor(private auth: AuthService) { }

  childrenAccessor = (node: Links) => node.children ?? [];

  hasChild = (_: number, node: Links) => !!node.children && node.children.length > 0;
  logout(){
    this.auth.logout();
  }

}
