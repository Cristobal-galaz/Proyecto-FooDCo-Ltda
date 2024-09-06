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
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    costoProduccion: number;
    ingredientes: Ingrediente[];
    categoria: string;
    imagenes: string[];
    tipoDeServicio: string,
  }

export interface Ingrediente {
    id: string;
    codigoIngrediente: string;
    nombre: string;
    precio: number;
  }

export interface CantidadProducto{
    producto: Producto;
    cantidad: number;
}