import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../../Service/conexion/conexion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eje-inicio',
  standalone: true,
  templateUrl: './eje-inicio.component.html',
  styleUrls: ['./eje-inicio.component.scss']
})


export class EjeInicioComponent implements OnInit {
  message: string | null = null;

  constructor(private router: Router, private conexionService: ConexionService) {}

  ngOnInit() {
    this.conexionService.buttonClicked$.subscribe(() => {
      this.message = '¡El botón en el componente Eje-inicio fue clickeado!';
    });
  }

  toggleLanguage() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('-en')) {
      this.router.navigate([currentUrl.replace('-en', '')]);
    } else {
      this.router.navigate([`${currentUrl}-en`]);
    }
  }

  goToOrden() {
    this.router.navigate(['/orden']);
  }
}
