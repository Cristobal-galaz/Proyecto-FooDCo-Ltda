// src/app/components/historial-compras/historial-compras.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiHistorialComprasService } from '../../services/api-historial-compras.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-historial-compras',  
  standalone: true,
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.scss']
})

export class HistorialComprasComponent implements OnInit {
  compras: any[] = [];
  userId: string | null = '';  // Ahora puede ser null si no hay token

  constructor(
    private historialComprasService: ApiHistorialComprasService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.userService.getIdUser();

    if (this.userId) {
      // Si el usuario está autenticado, obtenemos su historial de compras
      this.historialComprasService.getPurchaseHistory(this.userId).subscribe(
        (data) => {
          this.compras = data;
          console.log('Respuesta de historial de compras:', data);
        },
        (error) => {
          console.error('Error al obtener el historial de compras:', error);
        }
      );
    } else {
      console.error('No se encontró el ID del usuario.');
    }
  }
}
