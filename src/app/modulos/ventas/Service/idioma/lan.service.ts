// language.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {

  language: string | null = localStorage.getItem("selectedLang");
  private languageSubject = new BehaviorSubject<string | null>(this.language); // 'es' por defecto

  currentLanguage$ = this.languageSubject.asObservable();

  switchLanguage(language: string): void {
    this.languageSubject.next(language);
  }

  get currentLanguage(): string | null {
    return this.languageSubject.value;
  }


}
