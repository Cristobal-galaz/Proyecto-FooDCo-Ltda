import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DespachoService } from '../../services/despacho.service';
import { OrdenDespacho } from '../../interfaces/ordendespacho';
import { OrdenCompra } from '../../../ventas/interface/ordendecompra';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asignacion-despacho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asignacion-despacho.component.html',
  styleUrls: ['./asignacion-despacho.component.scss']
})
export class AsignacionDespachoComponent implements OnInit {
  ordenCompra!: OrdenCompra;
  ordenDespacho!: OrdenDespacho;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private despachoService: DespachoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.obtenerOrdenCompra(id);
    }
  }

  obtenerOrdenCompra(id: string) {
    this.despachoService.getOrdenCompra(id).subscribe({
      next: (ordenCompra: OrdenCompra) => {
        this.ordenCompra = ordenCompra;
        this.crearOrdenDespacho();
      },
      error: (err) => console.error('Error al obtener la orden de compra:', err)
    });
  }

  crearOrdenDespacho() {
    this.despachoService.crearOrdenDespachoDesdeVenta(this.ordenCompra).subscribe({
      next: (ordenDespacho: OrdenDespacho) => {
        this.ordenDespacho = ordenDespacho;
      },
      error: (err) => console.error('Error al crear la orden de despacho:', err)
    });
  }

  irADetalleDespacho() {
    // Navega al componente de detalle de despacho con el ID de la orden de despacho
    this.router.navigate([`/dashboard/despacho/detalle/${this.ordenDespacho._id}`]);
  }
}