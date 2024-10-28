// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { RevisionInventarioComponent } from './modules/inventario/revision-inventario/revision-inventario.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'produccion-diaria', loadChildren: () => import('./modules/produccion-diaria/produccion-diaria.module').then(m => m.ProduccionDiariaModule) },
      { path: 'tipos-producto', loadChildren: () => import('./modules/tipos-producto/tipos-producto.module').then(m => m.TiposProductoModule) },
      { path: 'materias-primas', loadChildren: () => import('./modules/materias-primas/materias-primas.module').then(m => m.MateriasPrimasModule) },
      { path: 'turnos-empleados', loadChildren: () => import('./modules/turnos-empleados/turnos-empleados.module').then(m => m.TurnosEmpleadosModule) },
      { path: 'reportes', loadChildren: () => import('./modules/reportes/reportes.module').then(m => m.ReportesModule) },
      { path: 'inventario', component: RevisionInventarioComponent }, 
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
