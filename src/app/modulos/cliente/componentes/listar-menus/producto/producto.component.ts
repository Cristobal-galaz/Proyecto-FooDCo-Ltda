import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, inject } from '@angular/core';
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
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../../services/auth.service';
@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [TranslateModule, MatCardModule, MatButtonModule, MatIconModule, FormsModule, MatInputModule, MatFormFieldModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {
constructor(private listaProductosService: ListaProductosService, private _matDialog: MatDialog,
  private cdr: ChangeDetectorRef, private auth: AuthService  
){}

  @Input() cardProduct!: Producto;
  showInput = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  private _snackBar = inject(MatSnackBar);

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

  onClick(cantidadProduct: number | null) {
    // Verifica si la cantidad es válida (mayor a 0 y no nula)
    if (cantidadProduct && cantidadProduct > 0) {
      const cantidadProducto: CantidadProducto = {
        producto: this.cardProduct,
        cantidad: cantidadProduct
      };
  
      this.listaProductosService.addProductos(cantidadProducto);
      this.closeSelect();
      this.cdr.detectChanges();
    } else {
      this.openSnackBar('Se debe agregar por lo menos 1 producto.');
    }
  }

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  authentificated() : boolean{
    return this.auth.isAuthenticated();
  }
}


