import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { Main, Links, Otros } from '../../interface/NavBar';
import { MainEN, LinksEN, OtrosEN } from '../../interface/NavBarEN';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'app-navbar-ventas',
  standalone: true,
  imports: [RouterLink, RouterLinkActive , MatSidenavModule, MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar-ventas.component.html',
  styleUrl: './navbar-ventas.component.scss'
})
export class NavbarVentasComponent {
  main = Main;
  otros = Otros;

  mainEN = MainEN;
  otrosEN = OtrosEN;

  constructor(private auth: AuthService) { }

  childrenAccessor = (node: Links) => node.children ?? [];

  childrenAccessorEN = (node: LinksEN) => node.children ?? [];

  hasChild = (_: number, node: Links) => !!node.children && node.children.length > 0;
  logout(){
    this.auth.logout();
  }

  hasChildEN = (_: number, node: LinksEN) => !!node.children && node.children.length > 0;
  logoutEN(){
    this.auth.logout();
  }


}
