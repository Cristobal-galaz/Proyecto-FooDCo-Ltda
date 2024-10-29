import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card'; 
import { CommonModule } from '@angular/common';  
import { ProduccionDiariaService } from '../../services/produccion-diaria.service';
import { MateriasPrimasService } from '../../services/materias-primas.service';
import { TurnosEmpleadosService } from '../../services/turnos-empleados.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,  
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [MatCardModule, CommonModule]  
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
  }

  obtenerProduccionTotal(): void {
    this.produccionDiariaService.getProduccionDiaria().subscribe(data => {
      this.produccionTotal = data.reduce((total, item) => total + item.cantidad_producida, 0);
    });
  }

  obtenerMateriasPrimasTotal(): void {
    this.materiasPrimasService.getMateriasPrimas().subscribe(data => {
      this.materiasPrimasTotal = data.length; 
    });
  }
}
