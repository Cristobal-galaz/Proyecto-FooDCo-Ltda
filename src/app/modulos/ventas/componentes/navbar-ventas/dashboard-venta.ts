import { Routes } from "@angular/router";

export const navBarVentas: Routes = [
    {
        path: '',
        redirectTo: '/dashboard/venta',
        pathMatch: 'full'
    },
    {
        path: 'inicio',
        title: 'Inicio',
        loadComponent: () => import('../Espanol-comp/inicio/inicio.component').then(m => m.InicioComponent),
    },
    {
        path: 'inicio-en',
        title: 'Inicio (EN)',
        loadComponent: () => import('../English-comp/inicio-en/inicio-en.component').then(m => m.InicioEnComponent),
    },
    {
        path: 'personal',
        title: 'Personal',
        loadComponent: () => import('../Espanol-comp/personal/personal.component').then(m => m.PersonalComponent),
    },
    
    {
        path: 'pago',
        title: 'Pagos Realizados',
        loadComponent: () => import('../Espanol-comp/ventas-pago/ventas-pago.component').then(m => m.VentasPagoComponent),
    },
    {
        path: 'pago-en',
        title: 'Payments Made',
        loadComponent: () => import('../English-comp/ventas-pago-en/ventas-pago-en.component').then(m => m.VentasPagoEnComponent),
    },
    {
        path: 'ejecutivo',
        title: 'Ejecutivo',
        children: [
            {
                path: 'personal',
                title: 'Ejecutivo Personal',
                loadComponent: () => import('../Espanol-comp/eje-personal/eje-personal.component').then(m => m.EjePersonalComponent),
            },
            {
                path: 'personal-en',
                title: 'Executive Personnel (EN)',
                loadComponent: () => import('../English-comp/eje-personal-en/eje-personal-en.component').then(m => m.EjePersonalEnComponent),
            },
            {
                path: 'inicio',
                title: 'Ejecutivo Inicio',
                loadComponent: () => import('../Espanol-comp/eje-inicio/eje-inicio.component').then(m => m.EjeInicioComponent),
            },
            {
                path: 'inicio-en',
                title: 'Executive Home (EN)',
                loadComponent: () => import('../English-comp/eje-inicio-en/eje-inicio-en.component').then(m => m.EjeInicioEnComponent),
            },    
            {
                path: 'subcontratos',
                title: 'Subcontratos Activos',
                loadComponent: () => import('../Espanol-comp/subcontratos/subcontratos.component').then(m => m.SubcontratosComponent),
            },
            {
                path: 'subcontratos-en',
                title: 'Active Subcontracts (EN)',
                loadComponent: () => import('../English-comp/subcontratos-en/subcontratos-en.component').then(m => m.SubcontratosEnComponent),
            },
            {
                path: 'mostrarorden',
                title: 'Mostrar Orden',
                loadComponent: () => import('../Espanol-comp/mostrarorden/mostrarorden.component').then(m => m.MostrarordenComponent),
            },
            {
                path: 'mostrarorden-en',
                title: 'Mostrar Orden (EN)',
                loadComponent: () => import('../English-comp/mostrarorden-en/mostrarorden-en.component').then(m => m.MostrarordenEnComponent),
            },
            {
                path: 'orden-compra',
                title: 'Orden de Compra',
                loadComponent: () => import('../Espanol-comp/orden-compra/orden-compra.component').then(m => m.OrdenCompraComponent),
            },
            {
                path: 'orden-compra-en',
                title: 'Orden de Compra (EN)',
                loadComponent: () => import('../English-comp/orden-compra-en/orden-compra-en.component').then(m => m.OrdenCompraEnComponent),
            },
        ]
    }

]