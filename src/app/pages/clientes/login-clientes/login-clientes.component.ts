import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login-clientes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-clientes.component.html',
  styleUrl: './login-clientes.component.scss'
})
export class LoginClientesComponent {
  email: string = "";
  password: string = "";

  constructor(private authService: AuthService, private router: Router){

  }

  login(): void{
    this.authService.login(this.email, this.password).subscribe({
      next: ()=> this.router.navigate(["cliente/menus"]),
      error: (err) => console.error("Login failed", err)
    });
  }
}
