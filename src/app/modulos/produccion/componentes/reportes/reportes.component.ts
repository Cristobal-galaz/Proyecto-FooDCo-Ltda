import { Component, OnInit } from '@angular/core';
import { ProduccionDiariaService } from '../../services/produccion-diaria.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  resumenDiario: { tipo_producto: string; total: number }[] = [];
  fechaSeleccionada: Date | null = null;

  constructor(private produccionDiariaService: ProduccionDiariaService) {}

  ngOnInit(): void {}

  onFechaSeleccionadaChange(): void {
    if (this.fechaSeleccionada) {
      const fechaFormateada = formatDate(this.fechaSeleccionada, 'MM/dd/yyyy', 'en-US');
      this.produccionDiariaService.getResumenProduccionDiaria(fechaFormateada)
        .subscribe(data => this.resumenDiario = data);
    }
  }
}
