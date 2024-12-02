import {ChangeDetectionStrategy, Component, signal, inject} from '@angular/core';
import { JsonPipe } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {FormsModule, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Task } from '../../../interfaces/task';
import { MostrarProductosService } from '../../../services/mostrar-productos.service';
import { tipoMenu, categoriaMenu, servicioMenu, FiltroMenus } from '../../../interfaces/filtros'
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import { ApiMenusService } from '../../../services/api-menus.service';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-filtrar-producto',
  standalone: true,
  imports: [ReactiveFormsModule, 
            JsonPipe, 
            MatExpansionModule, 
            MatCheckboxModule, 
            FormsModule,
            MatCheckboxModule,
            MatCardModule,
            MatFormFieldModule,
            MatInputModule,
            MatSliderModule,
            MatButtonModule,
            TranslateModule],
            
  templateUrl: './filtrar-producto.component.html',
  styleUrl: './filtrar-producto.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltrarProductoComponent {

  filtros: FiltroMenus = {
  tipoAlimentacion: [...tipoMenu],
  categorias: [...categoriaMenu],
  servicios: [...servicioMenu],
  precio: { min: 0, max: 10000 }
};

  constructor(private menus: ApiMenusService) {
    
  }


  ngOnInit(): void {
  }



  cargarFiltros() {
    this.menus.filtros$.subscribe((filtros) => {
      if(filtros) {

        this.filtros = filtros
      }
    })
  }

  applyFiltros() {
    if(this.filtros){

      this.menus.updatefiltros(this.filtros);
      this.menus.filtrarMenus();
    }

  }
  limpiarFiltros() {
    this.menus.cleanFilers(); // Llama al servicio para resetear los filtros
  }

  getTranslationKeyForFoodType(tipo: string | null): string {
    if(tipo != null){
      return `FILTERS.FOOD_TYPE.OPTIONS.${tipo.toUpperCase()}`;
    }
    return '';
  }
  getTranslationKeyForService(tipo: string): string {
    return `FILTERS.SERVICES.OPTIONS.${tipo.toUpperCase()}`;
  }
  getTranslationKeyForCategories(tipo: string): string {
    return `FILTERS.CATEGORIES.OPTIONS.${tipo.toUpperCase()}`;
  }





  
  
}
