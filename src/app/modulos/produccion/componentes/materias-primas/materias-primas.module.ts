import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriasPrimasRoutingModule } from './materias-primas-routing.module';
import { MateriasPrimasListComponent } from './materias-primas-list/materias-primas-list.component';
import { MateriasPrimasFormComponent } from './materias-primas-form/materias-primas-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MateriasPrimasListComponent,
    MateriasPrimasFormComponent
  ],
  imports: [
    CommonModule,
    MateriasPrimasRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: MateriasPrimasListComponent },
      { path: 'nuevo', component: MateriasPrimasFormComponent },
      { path: 'editar/:id', component: MateriasPrimasFormComponent }
    ])
  ]
})
export class MateriasPrimasModule { }
