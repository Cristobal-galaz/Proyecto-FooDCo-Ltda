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
            MatButtonModule],
  templateUrl: './filtrar-producto.component.html',
  styleUrl: './filtrar-producto.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltrarProductoComponent {

  filtros!: FiltroMenus;


  constructor(private menus: ApiMenusService) {}

  ngOnInit(): void {
    this.menus.filtros$.subscribe((filtros) => {
      this.filtros = filtros;
    })


  }

  applyFiltros() {
    this.menus.updatefiltros(this.filtros);
    this.menus.filtrarMenus();

  }
  limpiarFiltros() {
    this.menus.cleanFilers(); // Llama al servicio para resetear los filtros
  }





  
  
}
