import { Routes } from "@angular/router";
import { navBarCliente } from "./cliente/componentes/nav-bar-cliente/dashboard-cliente.routes";

export const modulosRutas: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'cliente',
        title: 'Pedidos Actuales',
        children: [
            ...navBarCliente
        ]
    }

   
]