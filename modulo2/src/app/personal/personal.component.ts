import { Component } from '@angular/core';
import { ConexionService } from '../Service/conexion.service';


@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [],
  templateUrl: './personal.component.html', 
  //template: `<button (click)="sendNotification()">Click me</button>`,
  styleUrl: './personal.component.css'
})
export class PersonalComponent {
  constructor(private conexionService: ConexionService) {}

  sendNotification() {
    this.conexionService.notifyButtonClicked();
  }
}
