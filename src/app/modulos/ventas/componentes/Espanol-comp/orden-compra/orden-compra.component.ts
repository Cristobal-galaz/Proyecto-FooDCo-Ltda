import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../../../Service/apiservice.service';
import { OrdenCompra } from '../../../interface/ordendecompra';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-orden-compra',
  standalone: true,
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css'],
  imports: [CommonModule, FormsModule, MatExpansionModule],
})
export class OrdenCompraComponent implements OnInit {
  ordenes: OrdenCompra[] = [];
  activeButton: number | null = null;
  activeOrdenId: string | null = null;
  userId: string | null = '';
  language: string | null = 'es';
  panelOpenState: boolean = false;
  hasFiltered: boolean = false; // Variable para rastrear si se ha intentado filtrar

  constructor(private router: Router, private ordenCompra: ApiserviceService, private traducir:TranslateService) {}

  // Alternar idioma
  toggleLanguage(): void {
    this.language = this.language === 'es' ? 'en' : 'es';
    localStorage.setItem('language', this.language);
  }

  // Manejar el filtrado de órdenes por período
  filtrarPorPeriodo(periodo: string): void {
    this.hasFiltered = true; // Activar el estado de filtrado
    this.activeButton = this.getButtonNumberByPeriodo(periodo);

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

  // Validar si una orden es válida
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
    this.panelOpenState = true;
    //this.language = localStorage.getItem("selectedLang");
    this.traducir.onLangChange.subscribe((event) => {
      console.log('Idioma cambiado a:', event.lang);
      this.language = event.lang;
    });
  }
}
