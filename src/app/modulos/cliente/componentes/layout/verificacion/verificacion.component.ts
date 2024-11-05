import { Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../../../services/user.service';
import { UserProfileService } from '../../../services/user-profile.service';
@Component({
  selector: 'app-verificacion',
  standalone: true,
  imports: [    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './verificacion.component.html',
  styleUrl: './verificacion.component.scss'
})
export class VerificacionComponent {
  readonly dialogRef = inject(MatDialogRef<VerificacionComponent>);
  verificacionForm!: FormGroup;
  error: boolean = false;
  constructor(private fb: FormBuilder, private user: UserService, private profile: UserProfileService) {
    this.verificacionForm = this.fb.group({
      id:[this.user.getIdUser()],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.verificacionForm.valid) {
      const datos = this.verificacionForm.value;
      this.profile.verificationProfile(datos).subscribe(
        (data) => {
          console.log('Respuesta del servidor:', data);
          
          // Actualiza el valor de verificación cuando la verificación sea exitosa
          this.profile.updateVerification();
          this.error = false;
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error al verificar los datos:', error);
          
          // Si el error es por contraseña incorrecta, marcar el campo en rojo
          if (error.status === 401) {  // Suponiendo que el error 401 es de autenticación
            this.verificacionForm.controls['password'].setErrors({ incorrect: true });
            this.error = true;
          }
        }
      );
    }
  }
}
