//import { Component } from '@angular/core';
import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';

import {ChangeDetectionStrategy} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';

import { OptionService } from '../../services/api-rubros.service'; // Asegúrate de usar la ruta correcta

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatInputModule,MatFormFieldModule,MatStepperModule,MatButtonModule,MatSelectModule ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit{
  
  opciones: any[] = [];
  constructor(private optionService: OptionService) { }

  ngOnInit(): void {
    this.cargarOpciones();
  }

  cargarOpciones(): void {
    this.optionService.getRubros().subscribe((data: any[]) => {
      this.opciones = data;
    }, error => {
      console.error('Error al cargar las opciones', error);
    });
  }
  
  
  
  private _formBuilder = inject(FormBuilder);


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
}
