import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { EstrellaComponent } from './estrella/estrella.component';

@Component({
  selector: 'app-valoracion',
  standalone: true,
  imports: [EstrellaComponent],
  templateUrl: './valoracion.component.html',
  styleUrls: ['./valoracion.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ValoracionComponent),
      multi: true
    }
  ]
})
export class ValoracionComponent implements ControlValueAccessor {
  stars: number[] = [1, 2, 3, 4, 5];
  rating = 0;
  hoverState = 0;

  private onChange = (rating: number) => {};
  private onTouched = () => {};

  enter(i: number) {
    this.hoverState = i;
  }

  leave() {
    this.hoverState = 0;
  }

  updateRating(i: number) {
    this.rating = i;
    this.onChange(this.rating);
    this.onTouched();
  }

  writeValue(rating: number): void {
    this.rating = rating;
  }

  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implementa la lógica para deshabilitar el componente si es necesario
  }
}
