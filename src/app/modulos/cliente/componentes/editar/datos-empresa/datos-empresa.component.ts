import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-datos-empresa',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.scss']
})
export class DatosEmpresaComponent implements OnInit {
  empresaForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.empresaForm = this.fb.group({
      rut: ['', Validators.required],
      giro: ['', Validators.required],
      direccion: ['', Validators.required],
      comuna: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      nombreEmpresa: ['', Validators.required],
      rubro: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.empresaForm.valid) {
      const empresaData = this.empresaForm.value;
      console.log('Datos de la empresa:', empresaData);
      // Aquí puedes añadir la lógica para guardar o enviar los datos
    }
  }
}
