import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators,  FormsModule, ReactiveFormsModule  } from '@angular/forms';
import preguntasData from '../../../../../../../public/assets/preguntas/valoracion-completa.json';
import { ValoracionComponent } from './valoracion/valoracion.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ValoracionService } from '../../../services/valoracion.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-preguntas-valoracion',
  standalone: true,
  imports: [MatSelectModule,MatDialogModule, ValoracionComponent, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './preguntas-valoracion.component.html',
  styleUrls: ['./preguntas-valoracion.component.scss']
})
export class PreguntasValoracionComponent implements OnInit {
  preguntasForm!: FormGroup;
  preguntas = preguntasData.preguntas;
  idPedido: string = '';
  private _snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder, private valoracion: ValoracionService, @Inject(MAT_DIALOG_DATA) private data: any,  private dialogRef: MatDialogRef<PreguntasValoracionComponent>) {
    this.idPedido = data.idPedido;
  }

  ngOnInit() {
    this.preguntasForm = this.fb.group({
      respuestas: this.fb.array(this.preguntas.map(pregunta =>
        this.fb.group({
          ponderacion: [pregunta.ponderacion, Validators.required],
          respuesta: [0, Validators.required]
        })
      )),
      comentario: [''] // Agregar el campo de comentario aquí
    });
  }

  get respuestas(): FormArray {
    return this.preguntasForm.get('respuestas') as FormArray;
  }

  onSubmit() {
    if (this.preguntasForm.valid) {
      // Obtén las respuestas del FormArray
      const respuestas = this.respuestas.controls.map((grupo, index) => {
        const formGroup = grupo as FormGroup;
        return {
          pregunta: this.preguntas[index].pregunta,
          ponderacion: formGroup.get('ponderacion')?.value,
          respuesta: formGroup.get('respuesta')?.value
        };
      });
  
      // Obtén el comentario general
      const comentario = this.preguntasForm.get('comentario')?.value;
      const ordenCompra = this.idPedido;
      // Crea el payload para enviar al backend
      const payload = {
        respuestas,
        comentario,
        ordenCompra
      };
  
      // Llama al servicio para enviar los datos
      this.valoracion.setValoracion(payload).subscribe({
        next: (response) => {
          console.log('Valoración enviada correctamente:', response);
          this.dialogRef.close();
          this._snackBar.open('Valoración enviada correctamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          // Aquí puedes realizar cualquier acción adicional tras el éxito
        },
        error: (err) => {
          console.error('Error al enviar la valoración:', err);
          // Manejo del error si ocurre
        }
      });
    } else {
      console.error('Formulario inválido');
      // Opcional: marca todos los controles como tocados para mostrar errores
      this.preguntasForm.markAllAsTouched();
    }
  }
}
