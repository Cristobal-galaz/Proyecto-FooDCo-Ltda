import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PersonalComponent } from './personal/personal.component';
import { InicioComponent } from './inicio/inicio.component';
import { InicioEnComponent } from './inicio-en/inicio-en.component'; // Asegúrate de importar el nuevo componente
import { ConexionService } from './Service/conexion.service';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PersonalComponent,
    InicioComponent,
    InicioEnComponent // Asegúrate de agregar el nuevo componente aquí
  ],
  imports: [
    BrowserModule,
    CommonModule,  // Asegúrate de incluir CommonModule
    AppRoutingModule
  ],
  providers: [ConexionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
