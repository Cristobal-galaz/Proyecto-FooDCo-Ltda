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
  constructor(private router: Router, private recoveryPass: RecoveryPasswordService){
  }
  recoveryPassword(): void{
    this.recoveryPass.recovery(this.email).subscribe({
      next: ()=> this.router.navigate(["change-password"]),
      error: (err) => console.error("Envio de codigo fallido", err)
    })
  }
}
