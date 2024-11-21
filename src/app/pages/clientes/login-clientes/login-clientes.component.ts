import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-login-clientes',
  standalone: true,
  imports: [FormsModule, CommonModule, MatButton],
  templateUrl: './login-clientes.component.html',
  styleUrl: './login-clientes.component.scss'
})
export class LoginClientesComponent {
  email: string = "";
  password: string = "";
  error: string = "";

  constructor(private authService: AuthService, private router: Router){

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
}
