import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiposProductoListComponent } from './tipos-producto-list/tipos-producto-list.component';
import { TipoProductoFormComponent } from './tipo-producto-form/tipo-producto-form.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';

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
      { path: '', component: TiposProductoListComponent }, 
      { path: 'nuevo', component: TipoProductoFormComponent }, 
      { path: 'editar/:id', component: TipoProductoFormComponent } 
    ])
  ]
})
export class TiposProductoModule { }
