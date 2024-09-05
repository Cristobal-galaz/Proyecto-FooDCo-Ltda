import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoProductoService } from '../../../core/services/tipo-producto.service';
import { TipoProducto } from '../../../models/tipo-producto.model';

@Component({
  selector: 'app-tipo-producto-form',
  templateUrl: './tipo-producto-form.component.html',
  styleUrls: ['./tipo-producto-form.component.css']
})
export class TipoProductoFormComponent implements OnInit {
  tipoProductoForm: FormGroup;
  tipoProductoId: string | null = null;
  isEdit: boolean = false;
  tiposProducto: TipoProducto[] = [];  // Lista para validar duplicados

  constructor(
    private fb: FormBuilder,
    private tipoProductoService: TipoProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.tipoProductoForm = this.fb.group({
      nombre: ['', [Validators.required, this.validateNombreProducto.bind(this)]]
    });
  }

  ngOnInit(): void {
    // Cargar los tipos de producto para la validación
    this.tipoProductoService.getTiposProducto().subscribe((data: TipoProducto[]) => {
      this.tiposProducto = data;
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.isEdit = true;
      this.tipoProductoId = idParam;
      this.tipoProductoService.getTipoProductoById(this.tipoProductoId).subscribe(data => {
        this.tipoProductoForm.patchValue(data);
      });
    } else {
      this.isEdit = false;
    }
  }

  // Validación personalizada para evitar nombres duplicados
  validateNombreProducto(control: FormControl): { [key: string]: boolean } | null {
    const nombreIngresado = control.value.trim().toLowerCase();
    const productoDuplicado = this.tiposProducto.some(
      (producto) => producto.nombre.trim().toLowerCase() === nombreIngresado
    );

    // Si existe un producto con el mismo nombre y no estamos editando el mismo, marcar error
    if (productoDuplicado && !this.isEditandoElMismoRegistro(nombreIngresado)) {
      return { nombreDuplicado: true };
    }
    return null;
  }

  // Verifica si estamos editando el mismo registro para permitir el mismo nombre
  isEditandoElMismoRegistro(nombreIngresado: string): boolean {
    if (this.tipoProductoId !== null) {
      const tipoProductoActual = this.tiposProducto.find(tp => tp.id === this.tipoProductoId);
      return tipoProductoActual?.nombre.trim().toLowerCase() === nombreIngresado;
    }
    return false;
  }

  onSubmit(): void {
    if (this.tipoProductoForm.valid) {
      const tipoProducto: TipoProducto = this.tipoProductoForm.value;

      if (this.isEdit && this.tipoProductoId) {
        this.tipoProductoService.updateTipoProducto(this.tipoProductoId, tipoProducto).subscribe(() => {
          this.router.navigate(['/tipos-producto']);
        });
      } else {
        this.tipoProductoService.addTipoProducto(tipoProducto).subscribe(() => {
          this.router.navigate(['/tipos-producto']);
        });
      }
    }
  }
}
