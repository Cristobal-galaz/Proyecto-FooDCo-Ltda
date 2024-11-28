import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Menu, Producto } from '../interfaces/alimento'
import { categoriaMenu, FiltroMenus, servicioMenu, tipoMenu } from '../interfaces/filtros';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiMenusService {

  apiUrl = environment.apiUrl;

  private productos = new BehaviorSubject<Producto[]>([]);
  private menus = new BehaviorSubject<Menu[]>([]);
  private filteredProductos = new BehaviorSubject<Producto[]>([]);
  private filtros = new BehaviorSubject<FiltroMenus>({
    tipoAlimentacion: [...tipoMenu],
    categorias: [...categoriaMenu],
    servicios: [...servicioMenu],
    precio: { min: 0, max: 100 },
  });

  productos$ = this.productos.asObservable();
  menus$ = this.menus.asObservable();
  filteredProductos$ = this.filteredProductos.asObservable();
  filtros$ = this.filtros.asObservable();



  constructor(private http:HttpClient) {

   }

  cargarProductos() {
    this.http.get<{ menus: Menu[] }>(`${this.apiUrl}menu/list/true`).subscribe(
      (data) => {
        this.menus.next(data.menus);
        this.filteredProductos.next(data.menus.flatMap(
          menu => menu.productos
        ))
      }
    );
  }

  filtrarMenus() {
    const currentFiltros = this.filtros.getValue();

    console.log(currentFiltros.precio);
  
    const tipoAlimentacionSeleccionados = currentFiltros.tipoAlimentacion
      .filter(filtro => filtro.seleccion)
      .map(filtro => filtro.tipo);
  
    const tipoCategoriasSeleccionados = currentFiltros.categorias
      .filter(filtro => filtro.seleccion)
      .map(filtro => filtro.tipo);
  
    const tipoServiciosSeleccionados = currentFiltros.servicios
      .filter(filtro => filtro.seleccion)
      .map(filtro => filtro.tipo);
  
    const currentMenus = this.menus.getValue();
  
    let productos: Producto[];
  
    if (tipoAlimentacionSeleccionados.length > 0) {
      const filteredMenus = currentMenus.filter(menu =>
        tipoAlimentacionSeleccionados.includes(menu.dieta)
      );
      productos = filteredMenus.flatMap(menu => menu.productos);
    } else {
      productos = currentMenus.flatMap(menu => menu.productos);
    }
  
    if (tipoServiciosSeleccionados.length > 0) {
      productos = productos.filter(producto =>
        tipoServiciosSeleccionados.includes(producto.tipoDeServicio)
      );
    }
  
    if (tipoCategoriasSeleccionados.length > 0) {
      productos = productos.filter(producto =>
        tipoCategoriasSeleccionados.includes(producto.categoria)
      );
    }

    if (currentFiltros.precio) {
      productos = productos.filter(producto =>
        producto.precio >= currentFiltros.precio.min &&
        producto.precio <= currentFiltros.precio.max
      );
    }
  
    this.filteredProductos.next(productos);
  }

  cleanFilers(){
    const defaultFiltros: FiltroMenus = {
      tipoAlimentacion: [...tipoMenu.map(f => ({ ...f, seleccion: false }))],
      categorias: [...categoriaMenu.map(f => ({ ...f, seleccion: false }))],
      servicios: [...servicioMenu.map(f => ({ ...f, seleccion: false }))],
      precio: { min: 0, max: 1000000 }
    };
  
    this.filtros.next(defaultFiltros);
  
    // Mostrar todos los productos (sin filtros)
    const currentMenus = this.menus.getValue();
    const allProductos = currentMenus.flatMap(menu => menu.productos);
    this.filteredProductos.next(allProductos);
  }

  updatefiltros( newFiltros: FiltroMenus) {
    this.filtros.next(newFiltros);
  }
    
  sendOrdenCompra(ordenCompra: any){
    this.http.post(this.apiUrl+"seleccion-productos/new",ordenCompra).subscribe(
      (response) => {
        console.log(response);
      }
    )
  }
}
