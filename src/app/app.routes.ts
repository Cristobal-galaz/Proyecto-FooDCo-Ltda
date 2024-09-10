import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'cliente',
        title: 'Cliente',
        loadComponent:()=> import('./pages/clientes/dashboard-cliente/dashboard-cliente.component').then(m => m.DashboardClienteComponent),
        children: [
            {
                path: 'menus',
                title: 'Menus',
                loadComponent:()=> import('./pages/clientes/menus/menus.component').then(m => m.MenusComponent)

            },
            {
                path: 'orden',
                title: 'Orden',
                loadComponent: ()=>import('./pages/clientes/orden-de-compra/orden-de-compra.component').then(m => m.OrdenDeCompraComponent)
            },
            {
                path: 'registro',
                title: 'Registro Cliente',
                loadComponent:()=> import('./pages/clientes/registro-clientes/registro-clientes.component').then(m => m.RegistroClientesComponent)
            }
        ]
    },
    {
        path: '',
        redirectTo: '/cliente',
        pathMatch: 'full'
    }
];
