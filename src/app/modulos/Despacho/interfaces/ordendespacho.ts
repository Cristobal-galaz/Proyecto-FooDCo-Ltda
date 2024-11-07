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
    camion:Camion;
    createdAt: Date;
    updatedAt: Date;
}

export interface Camion{
    nombreConductor: string;
    patente: string;
    tipoCamion: string;
}

export interface HistorialEstado {
    estado: string;
    fechaCambio: Date;
}
