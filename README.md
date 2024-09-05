# Production Management

Este es un sistema de gestión de producción alimentaria desarrollado en **Angular**. El objetivo del proyecto es registrar, monitorear y gestionar la producción diaria de alimentos, así como otros aspectos como la gestión de materias primas, turnos de empleados y reportes. El frontend está construido usando Angular y, por el momento, incluye un backend simulado para pruebas con datos locales.

## Características

### Módulo de Producción Diaria (2.1 Control de Producción)

- **Registro de Producción Diaria**: Permite el monitoreo y registro de la producción diaria de alimentos, clasificando los productos por tipo (congelados, enlatados, comida preparada caliente, entre otros).
- **Gestión de Volúmenes de Producción**: Control de los volúmenes de producción por tipo de alimento, asegurando el cumplimiento de los objetivos de producción diaria.
- **Filtrado por Tipo de Producto**: Filtrado dinámico de las producciones diarias por el tipo de producto.

### Módulo de Gestión de Tipos de Producto

- **Agregar, Editar y Eliminar Tipos de Producto**: Permite gestionar los tipos de productos de la producción (por ejemplo, congelados, enlatados).
- **Validación de Duplicados**: No se permite agregar tipos de productos con nombres duplicados.

### Módulo de Materias Primas (2.2 Gestión de Materias Primas)

- **Gestión de Inventarios**: Módulo para registrar y gestionar las materias primas, manteniendo el control del inventario.
- **Registro de Materia Prima**: Registro detallado de la recepción de materias primas, incluyendo peso, calidad y ubicación.

### Módulo de Turnos de Empleados (2.5 Gestión de Recursos Humanos)

- **Gestión de Turnos y Asignaciones**: Módulo para la gestión de turnos de los empleados de producción, permitiendo la asignación de tareas y el registro de horas trabajadas.

### Reportes (2.6 Reportes y Análisis)

- **Generación de Reportes**: Se puede generar reportes de la producción diaria y otros análisis del sistema.

## Tecnologías Utilizadas

- **Angular**: Framework principal del proyecto.
- **Angular Material**: Utilizado para la interfaz gráfica (botones, tablas, formularios).
- **JSON-Server**: Simulación de un backend utilizando un archivo `db.json` para manejar datos locales.
- **RxJS**: Para el manejo de datos asincrónicos dentro de Angular.


## Configuración del Entorno de Desarrollo

### Requisitos Previos

1. **Node.js**: Asegúrate de tener instalado Node.js en tu máquina.
   - [Descargar Node.js](https://nodejs.org)

2. **Angular CLI**: Instala Angular CLI globalmente.
   ```bash
   npm install -g @angular/cli

3. **JSON-Server**: Para simular el backend, debes instalar json-server.
   ```bash
   npm install -g json-server
   json-server --watch db.json --port 3000
