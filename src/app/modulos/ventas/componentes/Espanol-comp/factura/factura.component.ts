import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { ApiserviceService } from '../../../Service/apiservice.service'; 
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
})
export class FacturaComponent {
  selectedFile: File | null = null;
  uploadMessage: string | null = null;
  orderId: string = '';
  language: string | null = 'es';

  constructor(private apiService: ApiserviceService, private traducir:TranslateService) {}

  // Evento al seleccionar un archivo
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      if (this.selectedFile.type !== 'application/pdf') {
        this.uploadMessage = this.language === 'es'
          ? 'Solo se permiten archivos PDF.'
          : 'Only PDF files are allowed.';
        this.selectedFile = null;
        return;
      }
      this.uploadMessage = this.language === 'es'
        ? `Archivo seleccionado: ${this.selectedFile.name}`
        : `Selected file: ${this.selectedFile.name}`;
    }
  }

  // Enviar formulario
  onSubmit(): void {
    if (!this.selectedFile || !this.orderId) {
      this.uploadMessage = this.language === 'es'
        ? 'Por favor, selecciona un archivo y proporciona el ID de la orden.'
        : 'Please select a file and provide the order ID.';
      return;
    }

    const formData = new FormData();
    formData.append('ordenCompraId', this.orderId);
    formData.append('file', this.selectedFile);

    this.apiService.uploadFactura(formData).subscribe(
      () => {
        this.uploadMessage = this.language === 'es'
          ? `El archivo "${this.selectedFile?.name || 'desconocido'}" se ha subido correctamente.`
          : `The file "${this.selectedFile?.name || 'unknown'}" has been uploaded successfully.`;
        this.resetForm();
      },
      (error: any) => {
        console.error(error);
        this.uploadMessage = this.language === 'es'
          ? 'Hubo un error al subir la factura. Por favor, intenta nuevamente.'
          : 'There was an error uploading the invoice. Please try again.';
      }
    );
  }

  // Alternar idioma
  toggleLanguage(): void {
    this.language = this.language === 'es' ? 'en' : 'es';
  }

  // Resetear formulario
  resetForm(): void {
    this.selectedFile = null;
    this.orderId = '';
  }

  ngOnInit() {
    //this.language = localStorage.getItem("selectedLang");
    this.traducir.onLangChange.subscribe((event) => {
      console.log('Idioma cambiado a:', event.lang);
      this.language = event.lang;
    });
  }
}
