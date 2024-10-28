import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProduccionDiaria } from '../../models/produccion-diaria.model';
import { MateriasPrimasService } from './materias-primas.service';
import { MateriaPrima } from '../../models/materia-prima.model';

@Injectable({
  providedIn: 'root'
})
export class ProduccionDiariaService {
  private apiUrl = 'http://localhost:3000/produccion_diaria'; 

  constructor(private http: HttpClient, private materiasPrimasService: MateriasPrimasService) { }

  getProduccionDiaria(): Observable<ProduccionDiaria[]> {
    return this.http.get<ProduccionDiaria[]>(this.apiUrl);
  }

  getProduccionDiariaById(id: number): Observable<ProduccionDiaria> {
    return this.http.get<ProduccionDiaria>(`${this.apiUrl}/${id}`);
  }

  addProduccionDiaria(produccionDiaria: ProduccionDiaria): Observable<ProduccionDiaria> {
    // Recorremos las materias primas utilizadas y descontamos del inventario
    produccionDiaria.materiasPrimasUtilizadas.forEach(materia => {
      this.materiasPrimasService.getMateriaPrimaById(materia.id).subscribe((materiaPrima: MateriaPrima) => {
        if (materiaPrima.cantidad >= materia.cantidadUsada) {
          materiaPrima.cantidad -= materia.cantidadUsada;
          this.materiasPrimasService.updateMateriaPrima(materiaPrima.id, materiaPrima).subscribe(() => {
            console.log(`Materia prima actualizada: ${materiaPrima.nombre}, nueva cantidad: ${materiaPrima.cantidad}`);
          });
        } else {
          console.warn(`No hay suficiente cantidad de ${materiaPrima.nombre} en stock.`);
        }
      });
    });
  
    // Guardamos la nueva producción diaria
    return this.http.post<ProduccionDiaria>(this.apiUrl, produccionDiaria);
  }
  
  updateProduccionDiaria(id: number, produccionDiaria: ProduccionDiaria, produccionOriginal: ProduccionDiaria): Observable<ProduccionDiaria> {
    // Recorremos las nuevas materias primas utilizadas
    produccionDiaria.materiasPrimasUtilizadas.forEach(materia => {
      // Verificamos si la materia prima es nueva comparando con la producción original
      const materiaExistente = produccionOriginal.materiasPrimasUtilizadas.find(m => m.id === materia.id);
  
      if (!materiaExistente || materia.cantidadUsada > materiaExistente.cantidadUsada) {
        // Si es una nueva materia prima o si la cantidad usada es mayor, actualizamos el stock
        this.materiasPrimasService.getMateriaPrimaById(materia.id).subscribe((materiaPrima: MateriaPrima) => {
          const diferenciaCantidad = materiaExistente ? (materia.cantidadUsada - materiaExistente.cantidadUsada) : materia.cantidadUsada;
          
          if (materiaPrima.cantidad >= diferenciaCantidad) {
            materiaPrima.cantidad -= diferenciaCantidad;
  
            this.materiasPrimasService.updateMateriaPrima(materiaPrima.id, materiaPrima).subscribe(() => {
              console.log(`Stock actualizado para ${materiaPrima.nombre}, nueva cantidad: ${materiaPrima.cantidad}`);
            });
          } else {
            console.warn(`No hay suficiente stock de ${materiaPrima.nombre}`);
          }
        });
      }
    });
  
    // Actualizamos la producción después de manejar las materias primas
    return this.http.put<ProduccionDiaria>(`${this.apiUrl}/${id}`, produccionDiaria);
  }  

  deleteProduccionDiaria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
