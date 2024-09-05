import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material/material.module';
import { TurnosEmpleadosRoutingModule } from './turnos-empleados-routing.module';
import { TurnosEmpleadosListComponent } from './turnos-empleados-list/turnos-empleados-list.component';
import { TurnosEmpleadosFormComponent } from './turnos-empleados-form/turnos-empleados-form.component';


@NgModule({
  declarations: [
    TurnosEmpleadosListComponent,
    TurnosEmpleadosFormComponent
  ],
  imports: [
    CommonModule,
    TurnosEmpleadosRoutingModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: TurnosEmpleadosListComponent }, 
      { path: 'nuevo', component: TurnosEmpleadosFormComponent }, 
      { path: 'editar/:id', component: TurnosEmpleadosFormComponent } 
    ])
  ]
})
export class TurnosEmpleadosModule { }
