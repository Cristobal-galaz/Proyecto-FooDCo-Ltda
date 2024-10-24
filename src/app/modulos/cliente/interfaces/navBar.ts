export interface Links {
    name: string;
    icon?: string;
    route?: string;
    children?: Links[];
  }
  
export const Main: Links[] = [
    {
      name: 'Mis Pedidos', icon: 'shopping_cart',
      children: [   {name: 'Pedidos Actuales', icon: 'shopping_cart', route:'pedidosActuales'}, 
                    {name: 'Pedidos Completados', icon: 'done_all', route:'pedidosCompletados'}, 
                    {name: 'Todos los Pedidos', icon: 'list_alt', route:'todosPedidos'},
                ],
    },
    {
      name: 'Mi Perfil', icon: 'account_circle',
      children: [   {name: 'Datos Empresa', icon: 'business', route:'editarEmpresa'},
                    {name: 'Datos Contacto', icon: 'contact_mail', route:'editarContacto',}
                ],
    },
  ];

  export const Otros: Links[] = [
    {name: 'Ayuda', icon: 'help'},
  ];