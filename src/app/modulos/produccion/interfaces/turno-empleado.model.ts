export interface TurnoEmpleado {
  _id: string;
  empleado_id: string; // ID del empleado en lugar de su nombre directamente
  fecha: string; // Formato de fecha en string
  hora_inicio: string; // Hora de inicio en formato de cadena ("08:00")
  hora_fin: string; // Hora de fin en formato de cadena ("16:00")
}
