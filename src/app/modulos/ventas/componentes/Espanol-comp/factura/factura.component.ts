import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importa FormsModule aquí
import { ApiserviceService } from '../../../Service/apiservice.service'; // Asegúrate de importar tu servicio


@Component({
  selector: 'app-factura',
  standalone: true, // Asegúrate de que el componente sea standalone
  imports: [CommonModule, FormsModule],  // Añade FormsModule a la lista de imports
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent {
  selectedFile: File | null = null;
  uploadMessage: string | null = null;
  orderId: string = ''; // Añadido para que el usuario ingrese el ID de la orden
  language: string = 'es'; // Cambio de idioma
  
  constructor(private apiService: ApiserviceService) {}

  // Evento cuando se selecciona un archivo
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      if (this.selectedFile.type !== 'application/pdf') {
        this.uploadMessage = this.language === 'es' ? 'Solo se permiten archivos PDF.' : 'Only PDF files are allowed.';
        this.selectedFile = null;
        return;
      }
      this.uploadMessage = this.language === 'es' ? `Archivo seleccionado: ${this.selectedFile.name}` : `Selected file: ${this.selectedFile.name}`;
    }
  }

  // Evento cuando se envía el formulario
  onSubmit(): void {
    if (this.selectedFile && this.orderId) {
      const formData = new FormData();
      formData.append('ordenCompraId', this.orderId);
      formData.append('file', this.selectedFile);

      // Llamada al servicio para subir la factura
      this.apiService.uploadFactura(formData).subscribe(
        () => {
          if (this.selectedFile) {
            this.uploadMessage = this.language === 'es' 
              ? `El archivo "${this.selectedFile.name}" se ha subido correctamente.` 
              : `The file "${this.selectedFile.name}" has been uploaded successfully.`;
          }
          this.selectedFile = null; // Reset the file after upload
        },
        (error: any) => {
          this.uploadMessage = this.language === 'es' 
            ? 'Hubo un error al subir la factura.' 
            : 'There was an error uploading the invoice.';
          console.error(error);
        }
      );
    } else {
      this.uploadMessage = this.language === 'es' 
        ? 'Por favor, selecciona un archivo y proporciona el ID de la orden.' 
        : 'Please select a file and provide the order ID.';
    }
  }

  // Método para alternar el idioma
  toggleLanguage(): void {
    this.language = this.language === 'es' ? 'en' : 'es';
  }
}
