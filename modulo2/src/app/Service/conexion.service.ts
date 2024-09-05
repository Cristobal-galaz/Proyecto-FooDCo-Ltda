import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  // Creamos un Subject para emitir eventos
  private buttonClickedSource = new Subject<void>();
  // Convertimos el Subject en Observable para que otros componentes puedan suscribirse
  buttonClicked$ = this.buttonClickedSource.asObservable();

  // Método para emitir eventos
  notifyButtonClicked() {
    this.buttonClickedSource.next();
  }
}

