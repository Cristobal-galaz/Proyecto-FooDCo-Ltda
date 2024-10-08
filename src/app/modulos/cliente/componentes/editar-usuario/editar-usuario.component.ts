import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { ChangeDetectionStrategy } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [MatTabsModule, MatSelectModule, MatInputModule, MatFormFieldModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditarUsuarioComponent {

}
