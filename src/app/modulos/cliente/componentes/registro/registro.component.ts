//import { Component } from '@angular/core';
import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import{ environment } from '../../../../environments/environment';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import {ChangeDetectionStrategy} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';

import { OptionService } from '../../services/api-rubros.service'; // Asegúrate de usar la ruta correcta


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatInputModule,MatFormFieldModule,MatStepperModule,MatButtonModule,MatSelectModule,CommonModule ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit{
  
  opciones: any[] = [];


  constructor(private optionService: OptionService, private http: HttpClient, private router: Router) { }

  apiUrl = environment.apiUrl;
  ngOnInit(): void {
    this.cargarOpciones();
  }

  cargarOpciones(): void {
    this.optionService.getRubros().subscribe((data: any[]) => {
      this.opciones = data;
    }, error => {
      console.error('Error al cargar las opciones', error);
    });
  }
  
  
  
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  secondFormGroup = this._formBuilder.group({
    rut_empresa: ['',[Validators.required, this.rutValidator]],
    giro: ['', Validators.required],
    direccion: ['', Validators.required],
    comuna: ['', Validators.required],
    ciudad: ['', Validators.required],
    correo_contacto: ['', [Validators.required, Validators.email]],
    telefono_empresa: ['', [Validators.required, this.telefonoValidator]],
    nombre_empresa: ['', Validators.required],
    rubro: ['', Validators.required],
  });
  thirdFormGroup= this._formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    telefono: ['', [Validators.required, this.telefonoValidator]],
    email: ['', [Validators.required, Validators.email]],
  });
  isLinear = false;


  // Función para registrar el cliente
  registrarCliente(): void {
    console.log(this.secondFormGroup.value);
    // Verifica que todos los formularios sean válidos
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      // Combina los datos de los tres formularios
      const formData = {
        ...this.firstFormGroup.value,
        empresa: this.secondFormGroup.value,
        contacto: this.thirdFormGroup.value,
        sucursal: '64a3f1c9a19b123456789013'  // El ID de la sucursal
      };

      // Envía los datos a la API
      this.http.post(this.apiUrl+"auth/register/cliente", formData).subscribe(response => {
        console.log('Registro exitoso', response);
        this.router.navigate(['/login']);
      }, error => {
        console.error('Error en el registro', error);
      });
    } else {
      console.error('Formulario no válido');
      
    }

  }
    // Validador personalizado para RUT
    rutValidator(control: AbstractControl): ValidationErrors | null {
      const rutPattern = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]{1}$/; //11.111.111-1
      const valid = rutPattern.test(control.value);
      return valid ? null : { rutInvalido: true };
    }
      // Validador personalizado para números de teléfono chilenos
  telefonoValidator(control: AbstractControl): ValidationErrors | null {
    const telefonoPattern = /^(\+56|56)?[2-9]\d{8}$/; // +56 o 56 seguido por 9 dígitos (2-9 para el código de área)
    const valid = telefonoPattern.test(control.value);
    return valid ? null : { telefonoInvalido: true };
  }
  volverALogin(): void {
    this.router.navigate(['/login']);
  }


  isFieldInvalid(formGroup: AbstractControl, field: string): boolean {
    const control = formGroup.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
  
  getErrorMessage(formGroup: AbstractControl, field: string): string {
    const control = formGroup.get(field);
    if (control?.errors?.['required']) {
      return 'Este campo es obligatorio';
    }
    if (control?.errors?.['email']) {
      return 'Formato de email inválido';
    }
    if (control?.errors?.['minlength']) {
      return 'La longitud mínima es de 6 caracteres';
    }
    if (control?.errors?.['rutInvalido']) {
      return 'RUT inválido';
    }
    if (control?.errors?.['telefonoInvalido']) {
      return 'Teléfono inválido';
    }
    return '';
  }
  
  

}

