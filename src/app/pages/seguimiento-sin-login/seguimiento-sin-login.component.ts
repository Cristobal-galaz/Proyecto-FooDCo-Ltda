import { Component } from '@angular/core';
import { SeguimientoComponent } from '../../modulos/Despacho/componentes/seguimiento/seguimiento.component';

@Component({
  selector: 'app-seguimiento-sin-login',
  standalone: true,
  imports: [SeguimientoComponent],
  templateUrl: './seguimiento-sin-login.component.html',
  styleUrl: './seguimiento-sin-login.component.scss'
})
export class SeguimientoSinLoginComponent {

}
