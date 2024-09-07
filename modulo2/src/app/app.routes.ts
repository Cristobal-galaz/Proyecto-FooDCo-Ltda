import { Routes } from '@angular/router';
import { PersonalComponent } from './personal/personal.component';
import { InicioComponent } from './inicio/inicio.component';
import { InicioEnComponent } from './inicio-en/inicio-en.component';  // Asegúrate de importar el nuevo componente
import { MostrarordenComponent } from './mostrarorden/mostrarorden.component';
import { OrdenCompraComponent } from './orden-compra/orden-compra.component';

export const routes: Routes = [
  { path: 'personal', component: PersonalComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'inicio-en', component: InicioEnComponent }, // Nueva ruta para la versión en inglés
  { path: 'mostrarorden', component: MostrarordenComponent },
  { path: 'orden', component: OrdenCompraComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }
];
