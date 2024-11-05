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
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { CantidadProducto } from '../../../interfaces/alimento';

@Component({
  selector: 'app-actuales',
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
  templateUrl: './actuales.component.html',
  styleUrls: ['./actuales.component.scss'],
  providers: [provideNativeDateAdapter()]
})
export class ActualesComponent implements OnInit {
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
    this.historial.getPedidos(userId, ['no-completado']).subscribe(
      (data: Pedido[]) => {
        this.pedidos = data;
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
      case 'aprobado':
        return 'estado-aprobado';
      case 'rechazado':
        return 'estado-rechazado';
      case 'en_produccion':
        return 'estado-en-proceso';
      case 'despachado':
        return 'despachado';
      case 'entregado':
        return 'estado-entregado';
      case 'completado':
        return 'estado-completado';
      default:
        return '';
    }
  }

  ajustarPalabra(palabra: string): string {
    if (!palabra) return '';
    // Si la palabra contiene guiones bajos, divídela y ajusta cada parte
    const palabras = palabra.split('_').map(
      (parte) => parte.charAt(0).toUpperCase() + parte.slice(1).toLowerCase()
    );

    // Une las partes ajustadas con espacios
    return palabras.join(' ');
  }

  setListaProducto(productos: CantidadProducto[]): void {
    // Actualiza productosOrdenados cuando se expande un pedido
    this.productosOrdenados = productos.slice();

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
          return compare(a.cantidad * a.producto.precio, b.cantidad * b.producto.precio, isAsc);
        default:
          return 0;
      }
    });
  }


}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


