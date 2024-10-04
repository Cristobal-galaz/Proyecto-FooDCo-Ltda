import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ventas-pago',
  standalone: true,
  imports: [],
  templateUrl: './ventas-pago.component.html',
  styleUrls: ['./ventas-pago.component.scss']
})
export class VentasPagoComponent {
  constructor(private router: Router) {}

  switchLanguage() {
    this.router.navigate(['/pago-en']); // Redirige al componente en inglés
  }
}
