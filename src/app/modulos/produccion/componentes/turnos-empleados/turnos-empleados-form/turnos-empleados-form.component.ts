import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosService } from '../../../services/empleados.service';
import { TurnosEmpleadosService } from '../../../services/turnos-empleados.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-turnos-empleados-form',
  templateUrl: './turnos-empleados-form.component.html',
  styleUrls: ['./turnos-empleados-form.component.css'],
})
export class TurnosEmpleadosFormComponent implements OnInit {
  turnoForm: FormGroup;
  empleados: any[] = [];
  isEdit: boolean = false;
  turnoId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private empleadosService: EmpleadosService,
    private turnosEmpleadosService: TurnosEmpleadosService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.turnoForm = this.fb.group({
      empleado_id: [null, Validators.required],
      fecha: ['', Validators.required],
      hora_inicio: ['', Validators.required],
      hora_fin: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarEmpleados();
    this.turnoId = this.route.snapshot.paramMap.get('id');
    if (this.turnoId) {
      this.isEdit = true;
      this.cargarTurno(this.turnoId);
    }
  }

  cargarEmpleados(): void {
    this.empleadosService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data.empleados || [];
      },
      error: () => {
        this.snackBar.open('Error al cargar empleados', 'Cerrar', { duration: 3000 });
      },
    });
  }

  cargarTurno(id: string): void {
    this.turnosEmpleadosService.getTurnosEmpleados().subscribe({
      next: (data) => {
        const turnoEncontrado = data.find((turno) => turno._id === id);
        if (turnoEncontrado) {
          this.turnoForm.patchValue(turnoEncontrado);
        } else {
          this.snackBar.open('Turno no encontrado.', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/produccion/turnos-empleados']);
        }
      },
      error: () => {
        this.snackBar.open('Error al cargar los turnos.', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/produccion/turnos-empleados']);
      },
    });
  }
  
  

  onSubmit(): void {
    if (this.turnoForm.valid) {
      let turnoData = { ...this.turnoForm.value };
  
      // Asegúrate de enviar la fecha en el formato correcto
      turnoData.fecha = new Date(turnoData.fecha).toISOString().split('T')[0];
  
      if (this.isEdit && this.turnoId) {
        // Llamar al servicio de actualización
        this.turnosEmpleadosService.updateTurnoEmpleado(this.turnoId, turnoData).subscribe({
          next: () => {
            this.snackBar.open('Turno actualizado correctamente', 'Cerrar', { duration: 3000 });
            this.router.navigate(['/produccion/turnos-empleados']);
          },
          error: (err) => {
            console.error('Error al actualizar el turno:', err);
            this.snackBar.open('Error al actualizar el turno', 'Cerrar', { duration: 3000 });
          },
        });
      } else {
        // Llamar al servicio de creación
        this.turnosEmpleadosService.addTurnoEmpleado(turnoData).subscribe({
          next: () => {
            this.snackBar.open('Turno asignado correctamente', 'Cerrar', { duration: 3000 });
            this.router.navigate(['/produccion/turnos-empleados']);
          },
          error: (err) => {
            console.error('Error al asignar el turno:', err);
            this.snackBar.open('Error al asignar el turno', 'Cerrar', { duration: 3000 });
          },
        });
      }
    } else {
      this.snackBar.open('Formulario inválido. Verifique los campos.', 'Cerrar', { duration: 3000 });
    }
  }  
}
