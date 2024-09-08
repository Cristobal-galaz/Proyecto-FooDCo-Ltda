//import { Component } from '@angular/core';
import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import{ environment } from '../../../../environments/environment';

import {ChangeDetectionStrategy} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';

import { OptionService } from '../../services/api-rubros.service'; // Asegúrate de usar la ruta correcta

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatInputModule,MatFormFieldModule,MatStepperModule,MatButtonModule,MatSelectModule ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit{
  
  opciones: any[] = [];
  constructor(private optionService: OptionService, private http: HttpClient) { }
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
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    rut_empresa: ['', Validators.required],
    giro: ['', Validators.required],
    direccion: ['', Validators.required],
    comuna: ['', Validators.required],
    ciudad: ['', Validators.required],
    correo_contacto: ['', Validators.required],
    telefono_empresa: ['', Validators.required],
    nombre_empresa: ['', Validators.required],
    rubro: ['', Validators.required],
  });
  thirdFormGroup= this._formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    telefono: ['', Validators.required],
    email: ['', Validators.required],
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
        console.log('Registro exitosso', response);
      }, error => {
        console.error('Error en el registro', error);
      });
    } else {
      console.error('Formulario no válido');
    }
  }
}
