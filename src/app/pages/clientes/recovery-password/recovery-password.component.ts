import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecoveryPasswordService } from '../../../services/recovery-password.service';


@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.scss'
})
export class RecoveryPasswordComponent {
  email:string = "";
  codigo: string = "";
  password: string = "";
  password2: string = "";
  codigoEnviado: boolean = false;

  constructor(private router: Router, private recoveryPass: RecoveryPasswordService){
  }

  recoveryPassword(): void{
    this.recoveryPass.recovery(this.email).subscribe({
      next: () => {
        console.log("Código enviado correctamente");
        this.codigoEnviado = true;
      },
      error: (err) => console.error("Envio de codigo fallido", err)
    })
  }

  ResetPassword(){
    if(this.email && this.password == this.password2){
      this.recoveryPass.resetPassword(this.email, this.codigo, this.password).subscribe({
        next: ()=> {
          console.log("Contraseña cambiada con éxito");
          this.router.navigate(["login"]);
        },
        error: (err) => console.error("Reset password failed", err)
      })
      localStorage.removeItem("email")
    }else{
      console.log("Las contrasenas son diferentes")
    } 
  }
}
