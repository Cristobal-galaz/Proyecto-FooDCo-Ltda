import { Component } from '@angular/core';
import { AuthEmpleadoService } from '../../../services/auth-empleado.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login-empleados',
  standalone: true,
  imports: [FormsModule, CommonModule, MatButton],
  templateUrl: './login-empleados.component.html',
  styleUrl: './login-empleados.component.scss'
})
export default class LoginEmpleadosComponent {
  email: string = "";
  password: string = "";
  error: string = "";
  constructor(private authService: AuthEmpleadoService, private router: Router){

  }

  login(): void{
    this.authService.login(this.email, this.password).subscribe({
      next: ()=> {
        this.router.navigate(["dashboard"]);
      },
      error: (err) => {
        this.error = err.error.message;
        console.error("Login failed", err)}
    });
  }
}
