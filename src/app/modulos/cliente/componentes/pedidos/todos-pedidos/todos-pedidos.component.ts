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
  selector: 'app-todos-pedidos',
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
  templateUrl: './todos-pedidos.component.html',
  styleUrl: './todos-pedidos.component.scss'
})
export class TodosPedidosComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  todosPedidos: any[] = [];

  constructor(private historial: ApiHistorialComprasService, private userService: UserService) { }

  ngOnInit(): void {
    const userId = this.userService.getIdUser();
    if (userId) {
      // Llamar a getPedidos con el userId y el array de estados
      this.historial.getPedidosAll(userId).subscribe(
        (data) => {
          this.todosPedidos = data;
          console.log("TODOS LOS PEDIDOS " + data);
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
