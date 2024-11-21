import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertMessage = new BehaviorSubject<string | null>(null);
  alertMessage$ = this.alertMessage.asObservable();

  showAlert(message: string) {
    this.alertMessage.next(message);

    setTimeout(() => this.alertMessage.next(null), 3000);
  }
}
