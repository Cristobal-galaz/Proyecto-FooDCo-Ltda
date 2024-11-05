import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserProfileService } from '../../../services/user-profile.service';
import { Contacto } from '../../../interfaces/profile';
import { UserService } from '../../../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { VerificacionComponent } from '../../layout/verificacion/verificacion.component';

@Component({
  selector: 'app-dato-contacto',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './dato-contacto.component.html',
  styleUrls: ['./dato-contacto.component.scss']
})
export class DatoContactoComponent implements OnInit {
  clientForm: FormGroup;
  editar: boolean = false;
  originalData: Partial<Contacto> | null = null;
  readonly dialog = inject(MatDialog);

  constructor(
    private fb: FormBuilder, 
    private dataUser: UserProfileService, 
    private user: UserService
  ) {
    this.clientForm = this.fb.group({
      nombre: [{ value: '', disabled: true }, Validators.required],
      apellido: [{ value: '', disabled: true }, Validators.required],
      telefono: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.getContactData(this.user.getIdUser());
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const clientData = this.clientForm.value;
      console.log('Dato del cliente:', clientData);
      this.dataUser.putProfileContact(this.user.getIdUser(), clientData).subscribe(
        (response) => {
          console.log('Perfil de contacto actualizado correctamente:', response);
          this.setEditMode(true); // Cambia al modo de visualización después de guardar
          this.reloadComponent(); // Actualiza los datos del formulario
        },
        (error) => {
          console.error('Error al actualizar el perfil de contacto:', error);
        }
      );
    }
  }

  getContactData(idUser: string | null) {
    if (!idUser) {
      console.error('ID de usuario inválido');
      return;
    }

    this.dataUser.getProfileContact(idUser).subscribe(
      (data: Contacto | null) => {
        if (data) {
          this.originalData = { ...data };
          this.clientForm.patchValue({
            nombre: data.nombre,
            apellido: data.apellido,
            telefono: data.telefono,
            email: data.email,
          });
        } else {
          console.error('No se encontraron datos de contacto');
        }
      },
      (error) => {
        console.error('Error al obtener los datos de contacto:', error);
      }
    );
  }

  setEditMode(cancelar: boolean = false) {
    if (cancelar) {
      this.editar = false;
      this.clientForm.disable();
      this.dataUser.updateVerification();
      if (this.originalData) {
        this.clientForm.patchValue({
          nombre: this.originalData.nombre,
          apellido: this.originalData.apellido,
          telefono: this.originalData.telefono,
          email: this.originalData.email,
        });
      }
      return;
    }

    const dialogRef = this.dialog.open(VerificacionComponent, {
      width: '250px',
    });

    this.dataUser.verificacion$.subscribe((verificado) => {
      if (verificado) {
        this.editar = true;
        this.clientForm.enable();
        dialogRef.close();
      } else {
        this.editar = false;
        this.clientForm.disable();
      }
    });
  }
  reloadComponent() {
    this.getContactData(this.user.getIdUser());
  }
}
