import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DespachoService } from '../../services/despacho.service';
import { Camion, OrdenDespacho } from '../../interfaces/ordendespacho';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-asignacion-despacho',
  standalone: true,
  imports: [CommonModule, FormsModule,MatButtonModule, MatIconModule],
  templateUrl: './asignacion-despacho.component.html',
  styleUrls: ['./asignacion-despacho.component.scss']
})
export class AsignacionDespachoComponent implements OnInit {
  ordenDespacho: OrdenDespacho | undefined;
  camion: Camion = { nombreConductor: '', patente: '', tipoCamion: '' };

  constructor(
    private despachoService: DespachoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.despachoService.getOrdenDespacho(id).subscribe({
        next: (orden) => {
          this.ordenDespacho = orden;
        },
        error: (err) => console.error('Error al obtener la orden de despacho', err)
      });
    }
  }

  asignarCamion(): void {
    if (this.ordenDespacho) {
      this.despachoService.asignarCamion(this.ordenDespacho._id, this.camion).subscribe({
        next: () => {
          console.log('Camión asignado con éxito');
          this.router.navigate(['/dashboard/despacho']);
        },
        error: (err) => console.error('Error al asignar el camión', err)
      });
    }
  }
}