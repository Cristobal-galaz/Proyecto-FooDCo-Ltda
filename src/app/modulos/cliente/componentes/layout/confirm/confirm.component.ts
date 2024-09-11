import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle, MAT_DIALOG_DATA
} from '@angular/material/dialog';import { OrdenCompraComponent } from '../../orden-compra/orden-compra.component';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, OrdenCompraComponent],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent {
  constructor(public _matDialogRef: MatDialogRef<OrdenCompraComponent>, @Inject(MAT_DIALOG_DATA) public data: {message: string}) { 
      }


  onConfirm(): void {
    this._matDialogRef.close(true); // Cierra el diálogo y pasa 'true'
  }

  onCancel(): void {
    this._matDialogRef.close(false); // Cierra el diálogo y pasa 'false'
  }
}


