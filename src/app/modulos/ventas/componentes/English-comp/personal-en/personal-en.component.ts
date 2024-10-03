import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../../Service/conexion/conexion.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal.component.html', 
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
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
  
  goToHome() {
    this.router.navigate(['/home']);  // Navigate to Home component
  }
}
