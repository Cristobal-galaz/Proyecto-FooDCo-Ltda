export interface Links {
    name: string;
    icon?: string;
    route?: string;
    children?: Links[];
}

export const Main: Links[] = [
    {
        name: 'Personal', icon: 'account_circle', route:'ventas/ejecutivo/personal'
        },
    {
    name: 'Pedidos', icon: 'bookmark', route:'ventas/ejecutivo/pedidos'
    },
    {
    name: 'Pagos', icon: 'shopping_cart', route:'ventas/ejecutivo/pago'
    },
    {
        name: 'Orden de Compra', icon: 'account_circle', route:'ventas/ejecutivo/orden-compra'
    },
    {
        name: 'SubContratos', icon: 'supervised_user_circle', route:'ventas/ejecutivo/subcontratos'
        },
    {
        name: 'Factura', icon: 'dataset', route:'ventas/ejecutivo/factura'
        },
];

export const Otros: Links[] = [
    {name: 'Ayuda', icon: 'help'},
];