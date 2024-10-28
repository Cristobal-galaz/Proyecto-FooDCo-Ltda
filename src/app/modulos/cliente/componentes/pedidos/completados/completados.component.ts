import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ApiHistorialComprasService } from '../../../services/api-historial-compras.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-completados',
  standalone: true,
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './completados.component.html',
  styleUrls: ['./completados.component.scss'],
  providers: [provideNativeDateAdapter()]
})
export class CompletadosComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  pedidosCompletados: any[] = [];

  constructor(private historial: ApiHistorialComprasService, private userService: UserService) {}

  ngOnInit(): void {
    const userId = this.userService.getIdUser();
    if (userId) {
      // Llamar a getPedidos con el userId y el array de estados
      this.historial.getPedidos(userId, ['completado']).subscribe(
        (data) => {
          this.pedidosCompletados = data;
          console.log("Completados: " + data);
        },
        (error) => {
          console.error('Error al obtener los pedidos:', error);
        }
      );
    } else {
      console.error('Error: No se encontró el ID del usuario.');
    }
  }
}
