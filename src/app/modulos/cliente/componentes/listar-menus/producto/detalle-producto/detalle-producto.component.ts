import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.scss'
})
export class DetalleProductoComponent {


  constructor(public _matDialogRef: MatDialogRef<DetalleProductoComponent>,  
              @Inject(MAT_DIALOG_DATA) public data:any) { 
    
    
   
  }

}
