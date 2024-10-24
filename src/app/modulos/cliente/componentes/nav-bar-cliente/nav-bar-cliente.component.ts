import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { Main, Links, Otros } from '../../interfaces/navBar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService} from '../../../../services/auth.service';



@Component({
  selector: 'app-nav-bar-cliente',
  standalone: true,
  imports: [RouterLink, RouterLinkActive , MatSidenavModule, MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './nav-bar-cliente.component.html',
  styleUrl: './nav-bar-cliente.component.scss'
})
export class NavBarClienteComponent {
  main = Main;
  otros = Otros;

  constructor(private auth: AuthService) { }

  childrenAccessor = (node: Links) => node.children ?? [];

  hasChild = (_: number, node: Links) => !!node.children && node.children.length > 0;
  logout(){
    this.auth.logout();
  }

}
