import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MateriasPrimasListComponent } from './materias-primas-list/materias-primas-list.component';
import { MateriasPrimasFormComponent } from './materias-primas-form/materias-primas-form.component';

const routes: Routes = [
  { path: '', component: MateriasPrimasListComponent },
  { path: 'form', component: MateriasPrimasFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MateriasPrimasRoutingModule { }
