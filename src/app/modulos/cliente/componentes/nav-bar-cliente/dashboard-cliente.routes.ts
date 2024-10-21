import { Routes } from "@angular/router";

export const navBarCliente: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'historial',
        title: 'Historial',
        loadComponent: ()=>import('../historial-compras/historial-compras.component').then(m => m.HistorialComprasComponent),
    }, 
]