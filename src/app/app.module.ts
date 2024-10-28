import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Componente Dashboard
import { DashboardComponent } from './modules/dashboard/dashboard.component';
// Importa Módulos de Angular Material
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfirmDialogComponent } from './modules/shared/confirm-dialog/confirm-dialog.component';
import { LayoutComponent } from './layout/layout.component';
import { RevisionInventarioComponent } from './modules/inventario/revision-inventario/revision-inventario.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ConfirmDialogComponent,
    RevisionInventarioComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
