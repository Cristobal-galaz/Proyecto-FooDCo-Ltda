import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../../../Service/apiservice.service';
import { OrdenCompra } from '../../../interface/ordendecompra';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orden-compra',
  standalone: true,
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css'],
  imports: [CommonModule, FormsModule],
})
export class OrdenCompraComponent implements OnInit {
  ordenes: OrdenCompra[] = []; // Almacena las órdenes obtenidas
  activeButton: number | null = null; // Botón activo para resaltar el período seleccionado
  activeOrdenId: string | null = null; // Controla cuál orden está activa
  userId: string | null = ''; // Almacena el ID del usuario

  constructor(private router: Router, private ordenCompra: ApiserviceService) {}

  // Cambiar idioma
  switchToEnglish() {
    this.router.navigate(['/orden-compra-en']);
  }

  // Manejar el filtrado de órdenes por período
  filtrarPorPeriodo(periodo: string): void {
    this.activeButton = this.getButtonNumberByPeriodo(periodo); // Actualiza el botón activo

    // Obtener el ID del usuario (empleado) desde el servicio
    this.userId = this.ordenCompra.loadUserProfile();

    // Verificar si se obtuvo un ID de usuario válido
    if (!this.userId) {
      console.error('No se pudo obtener el ID del usuario.');
      alert('No se pudo obtener el ID del usuario.');
      return;
    }

    console.log('ID del usuario obtenido:', this.userId);

    this.ordenCompra.getOrdenesPorPeriodo(periodo).subscribe(
      (ordenes: OrdenCompra[]) => {
        if (Array.isArray(ordenes)) {
          console.log('Órdenes obtenidas para el período:', periodo);

          // Filtrar las órdenes que corresponden al empleado actual
          const ordenesFiltradas = ordenes.filter((orden) => {
            console.log('Comparando userId con empleado._id de la orden:');
            console.log('userId:', this.userId);

            // Validar y normalizar las órdenes antes de la comparación
            const ordenValida = this.validarOrden(orden);
            
            if (!ordenValida) {
              console.log('Orden inválida, se omitirá:', orden);
              return false; // Omitir la orden si no es válida
            }

            // Comprobamos que 'empleado' esté definido y luego comparamos su _id
            const idsCoinciden = orden.empleado && orden.empleado._id === this.userId;
            
            console.log('empleado._id de la orden:', orden.empleado ? orden.empleado._id : 'sin empleado');
            console.log('¿Coinciden los IDs?', idsCoinciden);

            return idsCoinciden; // Retorna true solo si el ID coincide
          });

          console.log('Órdenes filtradas por usuario:', ordenesFiltradas);
          this.procesarOrdenes(ordenesFiltradas); // Procesar las órdenes filtradas
          console.log('Órdenes procesadas:', this.ordenes);
        } else {
          console.warn('El endpoint devolvió un formato inesperado para el período:', periodo);
          this.ordenes = [];
        }
      },
      (error) => {
        console.error('Error al cargar las órdenes para el período', periodo, error);
        alert('No se encontraron órdenes para el período ' + periodo);
      }
    );
  }

  // Función de validación de la orden
  validarOrden(orden: any): boolean {
    // Verificar si la orden tiene la propiedad 'empleado' y si 'empleado._id' es válido
    if (!orden.empleado || !orden.empleado._id) {
      console.warn('Orden con formato antiguo o faltante: ', orden);
      return false; // Si no es válida, omitirla
    }

    // Si la orden no tiene productos o productos nulos, también la omitimos
    if (!orden.seleccionProductos || !orden.seleccionProductos.productos || orden.seleccionProductos.productos.length === 0) {
      console.warn('Orden sin productos válidos: ', orden);
      return false;
    }

    return true; // La orden es válida
  }

  // Obtener el número del botón según el período
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

  // Procesar órdenes y filtrar productos nulos
  procesarOrdenes(data: any[]): void {
    this.ordenes = data
      .map((orden: any) => {
        return {
          ...orden,
          seleccionProductos: {
            ...orden.seleccionProductos,
            productos: orden.seleccionProductos.productos.filter(
              (producto: any) => producto.producto !== null
            ),
          },
        } as OrdenCompra;
      })
      .filter((orden: OrdenCompra) => 
        orden.seleccionProductos.productos.length > 0
      ); // Filtra órdenes que tengan productos no vacíos
  }


  // Método para cambiar el estado de visualización de una orden
  toggleOrdenDetails(ordenId: string): void {
    this.activeOrdenId = this.activeOrdenId === ordenId ? null : ordenId;
  }

  // Método para verificar si una orden está activa
  isOrdenActive(ordenId: string): boolean {
    return this.activeOrdenId === ordenId;
  }

  ngOnInit(): void {
    // Obtener las órdenes al inicializar el componente

  }
}
