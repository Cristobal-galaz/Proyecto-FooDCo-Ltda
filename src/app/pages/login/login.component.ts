import { Component } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { AuthEmpleadoService } from '../../services/auth-empleado.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatTab, MatTabGroup, FormsModule, CommonModule, MatButton],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  error: string = "";

  constructor(private authService: AuthService, private router: Router, private authServices: AuthEmpleadoService){

  }

  login(): void{
    this.authService.login(this.email, this.password).subscribe({
      next: ()=> {
        window.close();
        this.router.navigate(["cliente/menus"]);
      },
      error: (err) => {
        this.error = err.error.message;
        console.error("Login failed", err)}
    });
  }

  loginEmpleado(): void{
    this.authServices.login(this.email, this.password).subscribe({
      next: ()=> {
        this.router.navigate(["dashboard"]);
      },
      error: (err) => {
        this.error = err.error.message;
        console.error("Login failed", err)}
    });
  }
}
