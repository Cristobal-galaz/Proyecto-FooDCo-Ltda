import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // IMPORTAR MatSnackBar
import { ControlCalidadService } from '../../../services/control-calidad.service';

@Component({
  selector: 'app-control-calidad-form',
  templateUrl: './control-calidad-form.component.html',
  styleUrls: ['./control-calidad-form.component.css'],
})
export class ControlCalidadFormComponent implements OnInit {
  controlCalidadForm: FormGroup;
  produccionId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar, // INYECTAR MatSnackBar
    private controlCalidadService: ControlCalidadService // INYECTAR EL SERVICIO
  ) {
    this.controlCalidadForm = this.fb.group({
      produccion_id: [{ value: '', disabled: true }, Validators.required],
      estado: ['', Validators.required],
      observaciones: ['', Validators.required],
      inspector: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.produccionId = params['produccionId'];
      if (this.produccionId) {
        this.controlCalidadForm.patchValue({ produccion_id: this.produccionId });
      }
    });
  }

  onSubmit(): void {
    if (this.controlCalidadForm.valid) {
      const controlData = this.controlCalidadForm.getRawValue(); // Obtener datos del formulario
      this.controlCalidadService.addRegistro(controlData).subscribe({
        next: (response: any) => {
          this.snackBar.open('Control de calidad guardado correctamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/produccion/control-calidad']);
        },
        error: (err: any) => {
          console.error('Error al guardar el control de calidad:', err);
          this.snackBar.open('Error al guardar el control de calidad', 'Cerrar', { duration: 3000 });
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/produccion/control-calidad']);
  }
}
