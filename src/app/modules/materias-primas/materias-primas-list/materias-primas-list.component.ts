import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MateriasPrimasService } from '../../../core/services/materias-primas.service';
import { MateriaPrima } from '../../../models/materia-prima.model';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-materias-primas-list',
  templateUrl: './materias-primas-list.component.html',
  styleUrls: ['./materias-primas-list.component.css']
})
export class MateriasPrimasListComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'unidad', 'cantidad', 'stock_minimo', 'acciones'];
  dataSource!: MatTableDataSource<MateriaPrima>;
  isLoading = true;

  constructor(
    private materiasPrimasService: MateriasPrimasService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadMateriasPrimas();
  }

  loadMateriasPrimas(): void {
    this.materiasPrimasService.getMateriasPrimas().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.isLoading = false;
    }, error => {
      this.snackBar.open('Error al cargar materias primas', 'Cerrar', { duration: 3000 });
      this.isLoading = false;
    });
  }

  deleteMateriaPrima(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: '¿Estás seguro de que deseas eliminar esta materia prima?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.materiasPrimasService.deleteMateriaPrima(id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
          this.snackBar.open('Materia prima eliminada', 'Cerrar', { duration: 3000 });
        });
      }
    });
  }
}
