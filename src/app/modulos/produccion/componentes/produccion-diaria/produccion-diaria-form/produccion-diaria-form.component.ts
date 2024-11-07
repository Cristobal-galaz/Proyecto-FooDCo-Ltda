import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduccionDiariaService } from '../../../services/produccion-diaria.service';
import { TipoProductoService } from '../../../services/tipo-producto.service';
import { MateriasPrimasService } from '../../../services/materias-primas.service';
import { ProduccionDiaria } from '../../../interfaces/produccion-diaria.model';
import { TipoProducto } from '../../../interfaces/tipo-producto.model';
import { MateriaPrima } from '../../../interfaces/materia-prima.model';

@Component({
  selector: 'app-produccion-diaria-form',
  templateUrl: './produccion-diaria-form.component.html',
  styleUrls: ['./produccion-diaria-form.component.css']
})
export class ProduccionDiariaFormComponent implements OnInit {
  produccionForm: FormGroup;
  tiposProducto: TipoProducto[] = [];
  materiasPrimas: MateriaPrima[] = [];
  materiasPrimasUtilizadas: any[] = [];  
  produccionId: string | null = null;
  unidadSeleccionada: string = '';  

  constructor(
    private fb: FormBuilder,
    private produccionDiariaService: ProduccionDiariaService,
    private tipoProductoService: TipoProductoService,
    private materiasPrimasService: MateriasPrimasService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.produccionForm = this.fb.group({
      tipo_producto_id: ['', Validators.required],
      materia_prima: [''],  
      cantidad_usada: [''],  
      cantidad_producida: ['', [Validators.required, Validators.min(1)]],
      fecha_produccion: ['', [Validators.required, this.validateFechaProduccion]],
      unidad_materia: [{value: '', disabled: true}]  
    });
  }

  ngOnInit(): void {
    this.tipoProductoService.getTiposProducto().subscribe(data => {
      this.tiposProducto = data;
    });

    this.materiasPrimasService.getMateriasPrimas().subscribe(data => {
      this.materiasPrimas = data;
    });

    this.produccionId = this.route.snapshot.params['id'];
    if (this.produccionId) {
      this.produccionDiariaService.getProduccionDiariaById(this.produccionId).subscribe(data => {
        this.produccionForm.patchValue(data);
        this.materiasPrimasUtilizadas = data.materiasPrimasUtilizadas || [];
      });
    }

    this.produccionForm.get('materia_prima')?.valueChanges.subscribe(materiaId => {
      this.mostrarUnidad(materiaId);
    });
  }

  mostrarUnidad(materiaId: any): void {
    if (materiaId) {
      const materia = this.materiasPrimas.find(m => m._id === materiaId.toString());
      if (materia) {
        this.unidadSeleccionada = materia.unidad;
        this.produccionForm.get('unidad_materia')?.setValue(materia.unidad);
      }
    } else {
      this.unidadSeleccionada = '';
      this.produccionForm.get('unidad_materia')?.setValue('');
    }
  }

  addMateriaPrima(): void {
    const materiaId = this.produccionForm.get('materia_prima')?.value;
    const cantidadUsada = this.produccionForm.get('cantidad_usada')?.value;

    const materia = this.materiasPrimas.find(m => m._id === materiaId);
    if (materia && cantidadUsada > 0) {
      this.materiasPrimasUtilizadas.push({
        id: materia._id,
        nombre: materia.nombre,
        cantidadUsada,
        unidad: materia.unidad
      });

      this.produccionForm.get('materia_prima')?.reset();
      this.produccionForm.get('cantidad_usada')?.reset();
      this.produccionForm.get('unidad_materia')?.reset();  
      this.unidadSeleccionada = '';
    }
  }

  removeMateriaPrima(index: number): void {
    this.materiasPrimasUtilizadas.splice(index, 1);
  }

  validateFechaProduccion(control: FormControl) {
    const fechaSeleccionada = new Date(control.value);
    const hoy = new Date();
    return fechaSeleccionada > hoy ? { fechaInvalida: true } : null;
  }

  // produccion-diaria-form.component.ts
  onSubmit(): void {
    if (this.produccionForm.valid) {
      const produccionData = {
        ...this.produccionForm.value,
        materiasPrimasUtilizadas: this.materiasPrimasUtilizadas
      };
  
      if (this.produccionId) {
        // Si se está editando una producción diaria existente
        this.produccionDiariaService.updateProduccionDiaria(this.produccionId.toString(), produccionData).subscribe({
          next: () => this.router.navigate(['/produccion/produccion-diaria']), 
          error: error => console.error('Error al actualizar la producción diaria:', error)
        });
      } else {
        // Creación de una nueva producción diaria
        this.produccionDiariaService.addProduccionDiaria(produccionData).subscribe({
          next: (nuevaProduccion) => {
            // Redirige directamente al formulario de Control de Calidad con el ID de la nueva producción
            this.router.navigate(['/produccion/control-calidad/evaluar'], {
              queryParams: { produccionId: nuevaProduccion._id } // Pasa el ID de la producción recién creada
            });
          },
          error: error => console.error('Error al agregar la producción diaria:', error)
        });
      }
    }
  }


  onCancel(): void {
    this.router.navigate(['/produccion/produccion-diaria']);
  }
}
