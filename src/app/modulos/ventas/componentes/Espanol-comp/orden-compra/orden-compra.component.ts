import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../../../Service/apiservice.service';
import { OrdenCompra } from '../../../interface/ordendecompra';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion'; // Importa MatExpansionModule

@Component({
  selector: 'app-orden-compra',
  standalone: true,
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css'],
  imports: [CommonModule, FormsModule, MatExpansionModule], // Añade MatExpansionModule aquí
})
export class OrdenCompraComponent implements OnInit {
  ordenes: OrdenCompra[] = []; // Almacena las órdenes obtenidas
  activeButton: number | null = null; // Botón activo para resaltar el período seleccionado
  activeOrdenId: string | null = null; // Controla cuál orden está activa
  userId: string | null = ''; // Almacena el ID del usuario
  language: string = 'es'; // Idioma inicial (español)

  panelOpenState: boolean = false;


  constructor(private router: Router, private ordenCompra: ApiserviceService) {}

  // Alternar idioma
  toggleLanguage(): void {
    this.language = this.language === 'es' ? 'en' : 'es';
    localStorage.setItem('language', this.language); // Guardar el idioma seleccionado en LocalStorage
  }

  // Manejar el filtrado de órdenes por período
  filtrarPorPeriodo(periodo: string): void {
    this.activeButton = this.getButtonNumberByPeriodo(periodo); // Actualiza el botón activo

    this.userId = this.ordenCompra.loadUserProfile();
    if (!this.userId) {
      console.error('No se pudo obtener el ID del usuario.');
      alert(this.language === 'es' ? 'No se pudo obtener el ID del usuario.' : 'Unable to fetch user ID.');
      return;
    }

    this.ordenCompra.getOrdenesPorPeriodo(periodo).subscribe(
      (ordenes: OrdenCompra[]) => {
        if (Array.isArray(ordenes)) {
          const ordenesFiltradas = ordenes.filter((orden) => this.validarOrden(orden));
          this.procesarOrdenes(ordenesFiltradas);
        } else {
          this.ordenes = [];
        }
      },
      (error) => {
        console.error('Error al cargar las órdenes:', error);
        alert(
          this.language === 'es'
            ? 'No se encontraron órdenes para el período seleccionado.'
            : 'No orders found for the selected period.'
        );
      }
    );
  }

  // Validación de órdenes
  validarOrden(orden: any): boolean {
    return orden?.empleado?._id === this.userId && orden?.seleccionProductos?.productos?.length > 0;
  }

  // Procesar órdenes
  procesarOrdenes(data: any[]): void {
    this.ordenes = data.map((orden: any) => ({
      ...orden,
      seleccionProductos: {
        ...orden.seleccionProductos,
        productos: orden.seleccionProductos.productos.filter((producto: any) => producto.producto !== null),
      },
    }));
  }

  // Alternar detalles de una orden
  toggleOrdenDetails(ordenId: string): void {
    this.activeOrdenId = this.activeOrdenId === ordenId ? null : ordenId;
  }

  isOrdenActive(ordenId: string): boolean {
    return this.activeOrdenId === ordenId;
  }

  getButtonNumberByPeriodo(periodo: string): number | null {
    const mapping: { [key: string]: number } = {
      diario: 1,
      semanal: 2,
      bisemanal: 3,
      mensual: 4,
      trimestral: 5,
      semestral: 6,
    };
    return mapping[periodo] || null;
  }

  ngOnInit(): void {
    // Obtener las órdenes al inicializar el componente
  }
}
