import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RecoveryPasswordService } from '../../../services/recovery-password.service';
@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  private email: string | null = ""
  codigo: string = ""
  password: string = ""
  password2: string = ""

  constructor(private router: Router, private changePass: RecoveryPasswordService){
    this.email = this.changePass.getEmail();
  }

  ResetPassword(){
    if(this.email && this.password == this.password2){
      this.changePass.resetPassword(this.email, this.codigo, this.password).subscribe({
        next: ()=> this.router.navigate(["login"]),
        error: (err) => console.error("Reset password failed", err)
      })
      localStorage.removeItem("email")
    }else{
      console.log("Las contrasenas son diferentes")
    } 
  }
}
