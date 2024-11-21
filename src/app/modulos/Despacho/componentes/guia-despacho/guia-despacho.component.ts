import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DespachoService } from '../../services/despacho.service';
import { OnInit } from '@angular/core';
import { OrdenDespacho } from '../../interfaces/ordendespacho';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guia-despacho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guia-despacho.component.html',
  styleUrl: './guia-despacho.component.scss'
})
export class GuiaDespachoComponent implements OnInit{
  ordenDespacho!: OrdenDespacho;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private despachoService: DespachoService){

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.obtenerOrdenDespacho(id);
    }
  }

  obtenerOrdenDespacho(id: string) {
    this.despachoService.getOrdenDespacho(id).subscribe({
      next: (ordenDespacho: OrdenDespacho) => {
        // Asigna la orden de despacho obtenida
        this.ordenDespacho = ordenDespacho;
        console.log(this.ordenDespacho.seleccionProductos);
        // Inicializa el objeto camion si es undefined
        if (!this.ordenDespacho.camion) {
          this.ordenDespacho.camion = {
            nombreConductor: '',
            patente: '',
            tipoCamion: ''
          };
        }
      },
      error: (err) => console.error('Error al obtener la orden de despacho:', err)
    });
  }


  
// hacer funcionar el generar pdf
}
