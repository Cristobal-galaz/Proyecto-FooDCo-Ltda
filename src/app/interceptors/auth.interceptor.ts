import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Verificamos si estamos en el entorno del navegador
  if (typeof window !== 'undefined' && localStorage) {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      // Si hay token, lo añadimos al encabezado
      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
      return next(modifiedReq); // Continuamos con la solicitud modificada
    }
  }

  // Si no hay token o estamos en un entorno sin 'localStorage', continuamos con la solicitud original
  return next(req);
};
