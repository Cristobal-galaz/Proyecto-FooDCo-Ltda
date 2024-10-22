import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ventas-pago-en',
  standalone: true,
  imports: [],
  templateUrl: './ventas-pago-en.component.html',
  styleUrls: ['./ventas-pago-en.component.scss']
})
export class VentasPagoEnComponent {
  constructor(private router: Router) {}

  switchLanguage() {
    this.router.navigate(['/pago']); // Redirige al componente en español
  }
}