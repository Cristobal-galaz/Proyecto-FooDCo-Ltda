import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from '../../../../interfaces/alimento';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.scss'
})
export class DetalleProductoComponent {


  constructor(public _matDialogRef: MatDialogRef<DetalleProductoComponent>,  
              @Inject(MAT_DIALOG_DATA) public data: {producto: Producto}) { 
                console.log(data.producto.ingredientes[0].ingrediente.nombre);

  }


  
}
