import { Component, ViewChild, OnInit, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ApiHistorialComprasService } from '../../../services/api-historial-compras.service';
import { UserService } from '../../../../../services/user.service';
import { Pedido } from '../../../interfaces/pedido';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatSort ,Sort, MatSortModule} from '@angular/material/sort';
import { CantidadProducto } from '../../../interfaces/alimento';

@Component({
  selector: 'app-todos-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
    MatSortModule
  ],
  templateUrl: './todos-pedidos.component.html',
  styleUrl: '../actuales/actuales.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class TodosPedidosComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild(MatSort) sort!: MatSort;

  pedidos: Pedido[] = [];
productosOrdenados: CantidadProducto[] = [];
  readonly panelOpenState = signal(false);

  constructor(private historial: ApiHistorialComprasService, private userService: UserService) {
    const userId = this.userService.getIdUser();
    if (userId) {
      this.cargarPedidosActuales(userId);
    }
  }

  ngOnInit(): void {
  }

  cargarPedidosActuales(userId: string): void {
    this.historial.getPedidos(userId, ['']).subscribe(
      (data: Pedido[]) => {
        this.pedidos = data;
        console.log("Pedidos actuales: ", this.pedidos);
      },
      (error) => {
        console.error('Error al cargar los pedidos actuales:', error);
      }
    );
  }


  getEstadoClass(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'pendiente':
        return 'estado-pendiente';
      case 'en_produccion':
        return 'estado-en-proceso';
      case 'despachado':
        return 'despachado';
      default:
        return '';
    }
  }
  ajustarPalabra(palabra: string): string {
    if (!palabra) return '';
    return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
  }
  setListaProducto(productos: CantidadProducto[]): void {
    // Actualiza productosOrdenados cuando se expande un pedido
    this.productosOrdenados = productos.slice();
    console.log('Productos ordenados:', this.productosOrdenados);
  
  }
  sortData(sort: Sort, productos: CantidadProducto[]) {
    const data = productos.slice();
    if (!sort.active || sort.direction === '') {
      this.productosOrdenados = data;
      return;
    }
    this.productosOrdenados = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'producto':
          return compare(a.producto.nombre, b.producto.nombre, isAsc);
        case 'cantidad':
          return compare(a.cantidad, b.cantidad, isAsc);
        case 'unitario':
          return compare(a.producto.precio, b.producto.precio, isAsc);
        case 'total':
          return compare(a.cantidad*a.producto.precio, b.cantidad*b.producto.precio, isAsc);
        default:
          return 0;
      }
    });
  }


}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
