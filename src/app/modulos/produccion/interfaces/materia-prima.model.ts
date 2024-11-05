export interface MateriaPrima {
  id: number;
  nombre: string;
  tipo: string;  // unidad, kilo, etc
  cantidad: number;
  stock_minimo: number;
  unidad: string;  
  fecha_ingreso: Date;
  fecha_vencimiento: Date;
}
