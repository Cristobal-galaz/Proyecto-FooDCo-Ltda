import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Producto, CantidadProducto } from '../../../interfaces/alimento';
import { ListaProductosService } from '../../../services/lista-productos.service';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import{ MatDialog } from '@angular/material/dialog';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, FormsModule, MatInputModule, MatFormFieldModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {
constructor(private listaProductosService: ListaProductosService, private _matDialog: MatDialog,
  private cdr: ChangeDetectorRef
){}

  @Input() cardProduct!: Producto;
  showInput = false;

  onSelect(){
    this.showInput = true;
  }
  closeSelect(){
    this.showInput = false;
  }
  abrirModal(): void {
    this._matDialog.open(DetalleProductoComponent, {
      panelClass: 'custom-dialog-container',
      width: '40vw',
      maxWidth: 'none', 
      data: { producto: this.cardProduct }
    });
  }

  onClick(cantidadProduct:number) {
    const cantidadProducto: CantidadProducto = {
      producto: this.cardProduct,
      cantidad: cantidadProduct
    };
    this.listaProductosService.addProductos(cantidadProducto);
    this.closeSelect();

    this.cdr.detectChanges();
  }





}
