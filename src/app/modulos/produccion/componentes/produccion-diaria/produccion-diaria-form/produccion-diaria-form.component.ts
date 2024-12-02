import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduccionDiariaService } from '../../../services/produccion-diaria.service';
import { TipoProductoService } from '../../../services/tipo-producto.service';
import { MateriasPrimasService } from '../../../services/materias-primas.service';
import { ProduccionDiaria } from '../../../interfaces/produccion-diaria.model';
import { TipoProducto } from '../../../interfaces/tipo-producto.model';
import { MateriaPrima } from '../../../interfaces/materia-prima.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.produccionForm = this.fb.group({
      tipo_producto_id: ['', Validators.required],
      materia_prima: [''],
      cantidad_usada: [''],
      cantidad_producida: ['', [Validators.required, Validators.min(1)]],
      fecha_produccion: ['', [Validators.required, this.validateFechaProduccion]],
      unidad_materia: [{ value: '', disabled: true }]
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
  
    const materia = this.materiasPrimas.find((m) => m._id === materiaId);
    if (materia) {
      if (cantidadUsada > materia.cantidad) {
        // Mostrar mensaje de error si la cantidad supera el stock disponible
        this.snackBar.open(
          `No hay suficiente stock de ${materia.nombre}. Disponible: ${materia.cantidad} ${materia.unidad}.`,
          'Cerrar',
          { duration: 5000 }
        );
        return;
      }
  
      if (cantidadUsada > 0) {
        // Si hay suficiente stock, agregar a la lista de materias primas utilizadas
        this.materiasPrimasUtilizadas.push({
          id: materia._id,
          nombre: materia.nombre,
          cantidadUsada,
          unidad: materia.unidad,
        });
  
        // Limpiar los campos del formulario relacionados con la materia prima
        this.produccionForm.get('materia_prima')?.reset();
        this.produccionForm.get('cantidad_usada')?.reset();
        this.produccionForm.get('unidad_materia')?.reset();
        this.unidadSeleccionada = '';
      } else {
        // Mostrar mensaje si la cantidad usada no es válida
        this.snackBar.open('La cantidad usada debe ser mayor a 0.', 'Cerrar', { duration: 3000 });
      }
    } else {
      // Mostrar mensaje si no se seleccionó una materia prima válida
      this.snackBar.open('Por favor selecciona una materia prima válida.', 'Cerrar', { duration: 3000 });
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

  onSubmit(): void {
    if (this.produccionForm.valid) {
      const produccionData = {
        ...this.produccionForm.value,
        materiasPrimasUtilizadas: this.materiasPrimasUtilizadas,
      };
  
      if (this.produccionId) {
        // Actualizar producción existente
        this.produccionDiariaService.updateProduccionDiaria(this.produccionId.toString(), produccionData).subscribe({
          next: () => this.router.navigate(['/produccion/produccion-diaria']),
          error: (error) => console.error('Error al actualizar la producción diaria:', error),
        });
      } else {
        // Crear nueva producción diaria
        this.produccionDiariaService.addProduccionDiaria(produccionData).subscribe({
          next: (response) => {
            const produccionId = response?.produccionDiaria?._id; // Obtiene el ID de la producción creada
  
            if (produccionId) {
              // Descontar el stock de las materias primas
              const stockDescuentoRequests = this.materiasPrimasUtilizadas.map((materia) =>
                this.materiasPrimasService.descontarMateriaPrima(materia.id, materia.cantidadUsada).toPromise()
              );
  
              Promise.all(stockDescuentoRequests)
                .then(() => {
                  console.log('Stock descontado correctamente.');
                  this.snackBar.open('Producción creada y stock actualizado.', 'Cerrar', { duration: 3000 });
  
                  // Redirigir al formulario de Control de Calidad con el ID de la producción
                  this.router.navigate(['/produccion/control-calidad/evaluar'], {
                    queryParams: { produccionId },
                  });
                })
                .catch((err) => {
                  console.error('Error al descontar el stock:', err);
                  this.snackBar.open(
                    'Producción creada, pero ocurrió un error al actualizar el stock. Por favor, verifica el inventario.',
                    'Cerrar',
                    { duration: 5000 }
                  );
  
                  // Redirigir al formulario de Control de Calidad con el ID de la producción incluso si falla el descuento
                  this.router.navigate(['/produccion/control-calidad/evaluar'], {
                    queryParams: { produccionId },
                  });
                });
            } else {
              console.error('Error: La respuesta del backend no contiene un ID de producción válido.');
            }
          },
          error: (error) => {
            console.error('Error al agregar la producción diaria:', error);
            this.snackBar.open('Error al agregar la producción. Inténtalo nuevamente.', 'Cerrar', { duration: 3000 });
          },
        });
      }
    }
  }
  

  onCancel(): void {
    this.router.navigate(['/produccion/produccion-diaria']);
  }
}
