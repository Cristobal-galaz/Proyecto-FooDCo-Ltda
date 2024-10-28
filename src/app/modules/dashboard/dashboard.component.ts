import { Component, OnInit } from '@angular/core';
import { ProduccionDiariaService } from '../../core/services/produccion-diaria.service';
import { MateriasPrimasService } from '../../core/services/materias-primas.service';
import { TurnosEmpleadosService } from '../../core/services/turnos-empleados.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  produccionTotal: number = 0;
  materiasPrimasTotal: number = 0;
  empleadosEnTurno: number = 0;

  constructor(
    private produccionDiariaService: ProduccionDiariaService,
    private materiasPrimasService: MateriasPrimasService,
    private turnosEmpleadosService: TurnosEmpleadosService
  ) { }

  ngOnInit(): void {
    this.obtenerProduccionTotal();
    this.obtenerMateriasPrimasTotal();
    //this.obtenerEmpleadosEnTurno();
  }

  obtenerProduccionTotal(): void {
    this.produccionDiariaService.getProduccionDiaria().subscribe(data => {
      this.produccionTotal = data.reduce((total, item) => total + item.cantidad_producida, 0);
    });
  }

  obtenerMateriasPrimasTotal(): void {
    this.materiasPrimasService.getMateriasPrimas().subscribe(data => {
      this.materiasPrimasTotal = data.length; // Ajusta según la lógica de tu modelo de datos
    });
  }

  //obtenerEmpleadosEnTurno(): void {
    //this.turnosEmpleadosService.getTurnosEmpleados().subscribe(data => {
      //this.empleadosEnTurno = data.length; // Ajusta según la lógica de tu modelo de datos
    //});
  //}
}