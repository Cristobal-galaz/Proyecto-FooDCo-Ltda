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

  constructor(private router: Router, private ordenCompra: ApiserviceService) {}

  switchToEnglish() {
    this.router.navigate(['/orden-compra-en']);
  }

  ngOnInit(): void {
    this.ordenCompra.getOrdenComprajefedeventa().pipe(
      map((data: any) => {
        return {
          _id: data._id,
          cliente: data.cliente,
          estado: data.estado,
        } as OrdenCompra;
      })
    ).subscribe(
      (ordenCompra: OrdenCompra) => {
        console.log(ordenCompra);
      },
      (error) => {
        console.error('Error al cargar la orden de compra', error);
      }
    );
  }
}