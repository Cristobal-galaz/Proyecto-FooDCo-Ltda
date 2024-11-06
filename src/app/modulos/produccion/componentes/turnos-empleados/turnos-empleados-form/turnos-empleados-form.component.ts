import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TurnosEmpleadosService } from '../../../services/turnos-empleados.service';
import { TurnoEmpleado } from '../../../interfaces/turno-empleado.model';

@Component({
  selector: 'app-turnos-empleados-form',
  templateUrl: './turnos-empleados-form.component.html',
  styleUrls: ['./turnos-empleados-form.component.css']
})
export class TurnosEmpleadosFormComponent implements OnInit {
  turnoForm: FormGroup;
  turnoId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private turnosEmpleadosService: TurnosEmpleadosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.turnoForm = this.fb.group({
      empleado_id: ['', Validators.required],
      fecha: ['', Validators.required],
      hora_inicio: ['', Validators.required],
      hora_fin: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.turnoId = this.route.snapshot.params['id'];
    if (this.turnoId) {
      this.turnosEmpleadosService.getTurnoEmpleadoById(this.turnoId).subscribe((data: TurnoEmpleado) => {
        this.turnoForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.turnoForm.valid) {
      const turno: TurnoEmpleado = this.turnoForm.value;
      if (this.turnoId) {
        this.turnosEmpleadosService.updateTurnoEmpleado(this.turnoId, turno).subscribe(() => {
          this.router.navigate(['/produccion/turnos-empleados']);
        });
      } else {
        this.turnosEmpleadosService.addTurnoEmpleado(turno).subscribe(() => {
          this.router.navigate(['/produccion/turnos-empleados']);
        });
      }
    }
  }
}
