import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { authenticatedGuard } from './guards/authenticated.guard';

export const routes: Routes = [
    {
        path: 'cliente',
        title: 'Cliente',
        loadComponent: () => import('./pages/clientes/dashboard-cliente/dashboard-cliente.component').then(m => m.DashboardClienteComponent),
        canActivate: [authGuard],
        children: [
            {
                path: 'menus',
                title: 'Menus',
                loadComponent: () => import('./pages/clientes/menus/menus.component').then(m => m.MenusComponent),
                canActivate: [authGuard],
            },
            {
                path: 'orden',
                title: 'Orden',
                loadComponent: () => import('./pages/clientes/orden-de-compra/orden-de-compra.component').then(m => m.OrdenDeCompraComponent),
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
        loadComponent: () => import('./pages/clientes/login-clientes/login-clientes.component'),
        canActivate: [authenticatedGuard]
    },
    {
        path: 'registro',
        title: 'Registro Cliente',
        loadComponent: () => import('./pages/clientes/registro-clientes/registro-clientes.component').then(m => m.RegistroClientesComponent),
        canActivate: [authenticatedGuard]
    },
    {
        path: 'inicio',
        title: 'Inicio',
        loadComponent: () => import('./modulos/ventas/componentes/Espanol-comp/inicio/inicio.component').then(m => m.InicioComponent),
    },
    {
        path: 'inicio-en',
        title: 'Inicio (EN)',
        loadComponent: () => import('./modulos/ventas/componentes/English-comp/inicio-en/inicio-en.component').then(m => m.InicioEnComponent),
    },
    {
        path: 'mostrarorden',
        title: 'Mostrar Orden',
        loadComponent: () => import('./modulos/ventas/componentes/Espanol-comp/mostrarorden/mostrarorden.component').then(m => m.MostrarordenComponent),
    },
    {
        path: 'mostrarorden-en',
        title: 'Mostrar Orden (EN)',
        loadComponent: () => import('./modulos/ventas/componentes/English-comp/mostrarorden-en/mostrarorden-en.component').then(m => m.MostrarordenEnComponent),
    },
    {
        path: 'personal',
        title: 'Personal',
        loadComponent: () => import('./modulos/ventas/componentes/Espanol-comp/personal/personal.component').then(m => m.PersonalComponent),
    },
    
    {
        path: 'pago',
        title: 'Pagos Realizados',
        loadComponent: () => import('./modulos/ventas/componentes/Espanol-comp/ventas-pago/ventas-pago.component').then(m => m.VentasPagoComponent),
    },
    {
        path: 'orden-compra',
        title: 'Orden de Compra',
        loadComponent: () => import('./modulos/ventas/componentes/Espanol-comp/orden-compra/orden-compra.component').then(m => m.OrdenCompraComponent),
    },
    {
        path: 'orden-compra-en',
        title: 'Orden de Compra (EN)',
        loadComponent: () => import('./modulos/ventas/componentes/English-comp/orden-compra-en/orden-compra-en.component').then(m => m.OrdenCompraEnComponent),
    },
    {
        path: 'ejecutivo',
        title: 'Ejecutivo',
        children: [
            {
                path: 'personal',
                title: 'Ejecutivo Personal',
                loadComponent: () => import('./modulos/ventas/componentes/Espanol-comp/eje-personal/eje-personal.component').then(m => m.EjePersonalComponent),
            },
            {
                path: 'personal-en',
                title: 'Executive Personnel (EN)',
                loadComponent: () => import('./modulos/ventas/componentes/English-comp/eje-personal-en/eje-personal-en.component').then(m => m.EjePersonalEnComponent),
            },
            {
                path: 'inicio',
                title: 'Ejecutivo Inicio',
                loadComponent: () => import('./modulos/ventas/componentes/Espanol-comp/eje-inicio/eje-inicio.component').then(m => m.EjeInicioComponent),
            },
            {
                path: 'inicio-en',
                title: 'Executive Home (EN)',
                loadComponent: () => import('./modulos/ventas/componentes/English-comp/eje-inicio-en/eje-inicio-en.component').then(m => m.EjeInicioEnComponent),
            }
        ]
    }
];
