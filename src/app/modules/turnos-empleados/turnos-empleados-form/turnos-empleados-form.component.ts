import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TurnosEmpleadosService } from '../../../core/services/turnos-empleados.service';
import { TurnoEmpleado } from '../../../models/turno-empleado.model';

@Component({
  selector: 'app-turnos-empleados-form',
  templateUrl: './turnos-empleados-form.component.html',
  styleUrls: ['./turnos-empleados-form.component.css']
})
export class TurnosEmpleadosFormComponent implements OnInit {
  turnoForm: FormGroup;
  turnoId: number | null = null;  // Para saber si estamos creando o editando

  constructor(
    private fb: FormBuilder,
    private turnosEmpleadosService: TurnosEmpleadosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.turnoForm = this.fb.group({
      nombre_empleado: ['', Validators.required],
      turno: ['', Validators.required],
      fecha: ['', Validators.required],
      horas_trabajadas: ['', [Validators.required, Validators.min(1), Validators.max(12)]], // Las horas deben ser entre 1 y 12
    });
    
  }

  ngOnInit(): void {
    this.turnoId = this.route.snapshot.params['id'];
    if (this.turnoId) {
      this.turnosEmpleadosService.getTurnoEmpleadoById(this.turnoId).subscribe((data: TurnoEmpleado) => {
        this.turnoForm.patchValue(data);  // Llenar el formulario si es edición
      });
    }
  }

  onSubmit(): void {
    if (this.turnoForm.valid) {
      const turno: TurnoEmpleado = this.turnoForm.value;
      if (this.turnoId) {
        // Si existe un ID, es una edición
        this.turnosEmpleadosService.updateTurnoEmpleado(this.turnoId, turno).subscribe(() => {
          this.router.navigate(['/turnos-empleados']);
        });
      } else {
        // Si no hay ID, es una creación de un nuevo turno
        this.turnosEmpleadosService.addTurnoEmpleado(turno).subscribe(() => {
          this.router.navigate(['/turnos-empleados']);
        });
      }
    }
  }
}
