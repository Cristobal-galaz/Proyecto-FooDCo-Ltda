export interface FiltroMenus {
  tipoAlimentacion: TipoMenu [],
  categorias: CategoriaMenu [],
  servicios: TipoServicio [],
  precio: { min: number, max: number}
}

export interface TipoMenu {
    tipo: string;
    seleccion: boolean;
}

export interface CategoriaMenu{
    tipo: string;
    seleccion: boolean;
}
export interface TipoServicio {
    tipo: string;
    seleccion: boolean;
}


  
export const tipoMenu: TipoMenu[] = [
    {
      tipo: "Omnivoro",
      seleccion: false
    },
    {
      tipo: "Vegetariano",
      seleccion: false
    },
    {
      tipo: "Sin Gluten",
      seleccion: false
    },
    {
      tipo: "Vegano",
      seleccion: false
    }
];

export const categoriaMenu: CategoriaMenu[] = [
    {
        tipo: "Desayuno",
        seleccion: false
    },
    {
        tipo: "Almuerzo",
        seleccion: false
    },
    {
        tipo: "Postre",
        seleccion: false
    },
    {
        tipo: "Cena",
        seleccion: false
    },
    {
        tipo: "Colacion",
        seleccion: false
    }
];

export const servicioMenu: TipoServicio[] = [
    {
        tipo: "Cafeteria",
        seleccion: false
    },
    {
        tipo: "Eventos",
        seleccion: false
    },
    {
        tipo: "Snacks",
        seleccion: false
    }
]

