import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ControlCalidadService } from '../../../services/control-calidad.service';

@Component({
  selector: 'app-control-calidad-list',
  templateUrl: './control-calidad-list.component.html',
  styleUrls: ['./control-calidad-list.component.css']
})
export class ControlCalidadListComponent implements OnInit {
  registros: any[] = [];
  displayedColumns: string[] = ['produccion_id', 'estado', 'observaciones', 'inspector', 'acciones'];

  constructor(
    private controlCalidadService: ControlCalidadService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.obtenerRegistros();
  }

  obtenerRegistros(): void {
    this.controlCalidadService.getRegistros().subscribe({
      next: (data) => {
        this.registros = data;
      },
      error: (err) => {
        console.error('Error al obtener los registros:', err);
        this.snackBar.open('Error al obtener los registros.', 'Cerrar', { duration: 3000 });
      },
    });
  }

  editarRegistro(id: string): void {
    this.router.navigate(['/produccion/control-calidad/editar', id]);
  }

  eliminarRegistro(id: string): void {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este registro?');
    if (confirmacion) {
      this.controlCalidadService.deleteRegistro(id).subscribe({
        next: () => {
          this.obtenerRegistros();
          this.snackBar.open('Registro eliminado correctamente', 'Cerrar', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error al eliminar el registro:', err);
          this.snackBar.open('Error al eliminar el registro.', 'Cerrar', { duration: 3000 });
        },
      });
    }
  }
}
