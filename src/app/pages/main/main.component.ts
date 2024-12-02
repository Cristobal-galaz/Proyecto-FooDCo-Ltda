import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { TranslateModule} from '@ngx-translate/core';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(private router: Router){}

  irASeguimiento() {
    this.router.navigate(['/seguimiento']);
  }
  irAMenu() {
    this.router.navigate(['/cliente/menus']);
  }
  irAContacto() {
    this.router.navigate(['/contacto']);
  }
}
