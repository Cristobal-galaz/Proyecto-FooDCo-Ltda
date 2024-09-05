import { Routes } from '@angular/router';
import { PersonalComponent } from './personal/personal.component';
import { InicioComponent } from './inicio/inicio.component';
import { MostrarordenComponent } from './mostrarorden/mostrarorden.component';
import { OrdenCompraComponent } from './orden-compra/orden-compra.component';

export const routes: Routes = [
  { path: 'personal', component: PersonalComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'mostrarorden', component: MostrarordenComponent },
  { path: 'orden', component: OrdenCompraComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' } // Ruta predeterminada
];


