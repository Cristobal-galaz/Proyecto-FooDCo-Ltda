import { Routes } from "@angular/router";
import { navBarVentas } from "./ventas/componentes/navbar-ventas/dashboard-venta.route";
import { navBarCliente } from "./cliente/componentes/nav-bar-cliente/dashboard-cliente.routes";
import { navBarDespacho } from "./Despacho/navbar-despacho/dashboard-despacho.routes";

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
    },
    {
        path: 'despacho',
        title: 'Despacho',
        children: [
            ...navBarDespacho
        ]
    }


]