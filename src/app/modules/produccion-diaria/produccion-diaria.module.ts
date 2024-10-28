import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionDiariaListComponent } from './produccion-diaria-list/produccion-diaria-list.component';
import { ProduccionDiariaFormComponent } from './produccion-diaria-form/produccion-diaria-form.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material/material.module';


@NgModule({
  declarations: [
    ProduccionDiariaListComponent,
    ProduccionDiariaFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: ProduccionDiariaListComponent }, // Ruta base para listar producción diaria
      { path: 'nuevo', component: ProduccionDiariaFormComponent }, // Ruta para crear una nueva producción
      { path: 'editar/:id', component: ProduccionDiariaFormComponent } // Ruta para editar una producción existente
    ])
  ]
})
export class ProduccionDiariaModule { }
