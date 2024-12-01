import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { ExternService } from '../../services/extern.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [TranslateModule, MatRadioModule, MatCheckboxModule , MatSelectModule, MatInputModule, MatIconModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss'
})
export class ContactoComponent {

  contactoForm: FormGroup;

  constructor(private extern: ExternService) {
    this.contactoForm = new FormGroup({

      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      asunto: new FormControl('', Validators.required),
      mensaje: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    if (this.contactoForm.valid) {
      this.extern.sendContacMessage(this.contactoForm.value);

      console.log('Formulario validad', this.contactoForm.value);
    } else {
      console.log('error en el formulario');
    }
  }


}
