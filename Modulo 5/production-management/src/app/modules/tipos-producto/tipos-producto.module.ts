import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiposProductoListComponent } from './tipos-producto-list/tipos-producto-list.component';
import { TipoProductoFormComponent } from './tipo-producto-form/tipo-producto-form.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [
    TiposProductoListComponent,
    TipoProductoFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: TiposProductoListComponent }, // Ruta base para listar tipos de producto
      { path: 'nuevo', component: TipoProductoFormComponent }, // Ruta para crear un nuevo tipo de producto
      { path: 'editar/:id', component: TipoProductoFormComponent } // Ruta para editar un tipo de producto existente
    ])
  ]
})
export class TiposProductoModule { }
