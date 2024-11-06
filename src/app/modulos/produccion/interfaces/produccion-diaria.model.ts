export interface ProduccionDiaria {
    _id: string;
    tipo_producto_id: {
        _id: string;
        nombre: string;
        createdAt: string;
        updatedAt: string;
    };
    cantidad_producida: number;
    fecha_produccion: string;
    materiasPrimasUtilizadas: {
        id: {
            _id: string;
            nombre: string;
            tipo: string;
            cantidad: number;
            stock_minimo: number;
            unidad: string;
            fecha_ingreso: string;
            fecha_vencimiento: string;
            createdAt: string;
            updatedAt: string;
        };
        nombre: string;
        cantidadUsada: number;
        unidad: string;
        _id: string;
    }[];
    createdAt: string;
    updatedAt: string;
}
