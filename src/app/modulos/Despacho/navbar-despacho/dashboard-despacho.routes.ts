import { Routes } from "@angular/router";


export const navBarDespacho: Routes = [
    {
        path: '',
        redirectTo: '/dashboard/despacho',
        pathMatch: 'full'
    },
    {
        path: 'asignacionDespacho',
        title: 'Asignar despacho',
        loadComponent: () => import('../componentes/asignacion-despacho/asignacion-despacho.component').then(m => m.AsignacionDespachoComponent),
    },
    {
        path: 'detalle/:id',
        title: 'Detalles del Despacho',
        loadComponent: () => import('../componentes/detalle-despacho/detalle-despacho.component').then(m => m.DetalleDespachoComponent),
    }
    
    /*,
    {
        path: 'historial',
        title: 'Historial de Despachos',
        loadComponent: () => import('../despacho/historial/historial-despacho.component').then(m => m.HistorialDespachoComponent),
    },
    {
        path: 'crearOrden',
        title: 'Crear Orden de Despacho',
        loadComponent: () => import('../despacho/crear-orden/crear-orden.component').then(m => m.CrearOrdenComponent),
    }*/
];
