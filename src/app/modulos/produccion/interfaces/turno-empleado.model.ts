export interface TurnoEmpleado {
  _id?: string;
  empleado_id: {
    _id: string;
    username: string;
    nombre: string;
    email: string;
    rut?: string;
    departamento: {
      _id: string;
      nombre: string;
    };
    role: {
      _id: string;
      nombre: string;
    };
    sucursal?: {
      _id: string;
      nombre: string;
    };
    imagenPerfil?: string;
  };
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  createdAt?: Date;
  updatedAt?: Date;
}
