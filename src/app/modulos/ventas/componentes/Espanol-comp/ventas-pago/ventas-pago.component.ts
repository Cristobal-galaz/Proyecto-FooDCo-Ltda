import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../../Service/idioma/lan.service';
import { ApiserviceService } from '../../../Service/apiservice.service';

@Component({
  selector: 'app-ventas-pago',
  templateUrl: './ventas-pago.component.html',
  styleUrls: ['./ventas-pago.component.scss'],
  standalone: true,
})
export class VentasPagoComponent {
  currentLanguage: string;
  texts: { [key: string]: string } = {};
  cuotas: any[] = []; // Aquí se almacenarán las cuotas obtenidas

  constructor(
    private router: Router,
    private languageService: LanguageService,
    private apiService: ApiserviceService // Importa el servicio
  ) {
    // Suscríbete al cambio de idioma para actualizar el contenido dinámicamente
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
      this.setLanguageTexts(language); // Actualiza los textos cuando cambia el idioma
    });

    // Inicializa con el idioma actual
    this.currentLanguage = this.languageService.currentLanguage;
    this.setLanguageTexts(this.currentLanguage);

    // Realiza la llamada para obtener las cuotas
    this.loadCuotas();
  }

  // Función para cambiar el idioma
  switchLanguage(): void {
    const newLanguage = this.currentLanguage === 'es' ? 'en' : 'es'; // Cambia entre español e inglés
    this.languageService.switchLanguage(newLanguage);
  }

  // Definir los textos para cada idioma
  setLanguageTexts(language: string): void {
    if (language === 'es') {
      this.texts = {
        switchToEnglish: 'Switch to English',
        pagosRealizados: 'Pagos realizados',
        pagosCompletados: 'Pagos completados',
        nombreCliente: 'Nombre cliente:',
        rutCliente: 'Rut cliente:',
        nombreEncargado: 'Nombre Encargado:',
        rutEncargado: 'Rut Encargado:',
        datosFactura: 'Datos de factura:',
        fechaOrden: 'Fecha de orden:',
        irAOrdenCompra: 'Ir a orden-compra',
      };
    } else if (language === 'en') {
      this.texts = {
        switchToEnglish: 'Switch to Spanish',
        pagosRealizados: 'Completed Payments',
        pagosCompletados: 'Completed Payments',
        nombreCliente: 'Customer Name:',
        rutCliente: 'Customer ID:',
        nombreEncargado: 'Responsible Person Name:',
        rutEncargado: 'Responsible Person ID:',
        datosFactura: 'Invoice Data:',
        fechaOrden: 'Order Date:',
        irAOrdenCompra: 'Go to Order',
      };
    }
  }

  // Cargar cuotas llamando al servicio
  loadCuotas(): void {
    this.apiService.getCuotasPorOrdenes().subscribe(
      (cuotas) => {
        this.cuotas = cuotas;
        console.log('Cuotas obtenidas:', this.cuotas); // Depuración
      },
      (error) => {
        console.error('Error al obtener las cuotas:', error);
      }
    );
  }
}
