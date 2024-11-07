import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriasPrimasService } from '../../../services/materias-primas.service';
import { MateriaPrima } from '../../../interfaces/materia-prima.model';

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
      cantidad: ['', [Validators.required, Validators.min(1)]],
      stock_minimo: ['', [Validators.required, Validators.min(0)]],
      unidad: ['', Validators.required]
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
      const materiaPrima: MateriaPrima = this.materiaPrimaForm.value;

      if (this.materiaPrimaId) {
        this.materiasPrimasService.updateMateriaPrima(this.materiaPrimaId, materiaPrima).subscribe(() => {
          this.router.navigate(['/produccion/materias-primas']);
        });
      } else {
        this.materiasPrimasService.addMateriaPrima(materiaPrima).subscribe(() => {
          this.router.navigate(['/produccion/materias-primas']);
        });
      }
    }
  }
}
