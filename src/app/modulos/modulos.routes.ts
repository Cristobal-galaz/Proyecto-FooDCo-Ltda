import { Routes } from "@angular/router";
import { NavbarVentasComponent } from "./ventas/componentes/navbar-ventas/navbar-ventas.component";
import { navBarVentas } from "./ventas/componentes/navbar-ventas/dashboard-venta";

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
    }


]