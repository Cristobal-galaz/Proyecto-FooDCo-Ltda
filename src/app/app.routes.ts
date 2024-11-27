import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { authenticatedGuard } from './guards/authenticated.guard';
import { modulosRutas } from './modulos/modulos.routes';
import { LayoutComponent } from './modulos/produccion/componentes/layout/layout.component'; 

export const routes: Routes = [
  {
    path: 'cliente',
    title: 'Cliente',
    loadComponent: () => import('./pages/clientes/dashboard-cliente/dashboard-cliente.component').then(m => m.DashboardClienteComponent),
    children: [
      {
        path: 'menus',
        title: 'Menus',
        loadComponent: () => import('./pages/clientes/menus/menus.component').then(m => m.MenusComponent),
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
        path: 'control-calidad',
        loadChildren: () => import('./modulos/produccion/componentes/control-calidad/control-calidad.module').then(m => m.ControlCalidadModule),
        title: 'Control de Calidad'
      },
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
      },
    ]
  },
  {
    path: 'guia-despacho',
    title: 'Guia del despacho',
    loadComponent: () => import('./modulos/Despacho/componentes/guia-despacho/guia-despacho.component').then(m=>m.GuiaDespachoComponent),
  },
  {
    path: 'contacto',
    title: 'Contactanos',
    loadComponent: () => import('./pages/contacto/contacto.component').then(m => m.ContactoComponent)
  }
];
