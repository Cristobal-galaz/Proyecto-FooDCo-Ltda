import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DespachoService } from '../../services/despacho.service';
import { OrdenDespacho } from '../../interfaces/ordendespacho';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-despacho',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-despacho.component.html',
  styleUrl: './detalle-despacho.component.scss'
})
export class DetalleDespachoComponent implements OnInit {
  ordenDespacho!: OrdenDespacho;
  nombreCamionero: string = '';
  patente: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private despachoService: DespachoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.obtenerOrdenDespacho(id);
    }
  }

  obtenerOrdenDespacho(id: string) {
    this.despachoService.getOrdenDespacho(id).subscribe({
      next: (ordenDespacho: OrdenDespacho) => {
        // Asigna la orden de despacho obtenida
        this.ordenDespacho = ordenDespacho;
        
        // Inicializa el objeto camion si es undefined
        if (!this.ordenDespacho.camion) {
          this.ordenDespacho.camion = {
            nombreConductor: '',
            patente: '',
            tipoCamion: ''
          };
        }
      },
      error: (err) => console.error('Error al obtener la orden de despacho:', err)
    });
  }

  asignarDatosDespacho() {
    // Aquí podrías enviar los datos al backend para actualizar la orden de despacho
    console.log('Datos adicionales asignados: ', { nombreCamionero: this.nombreCamionero, patente: this.patente });
    alert('Datos de despacho asignados correctamente');
    this.router.navigate(['/dashboard/despacho']); // Redirige a la lista de despachos o donde prefieras
  }
}