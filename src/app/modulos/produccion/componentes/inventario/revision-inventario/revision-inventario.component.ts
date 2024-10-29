import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MateriasPrimasService } from '../../../services/materias-primas.service';
import { MateriaPrima } from '../../../interfaces/materia-prima.model';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-revision-inventario',
  standalone: true,  
  templateUrl: './revision-inventario.component.html',
  styleUrls: ['./revision-inventario.component.css'],
  imports: [
    CommonModule, 
    MatTableModule, 
    MatPaginatorModule, 
    MatCardModule,
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule
  ]
})
export class RevisionInventarioComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'cantidad', 'stockMinimo', 'estadoStock'];
  dataSource!: MatTableDataSource<MateriaPrima>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private materiasPrimasService: MateriasPrimasService) {}

  ngOnInit(): void {
    this.materiasPrimasService.getMateriasPrimas().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      
      // Configurar el filtro para buscar por nombre
      this.dataSource.filterPredicate = (data: MateriaPrima, filter: string) => {
        return data.nombre.toLowerCase().includes(filter);
      };
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getStockStatusClass(materia: MateriaPrima): string {
    return materia.cantidad < materia.stock_minimo ? 'low-stock' : 'in-stock';
  }
}
