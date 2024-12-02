export interface Links {
    translationKey: string;
    icon?: string;
    route?: string;
    children?: Links[];
  }
  
  export const Main: Links[] = [
    {
      translationKey: 'NAV_CLIENT.MY_ORDERS', icon: 'shopping_cart',
      children: [
        { translationKey: 'NAV_CLIENT.ORDERS.CURRENT', icon: 'shopping_cart', route: 'cliente/pedidosActuales' },
        { translationKey: 'NAV_CLIENT.ORDERS.COMPLETED', icon: 'done_all', route: 'cliente/pedidosCompletados' },
        { translationKey: 'NAV_CLIENT.ORDERS.ALL', icon: 'list_alt', route: 'cliente/todosPedidos' },
      ],
    },
    {
      translationKey: 'NAV_CLIENT.MY_PROFILE', icon: 'account_circle',
      children: [
        { translationKey: 'NAV_CLIENT.DATA.COMPANY', icon: 'business', route: 'cliente/editarEmpresa' },
        { translationKey: 'NAV_CLIENT.DATA.CONTACT', icon: 'contact_mail', route: 'cliente/editarContacto' },
      ],
    },
  ];
  
  export const Otros: Links[] = [
    { translationKey: 'OTHERS.HELP', icon: 'help' },
  ];
  