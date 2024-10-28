import { Component, OnInit, ViewChild } from '@angular/core';
import { MateriasPrimasService } from '../../../core/services/materias-primas.service';
import { MateriaPrima } from '../../../models/materia-prima.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-revision-inventario',
  templateUrl: './revision-inventario.component.html',
  styleUrls: ['./revision-inventario.component.css']
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
