import { Routes } from "@angular/router";
import { navBarVentas } from "./ventas/componentes/navbar-ventas/dashboard-venta.route";
import { navBarCliente } from "./cliente/componentes/nav-bar-cliente/dashboard-cliente.routes";

export const modulosRutas: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'ventas',
        title: 'Inicio',
        children: [
            ...navBarVentas
        ]
    },
    {
        path: 'cliente',
        title: 'Pedidos Actuales',
        children: [
            ...navBarCliente
        ]
    }


]