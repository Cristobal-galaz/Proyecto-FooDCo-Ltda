import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subcontratos-en',
  standalone: true,
  imports: [],
  templateUrl: './subcontratos-en.component.html',
  styleUrls: ['./subcontratos-en.component.scss']
})
export class SubcontratosEnComponent {
  constructor(private router: Router) {}

  switchLanguage() {
    this.router.navigate(['/subcontratos']);
  }
}
