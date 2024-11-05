export interface ProduccionDiaria {
    id: number;
    tipo_producto_id: number;
    cantidad_producida: number;
    fecha_produccion: Date;
    materiasPrimasUtilizadas: { id: number; nombre: string; cantidadUsada: number; unidad: string }[];
}
  
