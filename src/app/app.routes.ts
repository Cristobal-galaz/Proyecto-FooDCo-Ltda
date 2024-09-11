import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { authenticatedGuard } from './guards/authenticated.guard';

export const routes: Routes = [
    {
        path: 'cliente',
        title: 'Cliente',
        loadComponent:()=> import('./pages/clientes/dashboard-cliente/dashboard-cliente.component').then(m => m.DashboardClienteComponent),
        canActivate: [authGuard],
        children: [
            {
                path: 'menus',
                title: 'Menus',
                loadComponent:()=> import('./pages/clientes/menus/menus.component').then(m => m.MenusComponent),
                canActivate: [authGuard],
            },
            {
                path: 'orden',
                title: 'Orden',
                loadComponent: ()=>import('./pages/clientes/orden-de-compra/orden-de-compra.component').then(m => m.OrdenDeCompraComponent),
                canActivate: [authGuard],
            },  
        ]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: ()=> import('./pages/clientes/login-clientes/login-clientes.component'),
        canActivate: [authenticatedGuard]
    },
    {
        path: 'registro',
        title: 'Registro Cliente',
        loadComponent:()=> import('./pages/clientes/registro-clientes/registro-clientes.component').then(m => m.RegistroClientesComponent),
        canActivate: [authenticatedGuard]
    }
];
