import { Component, OnInit } from '@angular/core';
import { TurnosEmpleadosService } from '../../../services/turnos-empleados.service';
import { TurnoEmpleado } from '../../../interfaces/turno-empleado.model';

@Component({
  selector: 'app-turnos-empleados-list',
  templateUrl: './turnos-empleados-list.component.html',
  styleUrls: ['./turnos-empleados-list.component.css']
})
export class TurnosEmpleadosListComponent implements OnInit {
  turnos: TurnoEmpleado[] = [];
  turnosFiltrados: TurnoEmpleado[] = [];
  filtro: string = '';

  constructor(private turnosEmpleadosService: TurnosEmpleadosService) {}

  ngOnInit(): void {
    this.turnosEmpleadosService.getTurnosEmpleados().subscribe((data: TurnoEmpleado[]) => {
      this.turnos = data;
      this.turnosFiltrados = data;
    });
  }

  filtrarTurnos(): void {
    this.turnosFiltrados = this.turnos.filter(turno =>
      turno.empleado_id.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  eliminarTurno(id: string): void {
    if (confirm('¿Está seguro de eliminar este turno?')) {
      this.turnosEmpleadosService.deleteTurnoEmpleado(id).subscribe(() => {
        this.turnos = this.turnos.filter(turno => turno._id !== id);
        this.filtrarTurnos();
      });
    }
  }
}
