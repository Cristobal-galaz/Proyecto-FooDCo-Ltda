export interface Links {
    name: string;
    icon?: string;
    children?: Links[];
  }
  
export const Main: Links[] = [
    {
      name: 'Mis Pedidos', icon: 'shopping_cart',
      children: [   {name: 'Pedidos Actuales', icon: 'shopping_cart'}, 
                    {name: 'Pedidos Completados', icon: 'done_all'}, 
                    {name: 'Todos los Pedidos', icon: 'list_alt'},
                ],
    },
    {
      name: 'Mi Perfil', icon: 'account_circle',
      children: [   {name: 'Datos Empresa', icon: 'business'},
                    {name: 'Datos Contacto', icon: 'contact_mail'},
                ],
    },
  ];

  export const Otros: Links[] = [
    {name: 'Cerrar Sesión', icon: 'exit_to_app'},
    {name: 'Ayuda', icon: 'help'},
  ];