import { Component } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule } from '@angular/router';

interface TreeNode {
  name: string;
  route?: string;
  icon?: string;
  children?: TreeNode[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  route?: string;
  icon?: string;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatTreeModule,
    RouterModule,
  ],
})
export class LayoutComponent {
  private _transformer = (node: TreeNode, level: number): FlatNode => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      route: node.route,
      icon: node.icon
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource: MatTreeFlatDataSource<TreeNode, FlatNode>;

  main: TreeNode[] = [
    { name: 'Dashboard', route: '/produccion/dashboard', icon: 'dashboard' },
    {
      name: 'Gestión de Producción Diaria',
      route: '/produccion/produccion-diaria',
      icon: 'settings',
    },
    {
      name: 'Gestión Tipo de Producto',
      route: '/produccion/tipos-producto',
      icon: 'category',
    },
    {
      name: 'Gestión de Materias Primas',
      icon: 'inventory',
      children: [
        { name: 'Ver Materias Primas', route: '/produccion/materias-primas', icon: 'visibility' },
        { name: 'Revisión de Inventario', route: '/produccion/inventario', icon: 'assignment' },
      ],
    },
    { name: 'Gestión de Turnos de Empleados', route: '/produccion/turnos-empleados', icon: 'schedule' },
    { name: 'Reportes y Análisis', route: '/produccion/reportes', icon: 'bar_chart' },
  ];

  otros: TreeNode[] = [
    { name: 'Soporte', route: '/produccion/soporte', icon: 'support' },
  ];

  constructor() {
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = this.main; 
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  logout() {
    console.log('Cerrar Sesión');
  }
}
