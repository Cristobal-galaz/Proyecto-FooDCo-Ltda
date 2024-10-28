import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../../../Service/apiservice.service';
import { OrdenCompra } from '../../../interface/ordendecompra';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-orden-compra-en',
  standalone: true,
  templateUrl: './orden-compra-en.component.html',
  styleUrls: ['./orden-compra-en.component.css']
})
export class OrdenCompraEnComponent {
  orden!: OrdenCompra;
  constructor(private router: Router, private ordenCompra: ApiserviceService) {}

  switchToSpanish() {
    // Redirige a la versión en español de la orden de compra
    this.router.navigate(['/orden-compra']);
  }
  ngOnInit(): void {
    this.ordenCompra.getOrdenComprajefedeventa().pipe(
      map((data: any) => {
        return {
          _id: data._id,
          cliente: data.cliente,
          estado: data.estado,
          seleccionProductos: data.seleccionProductos,
          precioTotalOrden:data.precioTotalOrden,
          iva:data.iva,
          precioFinalConIva:data.precioFinalConIva,
        } as OrdenCompra;
      })
    ).subscribe(
      (ordenCompra: OrdenCompra) => {
        this.orden = ordenCompra;
        console.log(this.orden);
        console.log(this.orden.seleccionProductos.productos[0].descuento);
      },
      (error) => {
        console.error('Error al cargar la orden de compra', error);
      }
    );
  }
}
