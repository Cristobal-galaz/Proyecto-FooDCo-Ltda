import {ChangeDetectionStrategy, Component, signal, computed} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Task } from '../../../interfaces/task';
import { MostrarProductosService } from '../../../services/mostrar-productos.service';

@Component({
  selector: 'app-filtrar-producto',
  standalone: true,
  imports: [MatExpansionModule, MatCheckboxModule, FormsModule],
  templateUrl: './filtrar-producto.component.html',
  styleUrl: './filtrar-producto.component.scss'
})
export class FiltrarProductoComponent {

  constructor(private mostrarProductosService: MostrarProductosService) {}

  ngOnInit(): void {
    this.mostrarProductosService.filters$.subscribe((filters: Task) => {
      this.task.set(filters);
    })
    
  }

  readonly task = signal<Task>({
    name: 'Categoria',
    completed: false,
    subtasks: [
      {name: 'Desayuno', completed: false},
      {name: 'Almuerzo', completed: false},
      {name: 'Cena', completed: false},
      {name: 'Colación', completed: false},
    ],
  });

  readonly partiallyComplete = computed(() => {
    const task = this.task();
    if (!task.subtasks) {
      return false;
    }
    return task.subtasks.some(t => t.completed) && !task.subtasks.every(t => t.completed);
  });

  update(completed: boolean, index?: number) {
    this.task.update(task => {
      if (index === undefined) {
        task.completed = completed;
        task.subtasks?.forEach(t => (t.completed = completed));
      } else {
        task.subtasks![index].completed = completed;
        task.completed = task.subtasks?.every(t => t.completed) ?? true;
      }

      this.mostrarProductosService.updateFilters(task);
      return {...task};
    });
  }
}
