import { Routes } from '@angular/router';
import { PersonalComponent } from './modulos/ventas/componentes/personal/personal.component';
import { InicioComponent } from './modulos/ventas/componentes/inicio/inicio.component';
import { InicioEnComponent } from './modulos/ventas/componentes/inicio-en/inicio-en.component'; // Asegúrate de importar el nuevo componente
import { MostrarordenComponent } from './modulos/ventas/componentes/mostrarorden/mostrarorden.component';
import { OrdenCompraComponent } from './modulos/ventas/componentes/orden-compra/orden-compra.component';

export const routes: Routes = [
  { path: 'personal', component: PersonalComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'inicio-en', component: InicioEnComponent }, // Nueva ruta para la versión en inglés
  { path: 'mostrarorden', component: MostrarordenComponent },
  { path: 'orden', component: OrdenCompraComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }
];
