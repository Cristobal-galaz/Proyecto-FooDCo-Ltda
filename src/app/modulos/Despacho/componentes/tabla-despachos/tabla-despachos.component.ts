import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DespachoService } from '../../services/despacho.service';
import { OrdenDespacho } from '../../interfaces/ordendespacho';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tabla-despachos',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatFormFieldModule, MatButtonModule,CommonModule],
  templateUrl: './tabla-despachos.component.html',
  styleUrl: './tabla-despachos.component.scss'
})
export class TablaDespachosComponent implements OnInit {
  displayedColumns: string[] = ['id_despacho', 'nombre_empresa', 'telefono_contacto', 'email_contacto', 'fecha_requerida', 'estado', 'acciones'];
  dataSource: MatTableDataSource<OrdenDespacho> = new MatTableDataSource<OrdenDespacho>(); // Cambia a OrdenDespacho

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private estadosPermitidos = ['listo_para_despachar', 'despachado', 'entregado', 'completado'];

  constructor(private despachoService: DespachoService, private router: Router) {}

  ngOnInit(): void {
    this.cargarOrdenesDespacho();
  }

  cargarOrdenesDespacho() {
    this.despachoService.obtenerOrdenesListasParaDespacho().subscribe({ // Cambia el método si es necesario
      next: (ordenes) => {
        const ordenesFiltradas = ordenes.filter(orden => this.estadosPermitidos.includes(orden.estado));
        console.log('Órdenes Filtradas:', ordenesFiltradas); 
        this.dataSource.data = ordenesFiltradas;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => console.error('Error al cargar las órdenes de despacho', error)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  verDetallesDespacho(id: string) {
    this.router.navigate(['/dashboard/despacho/detalle',id]);
  }

  asignarDespacho(id: string) {
    this.router.navigate(['/dashboard/despacho/asignacion', id]);
  }

  verGuiaDespacho(id: string) {
    this.router.navigate(['/dashboard/despacho/guia', id]);
  }
}