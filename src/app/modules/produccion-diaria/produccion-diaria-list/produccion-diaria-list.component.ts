import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProduccionDiariaService } from '../../../core/services/produccion-diaria.service';
import { TipoProductoService } from '../../../core/services/tipo-producto.service';
import { ProduccionDiaria } from '../../../models/produccion-diaria.model';
import { TipoProducto } from '../../../models/tipo-producto.model';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-produccion-diaria-list',
  templateUrl: './produccion-diaria-list.component.html',
  styleUrls: ['./produccion-diaria-list.component.css']
})
export class ProduccionDiariaListComponent implements OnInit {
  displayedColumns: string[] = ['fecha_produccion', 'tipo_producto_nombre', 'materias_primas', 'cantidad_producida', 'acciones'];
  dataSource: MatTableDataSource<ProduccionDiaria> = new MatTableDataSource<ProduccionDiaria>();
  originalData: ProduccionDiaria[] = [];  
  isLoading: boolean = true;
  tiposProducto: TipoProducto[] = [];
  selectedTiposProducto: string[] = [];

  constructor(
    private produccionDiariaService: ProduccionDiariaService,
    private tipoProductoService: TipoProductoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadTiposProducto();
  }

  loadTiposProducto(): void {
    this.tipoProductoService.getTiposProducto().subscribe(data => {
      this.tiposProducto = data;
      this.loadProduccionDiaria();
    }, error => {
      this.isLoading = false;
      this.snackBar.open('Error al cargar los tipos de producto', 'Cerrar', {
        duration: 3000
      });
    });
  }

  loadProduccionDiaria(): void {
    this.produccionDiariaService.getProduccionDiaria().subscribe(data => {
      const mappedData = data.map(produccion => {
        const tipoProducto = this.tiposProducto.find(tp => tp.id === produccion.tipo_producto_id.toString());
  
        // Verificar si el campo materiasPrimasUtilizadas está presente
        const materiasPrimasUtilizadas = produccion.materiasPrimasUtilizadas || [];
  
        return {
          ...produccion,
          tipo_producto_nombre: tipoProducto ? tipoProducto.nombre : 'Desconocido',
          materiasPrimasUtilizadas // Asegurarse de que se pasa correctamente
        };
      });
      this.originalData = mappedData;  // Guardar los datos originales
      this.dataSource.data = mappedData;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.snackBar.open('Error al cargar la producción diaria', 'Cerrar', {
        duration: 3000
      });
    });
  }  

  applyFilter(): void {
    if (this.selectedTiposProducto.length > 0) {
      this.dataSource.data = this.originalData.filter(item => 
        this.selectedTiposProducto.includes(item.tipo_producto_id.toString())
      );
    } else {
      this.dataSource.data = this.originalData;
    }
  }

  clearFilter(): void {
    this.selectedTiposProducto = [];
    this.dataSource.data = this.originalData;
  }

  deleteProduccion(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: '¿Estás seguro de que deseas eliminar esta producción?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.produccionDiariaService.deleteProduccionDiaria(id).subscribe({
          next: () => {
            this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
            this.snackBar.open('Producción eliminada', 'Cerrar', {
              duration: 3000
            });
          },
          error: () => {
            this.snackBar.open('Error al eliminar la producción', 'Cerrar', {
              duration: 3000
            });
          }
        });
      }
    });
  }
}
