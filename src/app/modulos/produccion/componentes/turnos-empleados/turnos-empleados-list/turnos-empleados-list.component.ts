import { Component, OnInit } from '@angular/core';
import { TurnosEmpleadosService } from '../../../services/turnos-empleados.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-turnos-empleados-list',
  templateUrl: './turnos-empleados-list.component.html',
  styleUrls: ['./turnos-empleados-list.component.css'],
})
export class TurnosEmpleadosListComponent implements OnInit {
  displayedColumns: string[] = ['empleado', 'fecha', 'horas', 'acciones'];
  turnos: any[] = [];
  turnosFiltrados: any[] = [];
  filtro: string = '';

  constructor(
    private turnosEmpleadosService: TurnosEmpleadosService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarTurnos();
  }

  cargarTurnos(): void {
    this.turnosEmpleadosService.getTurnosEmpleados().subscribe({
      next: (data) => {
        this.turnos = data.map((turno) => ({
          ...turno,
          empleado_id: turno.empleado_id || { nombre: 'No encontrado' },
        }));
        this.turnosFiltrados = [...this.turnos];
      },
      error: () => {
        this.snackBar.open('Error al cargar los turnos', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }  

  filtrarTurnos(): void {
    const filtroNormalizado = this.filtro.toLowerCase();
    this.turnosFiltrados = this.turnos.filter((turno) =>
      turno.empleado_id.nombre.toLowerCase().includes(filtroNormalizado)
    );
  }

  eliminarTurno(id: string): void {
    if (confirm('¿Está seguro de eliminar este turno?')) {
      this.turnosEmpleadosService.deleteTurnoEmpleado(id).subscribe({
        next: () => {
          this.turnos = this.turnos.filter((turno) => turno._id !== id);
          this.filtrarTurnos();
          this.snackBar.open('Turno eliminado', 'Cerrar', {
            duration: 3000,
          });
        },
        error: () => {
          this.snackBar.open('Error al eliminar el turno', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    }
  }
}
