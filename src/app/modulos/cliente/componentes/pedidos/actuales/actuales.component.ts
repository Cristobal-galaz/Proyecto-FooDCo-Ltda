import { Component, ViewChild, OnInit, signal } from '@angular/core';
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
    MatCardModule
  ],
  templateUrl: './actuales.component.html',
  styleUrls: ['./actuales.component.scss'],
  providers: [provideNativeDateAdapter()]
})
export class ActualesComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  pedidos: Pedido[] = [];
  readonly panelOpenState = signal(false);

  constructor(private historial: ApiHistorialComprasService, private userService: UserService) {}

  ngOnInit(): void {
    const userId = this.userService.getIdUser();
    if (userId) {
      this.cargarPedidosActuales(userId);
    } else {
      console.error('Error: No se encontró el ID del usuario.');
    }
  }

  cargarPedidosActuales(userId: string): void {
    this.historial.getPedidos(userId, ['no-completado']).subscribe(
      (data: Pedido[]) => {
        this.pedidos = data;
        console.log("Pedidos actuales: ", data);
      },
      (error) => {
        console.error('Error al cargar los pedidos actuales:', error);
      }
    );
  }

  
}
