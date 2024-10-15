import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subcontratos',
  standalone: true,
  imports: [],
  templateUrl: './subcontratos.component.html',
  styleUrls: ['./subcontratos.component.scss']
})
export class SubcontratosComponent {
  constructor(private router: Router) {}

  switchLanguage() {
    this.router.navigate(['/subcontratos-en']);
  }
}
