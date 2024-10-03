import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orden-compra-en',
  standalone: true,
  templateUrl: './orden-compra-en.component.html',
  styleUrls: ['./orden-compra-en.component.css']
})
export class OrdenCompraEnComponent {
  constructor(private router: Router) {}

  switchToSpanish() {
    // Redirige a la versión en español de la orden de compra
    this.router.navigate(['/orden-compra']);
  }
}
