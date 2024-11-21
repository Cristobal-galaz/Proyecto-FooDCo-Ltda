import { SeleccionProducto } from './alimento';
export interface Pedido {
  _id: string;
  numero: string;
  estado: string; 
  fechaCreacion: Date;
  fechaRequerida: Date;
  precioTotalOrden: number;
  precioFinalConIva: number;
  seleccionProductos: SeleccionProducto;
  factura?: string | null;
  valoracion?: Valoracion;
}

export interface Valoracion {
  success: boolean | null;
  data: ValoracionData[];
}

export interface ValoracionData {
  foodQuality: number;
  menuVariety: number;
  deliveryTime: number;
  staffFriendliness: number;
  cleanliness: number;
  specialRequests: number;
  valueForMoney: number;
  easeOfContact: number;
  creativity: number;
  overallSatisfaction: number;
  comentario: string;
  totalScore: number;
  ordenCompra: string;
}
  