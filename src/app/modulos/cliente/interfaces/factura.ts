export interface Factura {
    _id: string;
    numero: string;
    cliente: {
        _id: string;
        username?: string;
        email: string;
        [key: string]: any;
    };
    ordenCompra: {
        _id: string;
        numero: number;
        cliente: string;
        estado: string;
        [key: string]: any;
    };
    archivo?: string;
    createdAt: string;
    updatedAt: string;
}
