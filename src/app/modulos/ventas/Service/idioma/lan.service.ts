// language.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>('es'); // 'es' por defecto
  currentLanguage$ = this.languageSubject.asObservable();

  switchLanguage(language: string): void {
    this.languageSubject.next(language);
  }

  get currentLanguage(): string {
    return this.languageSubject.value;
  }
}
