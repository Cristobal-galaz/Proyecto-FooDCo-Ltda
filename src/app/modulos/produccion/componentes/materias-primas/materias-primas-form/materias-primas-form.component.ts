import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriasPrimasService } from '../../../services/materias-primas.service';

@Component({
  selector: 'app-materias-primas-form',
  templateUrl: './materias-primas-form.component.html',
  styleUrls: ['./materias-primas-form.component.css']
})
export class MateriasPrimasFormComponent implements OnInit {
  materiaPrimaForm: FormGroup;
  materiaPrimaId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private materiasPrimasService: MateriasPrimasService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.materiaPrimaForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      stock_minimo: ['', [Validators.required, Validators.min(0)]],
      unidad: ['', Validators.required],
      fecha_ingreso: ['', Validators.required],
      fecha_vencimiento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.materiaPrimaId = this.route.snapshot.paramMap.get('id');
    if (this.materiaPrimaId) {
      this.materiasPrimasService.getMateriaPrimaById(this.materiaPrimaId).subscribe(data => {
        this.materiaPrimaForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.materiaPrimaForm.valid) {
      const materiaPrima = this.materiaPrimaForm.value;

      if (this.materiaPrimaId) {
        this.materiasPrimasService.updateMateriaPrima(this.materiaPrimaId, materiaPrima).subscribe({
          next: () => this.router.navigate(['/produccion/materias-primas']),
          error: error => console.error('Error al actualizar materia prima:', error)
        });
      } else {
        this.materiasPrimasService.addMateriaPrima(materiaPrima).subscribe({
          next: () => this.router.navigate(['/produccion/materias-primas']),
          error: error => console.error('Error al agregar materia prima:', error)
        });
      }
    }
  }
}
