import { Component, OnInit } from '@angular/core';
import { ControlCalidadService } from '../../../services/control-calidad.service';
import { ControlCalidad } from '../../../interfaces/control-calidad.model';

@Component({
  selector: 'app-control-calidad-list',
  templateUrl: './control-calidad-list.component.html',
  styleUrls: ['./control-calidad-list.component.css']
})
export class ControlCalidadListComponent implements OnInit {
  registros: ControlCalidad[] = [];

  constructor(private controlCalidadService: ControlCalidadService) {}

  ngOnInit(): void {
    this.obtenerRegistros();
  }

  obtenerRegistros(): void {
    this.controlCalidadService.getRegistros().subscribe({
      next: (data: ControlCalidad[]) => {
        this.registros = data;
      },
      error: (err: any) => console.error('Error al obtener los registros:', err)
    });
  }
}
