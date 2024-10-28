export interface Links {
    name: string;
    icon?: string;
    route?: string;
    children?: Links[];
}

export const Main: Links[] = [
    {
        name: 'Personal', icon: 'account_circle', route:'ventas/ejecutivo/personal-en'
        },
    {
    name: 'Pagos', icon: 'shopping_cart',
    children: [   {name: 'Pagos Terminados', icon: 'done_all', route:'ventas/ejecutivo/pago-en'}, 
                    {name: 'Pagos Pendientes', icon: 'shopping_car', route:'ventas/ejecutivo/pago-en'}, 
                    {name: 'Todos los Pagos', icon: 'list_alt', route:'ventas/ejecutivo/pago-en'},
                ],
    },
    {
    name: 'Orden de Compra', icon: 'account_circle',
    children: [   {name: 'Diario', icon: 'schedule', route:'ventas/ejecutivo/orden-compra-en'},
                    {name: 'Semanal', icon: 'calendar_today', route:'ventas/ejecutivo/orden-compra-en',},
                    {name: 'Bisemanal', icon: 'calendar_today', route:'ventas/ejecutivo/orden-compra-en'},
                    {name: 'Mensaul', icon: 'event', route:'ventas/ejecutivo/orden-compra-en',},
                    {name: 'Trimestral', icon: 'event', route:'ventas/ejecutivo/orden-compra-en'},
                    {name: 'Semestral', icon: 'calendar_month', route:'ventas/ejecutivo/orden-compra-en',},
                ],
    },
    {
        name: 'SubContratos', icon: 'supervised_user_circle', route:'ventas/ejecutivo/subcontratos-en'
        },
];

export const Otros: Links[] = [
    {name: 'Ayuda', icon: 'help'},
];