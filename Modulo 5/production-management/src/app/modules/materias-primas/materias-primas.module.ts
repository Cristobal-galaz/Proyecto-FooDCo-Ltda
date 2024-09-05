import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriasPrimasRoutingModule } from './materias-primas-routing.module';
import { MateriasPrimasListComponent } from './materias-primas-list/materias-primas-list.component';
import { MateriasPrimasFormComponent } from './materias-primas-form/materias-primas-form.component';

@NgModule({
  declarations: [
    MateriasPrimasListComponent,
    MateriasPrimasFormComponent
  ],
  imports: [
    CommonModule,
    MateriasPrimasRoutingModule
  ]
})
export class MateriasPrimasModule { }
