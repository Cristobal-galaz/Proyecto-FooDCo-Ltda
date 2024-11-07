export interface Links {
    name: string;
    icon?: string;
    route?: string;
    children?: Links[];
}

export const Main: Links[] = [
    {
        name: 'Despacho', 
        icon: 'local_shipping',
        children: [
            { name: 'Tabla de Despachos', icon: 'assignment', route: 'despacho/tablaDespachos' },
            { name: 'GPS', icon: 'gps_fixed', route: 'despacho/seguimiento' }

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
];

export const Otros: Links[] = [
    { name: 'Ayuda', icon: 'help' },
];
