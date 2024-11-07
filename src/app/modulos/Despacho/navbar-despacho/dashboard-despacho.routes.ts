import { Routes } from "@angular/router";


export const navBarDespacho: Routes = [
    {
        path: '',
        redirectTo: '/dashboard/despacho',
        pathMatch: 'full'
    },
    {
        path: 'tablaDespachos',
        title: 'Tabla de Despachos',
        loadComponent: () => import('../componentes/tabla-despachos/tabla-despachos.component').then(m => m.TablaDespachosComponent)
    },

    {
        path: 'asignacion/:id',
        title: 'Asignar Camión',
        loadComponent: () => import('../componentes/asignacion-despacho/asignacion-despacho.component').then(m => m.AsignacionDespachoComponent),
    },
    {
        path: 'detalle/:id',
        title: 'Ver Detalle',
        loadComponent: () => import('../componentes/detalle-despacho/detalle-despacho.component').then(m => m.DetalleDespachoComponent),
    },
];
