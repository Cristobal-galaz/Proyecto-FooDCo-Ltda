// control-calidad-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlCalidadService } from '../../../services/control-calidad.service';

@Component({
  selector: 'app-control-calidad-form',
  templateUrl: './control-calidad-form.component.html',
  styleUrls: ['./control-calidad-form.component.css']
})
export class ControlCalidadFormComponent implements OnInit {
  controlCalidadForm: FormGroup;
  produccionId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private controlCalidadService: ControlCalidadService
  ) {
    this.controlCalidadForm = this.fb.group({
      produccion_id: [{ value: '', disabled: true }, Validators.required], // Campo deshabilitado para el ID
      estado: ['', Validators.required],
      observaciones: ['', Validators.required],
      inspector: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtén el ID de producción desde los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.produccionId = params['produccionId'];
      if (this.produccionId) {
        this.controlCalidadForm.patchValue({ produccion_id: this.produccionId });
      }
    });
  }

  onSubmit(): void {
    if (this.controlCalidadForm.valid) {
      const controlData = this.controlCalidadForm.getRawValue(); // Obtener datos sin los campos deshabilitados
      this.controlCalidadService.addRegistro(controlData).subscribe({
        next: () => {
          // Redirige al listado de controles de calidad después de guardar
          this.router.navigate(['/produccion/control-calidad']);
        },
        error: error => console.error('Error al agregar el control de calidad:', error)
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/produccion/control-calidad']);
  }
}
