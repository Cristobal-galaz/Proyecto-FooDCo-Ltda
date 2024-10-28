import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TipoProductoService } from '../../../core/services/tipo-producto.service';
import { TipoProducto } from '../../../models/tipo-producto.model';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tipos-producto-list',
  templateUrl: './tipos-producto-list.component.html',
  styleUrls: ['./tipos-producto-list.component.css']
})
export class TiposProductoListComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'acciones'];
  dataSource: MatTableDataSource<TipoProducto> = new MatTableDataSource<TipoProducto>();
  isLoading: boolean = true;

  constructor(
    private tipoProductoService: TipoProductoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadTiposProducto();
  }

  loadTiposProducto(): void {
    this.tipoProductoService.getTiposProducto().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.snackBar.open('Error al cargar los tipos de producto', 'Cerrar', {
        duration: 3000
      });
    });
  }

  deleteTipoProducto(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: '¿Estás seguro de que deseas eliminar este tipo de producto?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tipoProductoService.deleteTipoProducto(id).subscribe({
          next: () => {
            this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
            this.snackBar.open('Tipo de producto eliminado', 'Cerrar', {
              duration: 3000
            });
          },
          error: () => {
            this.snackBar.open('Error al eliminar el tipo de producto', 'Cerrar', {
              duration: 3000
            });
          }
        });
      }
    });
  }
}
