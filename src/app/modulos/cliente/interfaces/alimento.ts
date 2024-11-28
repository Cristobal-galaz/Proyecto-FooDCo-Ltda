export interface Menu {
  id: string,
    nombre: string,
    precio: number,
    disponible: boolean,
    productos: Producto[],
    dieta: string,
    fechaInicio: Date
  }

export interface Producto {
    _id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    costoProduccion: number;
    ingredientes: IngredienteConCantidad[];
    categoria: string;
    imagenes: string[];
    tipoDeServicio: string,
  }

  export interface IngredienteConCantidad {
    cantidadRequerida: number;  // Nueva propiedad para la cantidad requerida
    ingrediente: Ingrediente;  // Referencia al objeto Ingrediente
  }

  export interface Ingrediente {
    _id: string;
    codigoIngrediente: string;
    nombre: string;
    precio: number;
    almacen: string;
    medida: string;
    cantidad: number;
    createdAt: Date;
    updatedAt: Date;
  }

export interface CantidadProducto{
    producto: Producto;
    cantidad: number;
    seleccionado?: boolean;
}

export interface SeleccionProducto{
    productos: CantidadProducto[];
    clienteId: string;
    direccion: string;
    fecha: Date;
}