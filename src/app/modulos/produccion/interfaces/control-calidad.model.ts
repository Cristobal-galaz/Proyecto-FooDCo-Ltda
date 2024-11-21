export interface ControlCalidad {
    id: string;
    loteId: string;
    tipoProducto: string;
    fechaInspeccion: Date;
    estadoCalidad: 'Aprobado' | 'Rechazado';
    comentarios: string;
    inspector: string;
  }
  