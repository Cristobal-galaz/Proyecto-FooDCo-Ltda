import { Component, OnInit } from '@angular/core';
import { TurnosEmpleadosService } from '../../../core/services/turnos-empleados.service';
import { TurnoEmpleado } from '../../../models/turno-empleado.model';

@Component({
  selector: 'app-turnos-empleados-list',
  templateUrl: './turnos-empleados-list.component.html',
  styleUrls: ['./turnos-empleados-list.component.css']
})
export class TurnosEmpleadosListComponent implements OnInit {
  turnos: TurnoEmpleado[] = [];
  turnosFiltrados: TurnoEmpleado[] = [];  // Para mostrar el resultado filtrado
  filtro: string = '';  // Para el filtrado de empleados

  constructor(private turnosEmpleadosService: TurnosEmpleadosService) {}

  ngOnInit(): void {
    this.turnosEmpleadosService.getTurnosEmpleados().subscribe((data: TurnoEmpleado[]) => {
      this.turnos = data;
      this.turnosFiltrados = data;  // Inicializar turnos filtrados
    });
  }

  // Método para filtrar los turnos por nombre del empleado
  filtrarTurnos(): void {
    this.turnosFiltrados = this.turnos.filter(turno => 
      turno.nombre_empleado.toLowerCase().includes(this.filtro.toLowerCase()));
  }

  eliminarTurno(id: number): void {
    if (confirm('¿Está seguro de eliminar este turno?')) {
      this.turnosEmpleadosService.deleteTurnoEmpleado(id).subscribe(() => {
        this.turnos = this.turnos.filter(turno => turno.id !== id);
        this.filtrarTurnos();  // Actualizar la lista filtrada después de eliminar
      });
    }
  }
}
