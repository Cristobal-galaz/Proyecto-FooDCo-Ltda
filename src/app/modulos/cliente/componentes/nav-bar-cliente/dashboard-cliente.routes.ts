import { Routes } from "@angular/router";

export const navBarCliente: Routes = [
    {
        path: '',
        redirectTo: '/dashboard/cliente',
        pathMatch: 'full'
    },
    {
        path: 'pedidosActuales',
        title: 'Pedidos Actuales',
        loadComponent: ()=> import ('../pedidos/actuales/actuales.component').then(m => m.ActualesComponent),
    },
    {
        path: 'pedidosCompletados',
        title: 'Pedidos Completados',
        loadComponent: ()=> import ('../pedidos/completados/completados.component').then(m => m.CompletadosComponent),
    },
    {
        path: 'todosPedidos',
        title: 'Todos los Pedidos',
        loadComponent: ()=> import ('../pedidos/todos-pedidos/todos-pedidos.component').then(m => m.TodosPedidosComponent),
    },
    {
        path: 'editarEmpresa',
        title: 'Editar Empresa',
        loadComponent: ()=> import ('../editar/datos-empresa/datos-empresa.component').then(m => m.DatosEmpresaComponent)
    },
    {
        path: 'editarContacto',
        title: 'Editar Contacto',
        loadComponent: ()=> import ('../editar/datos-contacto/datos-contacto.component').then(m => m.DatosContactoComponent)
    }

]