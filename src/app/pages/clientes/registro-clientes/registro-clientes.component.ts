import { Component } from '@angular/core';
import { RegistroComponent } from '../../../modulos/cliente/componentes/registro/registro.component';

@Component({
  selector: 'app-registro-clientes',
  standalone: true,
  imports: [RegistroComponent],
  templateUrl: './registro-clientes.component.html',
  styleUrl: './registro-clientes.component.scss'
})
export class RegistroClientesComponent {

}
