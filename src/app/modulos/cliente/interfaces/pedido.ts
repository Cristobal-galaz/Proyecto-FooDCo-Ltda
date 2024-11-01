export interface Pedido {
  _id: string;
  numero: string;
  estado: string; 
  fechaCreacion: Date;
  fechaRequerida: Date;
  precioTotalOrden: number;
}
  