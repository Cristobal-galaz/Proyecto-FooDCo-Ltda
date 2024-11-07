import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlCalidadFormComponent } from './control-calidad-form/control-calidad-form.component';
import { ControlCalidadListComponent } from './control-calidad-list/control-calidad-list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ControlCalidadFormComponent,
    ControlCalidadListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: ControlCalidadListComponent },
      { path: 'nuevo', component: ControlCalidadFormComponent },
      { path: 'editar/:id', component: ControlCalidadFormComponent },
      { path: 'evaluar', component: ControlCalidadFormComponent}
    ])
  ]
})
export class ControlCalidadModule { }
