import { Routes } from "@angular/router";

export const navBarVentas: Routes = [
    {
        path: '',
        redirectTo: '/dashboard/ventas',
        pathMatch: 'full'
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
                path: 'orden-compra',
                title: 'Orden de Compra',
                loadComponent: () => import('../Espanol-comp/orden-compra/orden-compra.component').then(m => m.OrdenCompraComponent),
            },
            {
                path: 'orden-compra-en',
                title: 'Orden de Compra (EN)',
                loadComponent: () => import('../English-comp/orden-compra-en/orden-compra-en.component').then(m => m.OrdenCompraEnComponent),
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
                path: 'pedidos',
                title: 'Pedidos',
                loadComponent: () => import('../Espanol-comp/pedido-aceptar/pedido-aceptar.component').then(m => m.PedidoAceptarComponent),
            },
            {
            path: 'factura',
            title: 'Factura',
            loadComponent: () => import('../Espanol-comp/factura/factura.component').then(m => m.FacturaComponent),
            },
        ]
    }

]