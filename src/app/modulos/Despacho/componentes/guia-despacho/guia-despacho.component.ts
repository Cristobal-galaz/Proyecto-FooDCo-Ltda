import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DespachoService } from '../../services/despacho.service';
import { OnInit } from '@angular/core';
import { OrdenDespacho } from '../../interfaces/ordendespacho';
import { CommonModule } from '@angular/common';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-guia-despacho',
  standalone: true,
  imports: [CommonModule, MatButton],
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
  desgargarGuia(): void {
    let DATA: any = document.getElementById('theContent');
    html2canvas(DATA).then((canvas) => {
      let fileWitdth = 208;
      let fileHeight = (canvas.height * fileWitdth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWitdth, fileHeight);
      PDF.save(`guiaN${this.ordenDespacho.numero}.pdf`);
    })
  }
}
