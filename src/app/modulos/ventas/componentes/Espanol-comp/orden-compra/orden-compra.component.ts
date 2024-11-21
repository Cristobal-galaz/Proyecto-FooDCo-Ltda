import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../../../Service/apiservice.service';
import { OrdenCompra } from '../../../interface/ordendecompra';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-orden-compra',
  standalone: true,
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css']
})
export class OrdenCompraComponent implements OnInit {
  orden!: OrdenCompra;
  constructor(private router: Router, private ordenCompra: ApiserviceService) {}

  switchToEnglish() {
    this.router.navigate(['/orden-compra-en']);
  }

  ngOnInit(): void {
    this.ordenCompra.getDatosOrdenCompra().pipe(
      map((data: any) => {
        console.log( data); // Imprime la respuesta completa
        return {
          _id: data._id,
          cliente: data.cliente,
          estado: data.estado,
          seleccionProductos: data.seleccionProductos,
          precioTotalOrden: data.precioTotalOrden,
          iva: data.iva,
          precioFinalConIva: data.precioFinalConIva,
        } as OrdenCompra;
      })
    ).subscribe(
      (ordenCompra: OrdenCompra) => {
        this.orden = ordenCompra;
        console.log('Orden de compra procesada:', this.orden);
        console.log('Descuento del primer producto:', this.orden.seleccionProductos.productos[0]?.descuento);
      },
      (error) => {
        console.error('Error al cargar la orden de compra', error);
      }
    );
  }
}  