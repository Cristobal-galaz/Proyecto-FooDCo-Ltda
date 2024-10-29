import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-asignacion-despacho',
  standalone: true,
  imports: [],
  templateUrl: './asignacion-despacho.component.html',
  styleUrl: './asignacion-despacho.component.scss'
})
export class AsignacionDespachoComponent implements OnInit {
  displayedColumns: string[] = ['numeroPedido', 'cliente', 'fechaLlegada', 'estado', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.pedidoService.obtenerPedidos().subscribe(data => {
      // Supongamos que 'data' es un array de pedidos
      this.dataSource = new MatTableDataSource(data);
      // Ordenar por fecha de llegada ascendente
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch(property) {
          case 'fechaLlegada': return new Date(item.fechaLlegada);
          default: return item[property];
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort.active = 'fechaLlegada';
      this.dataSource.sort.direction = 'asc';
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // En caso de que el filtro afecte a los datos paginados
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  asignarDespacho(pedido: any) {
    // Lógica para asignar el despacho al pedido seleccionado
    // Puedes abrir un diálogo para seleccionar el viaje o realizar la asignación directamente
    console.log('Asignando despacho al pedido:', pedido);
    // Por ejemplo, llamar a un servicio que realice la asignación
    // this.pedidoService.asignarDespacho(pedido.id).subscribe(...)
  }
}