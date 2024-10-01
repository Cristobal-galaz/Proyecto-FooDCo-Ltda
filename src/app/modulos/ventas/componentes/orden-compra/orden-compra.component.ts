import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orden-compra',
  standalone: true,
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css']
})
export class OrdenCompraComponent {
  constructor(private router: Router) {}

  switchToEnglish() {
    this.router.navigate(['/orden-compra-en']);
  }
}
