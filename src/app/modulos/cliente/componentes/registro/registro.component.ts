//import { Component } from '@angular/core';
import {Component, inject} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';

import {ChangeDetectionStrategy} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatInputModule,MatFormFieldModule,MatStepperModule,MatButtonModule,MatSelectModule ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
}
