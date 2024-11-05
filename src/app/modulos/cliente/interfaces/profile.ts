export interface Profile{
    empresa: Empresa;
    contacto: Contacto;
    email: string;
    password?: string;
    username: string;
}

export interface Empresa{
    ciudad?: string;
    comuna?: string;
    direccion?:string;
    correo_contacto?: string;
    giro?: string;
    nombre_empresa?: string;
    rubro?: Rubro;
    rut_empresa?:string;
    telefono_empresa?: string;
}
export interface Contacto{
    apellido: string;
    nombre: string;
    email: string;
    telefono: string;
}
export interface Rubro{
    _id: string;
    nombre: string;
}
export interface Verification{
    id: string;
    password: string;
}