import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  isLogged: boolean = false;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe((isLogged) => {
      this.isLogged = isLogged;
    });
  }

  logout() {
    this.auth.logout();
  }
}
