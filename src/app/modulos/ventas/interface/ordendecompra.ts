export interface OrdenCompra{
    _id:string,
    cliente:Cliente,
    estado:string,
    seleccionProductos:SeleccionProducto,
    precioTotalOrden:number,
    iva:number,
    precioFinalConIva:number,
}

export interface Cliente{
    _id:string,
    username:string,
    email:string,
    password:string,
    empresa:Empresa,
    contacto:Contacto,
}

export interface Empresa{
    _id:string,
    rut_empresa:string,
    giro:string,
    direccion:string,
    comuna:string,
    ciudad:string,
    correo_contacto:string,
    telefono_empresa:string,
    nombre_empresa:string,
    rubro:Rubro,
}

export interface Rubro{
    nombre:string,
}

export interface Contacto{
    _id:string,
    nombre:string,
    apellido:string,
    telefono:string,
    email:string,
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
    descuento: number;
    precioUnitario: number,
    precioTotal:number;
}

export interface SeleccionProducto{
    productos: CantidadProducto[];
    clienteId: string;
    direccion: string;
    ciudad:string,
    pais:string,
    iva:number,
    fechaRequerida: Date;
    fechaCreacion: Date,
}
