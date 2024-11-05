import { Cliente, OrdenCompra } from "../../ventas/interface/ordendecompra";

export interface OrdenDespacho {
    _id: string;
    numero: number;
    cliente: Cliente;
    estado: string;
    fechaRequerida: Date;
    fecha: Date;
    ordenCompra: OrdenCompra;
    historialEstados: HistorialEstado[];
    createdAt: Date;
    updatedAt: Date;
}

export interface HistorialEstado {
    estado: string;
    fechaCambio: Date;
}
