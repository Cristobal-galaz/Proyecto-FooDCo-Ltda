import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators,  FormsModule, ReactiveFormsModule  } from '@angular/forms';
import preguntasData from '../../../../../../../public/assets/preguntas/valoracion-completa.json';
import { ValoracionComponent } from './valoracion/valoracion.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-preguntas-valoracion',
  standalone: true,
  imports: [ValoracionComponent, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './preguntas-valoracion.component.html',
  styleUrls: ['./preguntas-valoracion.component.scss']
})
export class PreguntasValoracionComponent implements OnInit {
  preguntasForm!: FormGroup;
  preguntas = preguntasData.preguntas;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.preguntasForm = this.fb.group({
      respuestas: this.fb.array(this.preguntas.map(pregunta =>
        this.fb.group({
          ponderacion: [pregunta.ponderacion, Validators.required],
          respuesta: [0, Validators.required]
        })
      ))
    });
  }

  get respuestas(): FormArray {
    return this.preguntasForm.get('respuestas') as FormArray;
  }

  onSubmit() {
    if (this.preguntasForm.valid) {
      const resultados = this.respuestas.controls.map((grupo, index) => {
        const formGroup = grupo as FormGroup;
        return {
          pregunta: this.preguntas[index].pregunta,
          ponderacion: formGroup.get('ponderacion')?.value,
          respuesta: formGroup.get('respuesta')?.value
        };
      });
  
      console.log('Resultados:', resultados);
    } else {
      console.error('Formulario inválido');
    }
  }
  
}
