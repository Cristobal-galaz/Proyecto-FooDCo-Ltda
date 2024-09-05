import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PersonalComponent } from './personal/personal.component';
import { InicioComponent } from './inicio/inicio.component';
import { ConexionService } from './Service/conexion.service';  // Ajusta la ruta según tu estructura
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { Routes } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    PersonalComponent,
    InicioComponent
    // otros componentes
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    // otros módulos
  ],
  providers: [ConexionService],  // Añadir el servicio aquí si no usas providedIn: 'root'
  bootstrap: [AppComponent]
})
export class AppModule { }
