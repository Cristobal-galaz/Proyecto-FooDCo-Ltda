import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../../Service/apiservice.service';

@Component({
  selector: 'app-orden-compra',
  standalone: true,
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css']
})
export class OrdenCompraComponent {
  constructor(private router: Router,private ordenCompra:ApiserviceService) {}

  switchToEnglish() {
    this.router.navigate(['/orden-compra-en']);
  }

  ngOnInit(): void {
   this.ordenCompra.getOrdenCompra().subscribe(
    (data:any)=>{

     console.log(data);
      
    }
   )

}
}