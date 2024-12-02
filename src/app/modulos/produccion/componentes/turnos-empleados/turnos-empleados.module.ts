import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TurnosEmpleadosListComponent } from './turnos-empleados-list/turnos-empleados-list.component';
import { TurnosEmpleadosFormComponent } from './turnos-empleados-form/turnos-empleados-form.component';
import { TurnosEmpleadosService } from '../../services/turnos-empleados.service';

@NgModule({
  declarations: [
    TurnosEmpleadosListComponent,
    TurnosEmpleadosFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: TurnosEmpleadosListComponent }, 
      { path: 'nuevo', component: TurnosEmpleadosFormComponent },
      { path: 'editar/:id', component: TurnosEmpleadosFormComponent },
    ])
  ]
})
export class TurnosEmpleadosModule { }
