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

  // Evento cuando se selecciona un archivo
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      if (this.selectedFile.type !== 'application/pdf') {
        this.uploadMessage = 'Solo se permiten archivos PDF.';
        this.selectedFile = null;
        return;
      }

      this.uploadMessage = `Archivo seleccionado: ${this.selectedFile.name}`;
    }
  }

  // Evento cuando se envía el formulario
  onSubmit(): void {
    if (this.selectedFile) {
      // Aquí podrías implementar una subida real al servidor usando un servicio HTTP
      console.log('Subiendo archivo:', this.selectedFile);
      this.uploadMessage = `El archivo "${this.selectedFile.name}" se ha subido correctamente.`;
      this.selectedFile = null; // Resetea el archivo seleccionado
    }
  }
}
