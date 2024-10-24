import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { authenticatedGuard } from './guards/authenticated.guard';
import { navBarCliente } from './modulos/cliente/componentes/nav-bar-cliente/dashboard-cliente.routes';
import { modulosRutas } from './modulos/modulos.routes';

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
            {
                path: 'historial',
                title: 'Historial',
                loadComponent: ()=>import('./pages/clientes/historial-compras/historial-compras.component').then(m => m.HistorialDeComprasComponent),
                canActivate: [authGuard],
            },   
        ]
    },
    {
        path: '',
        redirectTo: '/inicio',
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
        //canActivate: [authenticatedGuard]
    },
    {
        path: 'inicio',
        title: 'Inicio',
        loadComponent:()=> import('./modulos/ventas/componentes/inicio/inicio.component').then(m => m.InicioComponent),
    },
    {
        path: 'mostrarorden',
        title: 'Mostrar Orden',
        loadComponent:()=> import('./modulos/ventas/componentes/mostrarorden/mostrarorden.component').then(m => m.MostrarordenComponent),
    },
    {
        path: 'personal',
        title: 'Personal',
        loadComponent:()=> import('./modulos/ventas/componentes/personal/personal.component').then(m => m.PersonalComponent),
    },
    {
        path: 'orden',
        title: 'Orden',
        loadComponent:()=> import('./modulos/ventas/componentes/orden-compra/orden-compra.component').then(m => m.OrdenCompraComponent),
    },
    {
        path: 'inicio-en',
        title: 'Inicio-en',
        loadComponent:()=> import('./modulos/ventas/componentes/inicio-en/inicio-en.component').then(m => m.InicioEnComponent),
    },
    {
        path: 'dashboard',
        title: 'Dashbaord',
        loadComponent:()=> import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        children:  [
            ...modulosRutas
        ]
    }
];
