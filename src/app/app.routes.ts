import { Routes } from '@angular/router';
import { MenusComponent } from './pages/clientes/menus/menus.component';
import { RegistroClientesComponent } from './pages/clientes/registro-clientes/registro-clientes.component';

export const routes: Routes = [
    {path: 'menus', component: MenusComponent},
    {path: 'registroCliente', component: RegistroClientesComponent}
];
