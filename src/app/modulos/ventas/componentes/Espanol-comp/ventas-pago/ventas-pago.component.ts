// ventas-pago.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../../Service/idioma/lan.service';

@Component({
  selector: 'app-ventas-pago',
  templateUrl: './ventas-pago.component.html',
  styleUrls: ['./ventas-pago.component.scss'],
  standalone:true,  
})
export class VentasPagoComponent {
  currentLanguage: string;
  texts: { [key: string]: string } = {};  // Inicializa la propiedad con un objeto vacío.

  constructor(
    private router: Router,
    private languageService: LanguageService
  ) {
    // Suscríbete al cambio de idioma para actualizar el contenido dinámicamente
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
      this.setLanguageTexts(language); // Actualiza los textos cuando cambia el idioma
    });

    // Inicializa con el idioma actual
    this.currentLanguage = this.languageService.currentLanguage;
    this.setLanguageTexts(this.currentLanguage);
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
        irAOrdenCompra: 'Ir a orden-compra'
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
        irAOrdenCompra: 'Go to Order'
      };
    }
  }
}
