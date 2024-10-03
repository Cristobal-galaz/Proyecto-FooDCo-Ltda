import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../../../Service/conexion/conexion.service';

@Component({
  selector: 'app-eje-inicio-en',
  templateUrl: './eje-inicio-en.component.html',
  styleUrls: ['./eje-inicio-en.component.scss']
})
export class EjeInicioEnComponent implements OnInit {
  message: string | null = null;

  constructor(private router: Router, private conexionService: ConexionService) {}

  ngOnInit() {
    this.conexionService.buttonClicked$.subscribe(() => {
      this.message = 'Button in Eje-inicio-en component was clicked!';
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
