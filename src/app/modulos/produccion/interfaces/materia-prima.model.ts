export interface MateriaPrima {
  _id: string;  
  nombre: string;
  tipo: string; 
  cantidad: number;
  stock_minimo: number;
  unidad: string;
  fecha_ingreso: Date;
  fecha_vencimiento: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
