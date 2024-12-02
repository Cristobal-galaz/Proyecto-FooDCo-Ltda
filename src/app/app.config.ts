import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
//
export const appConfig: ApplicationConfig = {
  providers: 
            [provideZoneChangeDetection({ eventCoalescing: true }), 
            provideRouter(routes), 
            provideClientHydration(), 
            provideAnimationsAsync(), 
            provideHttpClient(
              withInterceptors([authInterceptor])
            ), provideAnimationsAsync(), provideAnimationsAsync(),
            TranslateModule.forRoot({
              loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
              },
            }).providers || [], // Asegura que los providers se añadan correctamente
          ],
};
