import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../../../Service/conexion/conexion.service';

@Component({
  selector: 'app-eje-personal-en',
  templateUrl: './eje-personal-en.component.html',
  styleUrls: ['./eje-personal-en.component.scss']
})
export class EjePersonalEnComponent implements OnInit {
  message: string | null = null;

  constructor(private router: Router, private conexionService: ConexionService) {}

  ngOnInit() {
    this.conexionService.buttonClicked$.subscribe(() => {
      this.message = 'Button in Personal component was clicked!';
    });
  }

  sendNotification() {
    this.conexionService.notifyButtonClicked();
  }

  goToInicio() {
    this.router.navigate(['/inicio']);
  }

  toggleLanguage() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('-en')) {
      this.router.navigate([currentUrl.replace('-en', '')]);
    } else {
      this.router.navigate([`${currentUrl}-en`]);
    }
  }
}
