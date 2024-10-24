export interface Pedido {
  _id: string;
  numero: string;
  estado: string; // "actual", "completado"
  fecha: Date;
}
  