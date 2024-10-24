export interface Compra {
    _id: string;
    numero: number;
    estado: string;
    // Añade aquí las otras propiedades que necesites
    // ejemplo:
    // fechaCompra?: Date;
    // total?: number;
  }
  
  export interface HistorialComprasResponse {
    compras: Compra[];
  }
  