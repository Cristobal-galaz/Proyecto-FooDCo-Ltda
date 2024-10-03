import { Component } from '@angular/core';
import { AuthEmpleadoService } from '../../../services/auth-empleado.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-empleados',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-empleados.component.html',
  styleUrl: './login-empleados.component.scss'
})
export default class LoginEmpleadosComponent {
  email: string = "";
  password: string = "";

  constructor(private authService: AuthEmpleadoService, private router: Router){

  }

  login(): void{
    this.authService.login(this.email, this.password).subscribe({
      next: ()=> this.router.navigate(["cliente/menus"]),
      error: (err) => console.error("Login failed", err)
    });
  }
}
