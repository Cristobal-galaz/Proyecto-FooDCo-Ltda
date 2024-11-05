export interface Links {
    name: string;
    icon?: string;
    route?: string;
    children?: Links[];
}

export const Main: Links[] = [
    {
        name: 'Mis Pedidos', 
        icon: 'shopping_cart',
        children: [
            { name: 'Pedidos Actuales', icon: 'shopping_cart', route: 'cliente/pedidosActuales' },
            { name: 'Pedidos Completados', icon: 'done_all', route: 'cliente/pedidosCompletados' },
            { name: 'Todos los Pedidos', icon: 'list_alt', route: 'cliente/todosPedidos' }
        ],
    },
    {
        name: 'Mi Perfil', 
        icon: 'account_circle',
        children: [
            { name: 'Datos Empresa', icon: 'business', route: 'cliente/editarEmpresa' },
            { name: 'Datos Contacto', icon: 'contact_mail', route: 'cliente/editarContacto' }
        ],
    },
    {
        name: 'Despacho', 
        icon: 'local_shipping',
        children: [
            { name: 'Ordenes de Despacho Actuales', icon: 'assignment', route: 'despacho/ordenesActuales' },
            { name: 'Historial de Despachos', icon: 'history', route: 'despacho/historial' },
            { name: 'Crear Orden de Despacho', icon: 'add_circle', route: 'despacho/crearOrden' }
        ],
    },
];

export const Otros: Links[] = [
    { name: 'Ayuda', icon: 'help' },
];
