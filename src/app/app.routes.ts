import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { authenticatedGuard } from './guards/authenticated.guard';
import { modulosRutas } from './modulos/modulos.routes';
import { LayoutComponent } from './modulos/produccion/layout/layout.component'; // Asegúrate de que el path es correcto

export const routes: Routes = [
  {
    path: 'cliente',
    title: 'Cliente',
    loadComponent: () => import('./pages/clientes/dashboard-cliente/dashboard-cliente.component').then(m => m.DashboardClienteComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'menus',
        title: 'Menus',
        loadComponent: () => import('./pages/clientes/menus/menus.component').then(m => m.MenusComponent),
        canActivate: [authGuard],
      },
      {
        path: 'orden',
        title: 'Orden',
        loadComponent: () => import('./pages/clientes/orden-de-compra/orden-de-compra.component').then(m => m.OrdenDeCompraComponent),
        canActivate: [authGuard],
      },
      {
        path: 'historial',
        title: 'Historial',
        loadComponent: () => import('./pages/clientes/historial-compras/historial-compras.component').then(m => m.HistorialDeComprasComponent),
        canActivate: [authGuard],
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/clientes/login-clientes/login-clientes.component').then(m => m.LoginClientesComponent),
    canActivate: [authenticatedGuard]
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/main/main.component').then(m => m.MainComponent),
  },
    {
        path: 'login-empleados',
        loadComponent: ()=> import('./pages/empleados/login-empleados/login-empleados.component'),
    },
  {
    path: 'registro',
    title: 'Registro Cliente',
    loadComponent: () => import('./pages/clientes/registro-clientes/registro-clientes.component').then(m => m.RegistroClientesComponent),
    canActivate: [authenticatedGuard]
  },
    {
        path: 'recovery',
        loadComponent: ()=> import('./pages/clientes/recovery-password/recovery-password.component').then(m => m.RecoveryPasswordComponent)
    },
    {
        path: 'change-password',
        loadComponent: ()=> import('./pages/clientes/change-password/change-password.component').then(m => m.ChangePasswordComponent)
    },
  {
    path: 'inicio',
    title: 'Inicio',
    loadComponent: () => import('./modulos/ventas/componentes/Espanol-comp/inicio/inicio.component').then(m => m.InicioComponent),
  },
  {
    path: 'inicio-en',
    title: 'Inicio (EN)',
    loadComponent: () => import('./modulos/ventas/componentes/English-comp/inicio-en/inicio-en.component').then(m => m.InicioEnComponent),
  },
  {
    path: 'mostrarorden',
    title: 'Mostrar Orden',
    loadComponent: () => import('./modulos/ventas/componentes/Espanol-comp/mostrarorden/mostrarorden.component').then(m => m.MostrarordenComponent),
  },
  {
    path: 'mostrarorden-en',
    title: 'Mostrar Orden (EN)',
    loadComponent: () => import('./modulos/ventas/componentes/English-comp/mostrarorden-en/mostrarorden-en.component').then(m => m.MostrarordenEnComponent),
  },
  {
    path: 'personal',
    title: 'Personal',
    loadComponent: () => import('./modulos/ventas/componentes/Espanol-comp/personal/personal.component').then(m => m.PersonalComponent),
  },
  {
    path: 'pago',
    title: 'Pagos Realizados',
    loadComponent: () => import('./modulos/ventas/componentes/Espanol-comp/ventas-pago/ventas-pago.component').then(m => m.VentasPagoComponent),
  },
  {
    path: 'pago-en',
    title: 'Payments Made',
    loadComponent: () => import('./modulos/ventas/componentes/English-comp/ventas-pago-en/ventas-pago-en.component').then(m => m.VentasPagoEnComponent),
  },
  {
    path: 'subcontratos',
    title: 'Subcontratos Activos',
    loadComponent: () => import('./modulos/ventas/componentes/Espanol-comp/subcontratos/subcontratos.component').then(m => m.SubcontratosComponent),
  },
  {
    path: 'subcontratos-en',
    title: 'Active Subcontracts (EN)',
    loadComponent: () => import('./modulos/ventas/componentes/English-comp/subcontratos-en/subcontratos-en.component').then(m => m.SubcontratosEnComponent),
  },
  {
    path: 'orden-compra',
    title: 'Orden de Compra',
    loadComponent: () => import('./modulos/ventas/componentes/Espanol-comp/orden-compra/orden-compra.component').then(m => m.OrdenCompraComponent),
  },
  {
    path: 'orden-compra-en',
    title: 'Orden de Compra (EN)',
    loadComponent: () => import('./modulos/ventas/componentes/English-comp/orden-compra-en/orden-compra-en.component').then(m => m.OrdenCompraEnComponent),
  },
  {
    path: 'ejecutivo',
    title: 'Ejecutivo',
    children: [
      {
        path: 'personal',
        title: 'Ejecutivo Personal',
        loadComponent: () => import('./modulos/ventas/componentes/Espanol-comp/eje-personal/eje-personal.component').then(m => m.EjePersonalComponent),
      },
      {
        path: 'personal-en',
        title: 'Executive Personnel (EN)',
        loadComponent: () => import('./modulos/ventas/componentes/English-comp/eje-personal-en/eje-personal-en.component').then(m => m.EjePersonalEnComponent),
      },
      {
        path: 'inicio',
        title: 'Ejecutivo Inicio',
        loadComponent: () => import('./modulos/ventas/componentes/Espanol-comp/eje-inicio/eje-inicio.component').then(m => m.EjeInicioComponent),
      },
      {
        path: 'inicio-en',
        title: 'Executive Home (EN)',
        loadComponent: () => import('./modulos/ventas/componentes/English-comp/eje-inicio-en/eje-inicio-en.component').then(m => m.EjeInicioEnComponent),
      }
    ]
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      ...modulosRutas
    ]
  },
  {
    path: 'produccion',
    component: LayoutComponent,  
    children: [
      {
        path: 'produccion-diaria',
        loadChildren: () => import('./modulos/produccion/componentes/produccion-diaria/produccion-diaria.module').then(m => m.ProduccionDiariaModule),
        title: 'Producción Diaria'
      },
      {
        path: 'materias-primas',
        loadChildren: () => import('./modulos/produccion/componentes/materias-primas/materias-primas.module').then(m => m.MateriasPrimasModule),
        title: 'Materias Primas'
      },
      {
        path: 'tipos-producto',
        loadChildren: () => import('./modulos/produccion/componentes/tipos-producto/tipos-producto.module').then(m => m.TiposProductoModule),
        title: 'Tipos de Producto'
      },
      {
        path: 'turnos-empleados',
        loadChildren: () => import('./modulos/produccion/componentes/turnos-empleados/turnos-empleados.module').then(m => m.TurnosEmpleadosModule),
        title: 'Turnos de Empleados'
      },
      {
        path: 'reportes',
        loadChildren: () => import('./modulos/produccion/componentes/reportes/reportes.module').then(m => m.ReportesModule),
        title: 'Reportes'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./modulos/produccion/componentes/dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'Dashboard Producción'
      },
      {
        path: 'inventario',
        loadComponent: () => import('./modulos/produccion/componentes/inventario/revision-inventario/revision-inventario.component').then(m => m.RevisionInventarioComponent),
        title: 'Revisión de Inventario'
      }
    ]
  }
];
