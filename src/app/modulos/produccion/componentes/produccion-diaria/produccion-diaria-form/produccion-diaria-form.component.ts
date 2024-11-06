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
    // Cargar tipos de producto
    this.tipoProductoService.getTiposProducto().subscribe(data => {
      this.tiposProducto = data;
    });

    // Cargar materias primas
    this.materiasPrimasService.getMateriasPrimas().subscribe(data => {
      this.materiasPrimas = data;
    });

    // Verificar si es edición (tiene un ID de producción)
    this.produccionId = this.route.snapshot.params['id'];
    if (this.produccionId) {
      this.produccionDiariaService.getProduccionDiariaById(this.produccionId).subscribe(data => {
        this.produccionForm.patchValue(data);
        this.materiasPrimasUtilizadas = data.materiasPrimasUtilizadas || [];
      });
    }

    // Escuchar cambios en la selección de materia prima
    this.produccionForm.get('materia_prima')?.valueChanges.subscribe(materiaId => {
      this.mostrarUnidad(materiaId);
    });
  }

  // Función para mostrar la unidad de la materia prima seleccionada
  mostrarUnidad(materiaId: number): void {
    const materia = this.materiasPrimas.find(m => m._id === materiaId.toString());
    if (materia) {
      this.unidadSeleccionada = materia.unidad;
      this.produccionForm.get('unidad_materia')?.setValue(materia.unidad);  // Mostrar la unidad en el campo
    }
  }

  // Función para añadir materia prima a la lista de utilizadas
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
  
      // Limpiar los campos del formulario después de añadir
      this.produccionForm.get('materia_prima')?.reset();
      this.produccionForm.get('cantidad_usada')?.reset();
      this.produccionForm.get('unidad_materia')?.reset();  // Limpiar el campo de la unidad
      this.unidadSeleccionada = '';
    }
  }

  // Función para eliminar una materia prima de la lista
  removeMateriaPrima(index: number): void {
    this.materiasPrimasUtilizadas.splice(index, 1);
  }

  // Validación de la fecha de producción
  validateFechaProduccion(control: FormControl) {
    const fechaSeleccionada = new Date(control.value);
    const hoy = new Date();
    return fechaSeleccionada > hoy ? { fechaInvalida: true } : null;
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.produccionForm.valid) {
      const produccionData = {
        ...this.produccionForm.value,
        materiasPrimasUtilizadas: this.materiasPrimasUtilizadas
      };
  
      if (this.produccionId) {
        this.produccionDiariaService.updateProduccionDiaria(this.produccionId.toString(), produccionData).subscribe({
          next: () => this.router.navigate(['/produccion/produccion-diaria']), // Ruta ajustada
          error: error => console.error('Error al actualizar la producción diaria:', error)
        });
      } else {
        this.produccionDiariaService.addProduccionDiaria(produccionData).subscribe({
          next: () => this.router.navigate(['/produccion/produccion-diaria']), // Ruta ajustada
          error: error => console.error('Error al agregar la producción diaria:', error)
        });
      }
    }
  }
}