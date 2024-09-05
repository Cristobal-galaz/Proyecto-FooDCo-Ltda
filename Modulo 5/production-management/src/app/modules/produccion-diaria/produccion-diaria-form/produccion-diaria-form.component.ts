import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';import { ActivatedRoute, Router } from '@angular/router';
import { ProduccionDiariaService } from '../../../core/services/produccion-diaria.service';
import { TipoProductoService } from '../../../core/services/tipo-producto.service'; // Servicio para obtener tipos de productos
import { ProduccionDiaria } from '../../../models/produccion-diaria.model';
import { TipoProducto } from '../../../models/tipo-producto.model';

@Component({
  selector: 'app-produccion-diaria-form',
  templateUrl: './produccion-diaria-form.component.html',
  styleUrls: ['./produccion-diaria-form.component.css']
})
export class ProduccionDiariaFormComponent implements OnInit {
  produccionForm: FormGroup;
  tiposProducto: TipoProducto[] = [];
  produccionId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private produccionDiariaService: ProduccionDiariaService,
    private tipoProductoService: TipoProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.produccionForm = this.fb.group({
      tipo_producto_id: ['', Validators.required],
      cantidad_producida: ['', [Validators.required, Validators.min(1)]],
      fecha_produccion: ['', [Validators.required, this.validateFechaProduccion ]]
    });
  }

  ngOnInit(): void {
    // Cargar los tipos de producto
    this.tipoProductoService.getTiposProducto().subscribe(data => {
      this.tiposProducto = data;
    }, error => {
      console.error('Error al cargar tipos de producto:', error);
    });

    this.produccionId = this.route.snapshot.params['id']; // Obtener el ID de la ruta
    if (this.produccionId) {
      // Si hay un ID, carga el registro existente para edición
      this.produccionDiariaService.getProduccionDiariaById(this.produccionId).subscribe(data => {
        this.produccionForm.patchValue(data);
      });
    }
  }

  // Función de validación personalizada para la fecha
  validateFechaProduccion(control: FormControl) {
    const fechaSeleccionada = new Date(control.value);
    const hoy = new Date();
    if (fechaSeleccionada > hoy) {
      return { fechaInvalida: true }; // Devuelve un error si la fecha es futura
    }
    return null; // Si la fecha es válida, no hay error
  }

  onSubmit(): void {
    if (this.produccionForm.valid) {
      const produccionDiaria: ProduccionDiaria = this.produccionForm.value;
      if (this.produccionId) {
        // Si hay un ID, actualiza el registro existente
        this.produccionDiariaService.updateProduccionDiaria(this.produccionId, produccionDiaria).subscribe(() => {
          this.router.navigate(['/produccion-diaria']);
        });
      } else {
        // Si no hay ID, crea un nuevo registro
        this.produccionDiariaService.addProduccionDiaria(produccionDiaria).subscribe(() => {
          this.router.navigate(['/produccion-diaria']);
        });
      }
    }
  }
}
