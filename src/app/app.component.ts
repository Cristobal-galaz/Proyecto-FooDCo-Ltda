import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { FooterComponent } from './core/footer/footer.component';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive, FormsModule, FooterComponent, NavBarComponent, MatButtonModule, MatTabsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Proyecto-FooDCo-Ltda';
}
