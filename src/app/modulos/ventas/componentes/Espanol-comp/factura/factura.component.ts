import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent {
  selectedFile: File | null = null;
  uploadMessage: string | null = null;
  language: string = 'es'; // Añadido para el cambio de idioma

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

      this.uploadMessage = this.language === 'es' 
        ? `Archivo seleccionado: ${this.selectedFile.name}` 
        : `Selected file: ${this.selectedFile.name}`;
    }
  }

  // Evento cuando se envía el formulario
  onSubmit(): void {
    if (this.selectedFile) {
      console.log(this.language === 'es' ? 'Subiendo archivo:' : 'Uploading file:', this.selectedFile);
      this.uploadMessage = this.language === 'es' 
        ? `El archivo "${this.selectedFile.name}" se ha subido correctamente.` 
        : `The file "${this.selectedFile.name}" has been uploaded successfully.`;
      this.selectedFile = null; // Resetea el archivo seleccionado
    }
  }

  // Método para alternar el idioma
  toggleLanguage(): void {
    this.language = this.language === 'es' ? 'en' : 'es';
  }
}
