export interface Links {
    name: string;
    icon?: string;
    route?: string;
    children?: Links[];
}

export const Main: Links[] = [
    {
        name: 'Personal', icon: 'account_circle', route:'ejecutivo/personal'
        },
    {
    name: 'Pagos', icon: 'shopping_cart',
    children: [   {name: 'Pagos Terminados', icon: 'shopping_cart', route:'ejecutivo/pagos'}, 
                    {name: 'Pagos Pendientes', icon: 'done_all', route:'ejecutivo/pagos'}, 
                    {name: 'Todos los Pagos', icon: 'list_alt', route:'ejecutivo/pago'},
                ],
    },
    {
    name: 'Orden de Compra', icon: 'account_circle',
    children: [   {name: 'Diario', icon: 'business', route:'ejecutivo/orden-compra'},
                    {name: 'Semanal', icon: 'contact_mail', route:'ejecutivo/orden-compra',},
                    {name: 'Bisemanal', icon: 'business', route:'ejecutivo/orden-compra'},
                    {name: 'Mensaul', icon: 'contact_mail', route:'ejecutivo/orden-compra',},
                    {name: 'Trimestral', icon: 'business', route:'ejecutivo/orden-compra'},
                    {name: 'Semestral', icon: 'contact_mail', route:'ejecutivo/orden-compra',},
                ],
    },
    {
        name: 'SubContratos', icon: 'account_circle', route:'ejecutivo/subcontratos'
        },
];

export const Otros: Links[] = [
    {name: 'Ayuda', icon: 'help'},
];