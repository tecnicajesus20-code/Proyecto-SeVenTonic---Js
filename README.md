# 🎸 SeVenTonic — Sumérgete en el Ritmo, Vive el Directo

Una experiencia digital premium de comercio electrónico para la gestión y venta de entradas de conciertos y eventos en directo, desarrollada con la pureza y rendimiento del desarrollo web clásico.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Vanilla JS](https://img.shields.io/badge/Vanilla%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Web Components](https://img.shields.io/badge/Web%20Components-F7DF1E?style=for-the-badge&logo=webcomponents&logoColor=white)
![LocalStorage](https://img.shields.io/badge/LocalStorage-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Status Completed](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)

---

## 🎯 Elevator Pitch (Descripción del Proyecto)

**SeVenTonic** es una plataforma boutique de comercio electrónico dedicada a la gestión, administración y simulación de compra de entradas para conciertos, festivales y eventos en vivo (musicales, deportivos, empresariales y más).

Este proyecto fue desarrollado bajo un desafío técnico de alto rendimiento: implementar una aplicación web moderna e interactiva sin depender de frameworks pesados (como React o Angular), utilizando exclusivamente **Vanilla JavaScript (ES6+)**, **Web Components (Custom Elements)** y **CSS3 moderno** (Flexbox y Grid).

El resultado es un sitio web rápido y fluido, con animaciones a 60 FPS, transiciones dinámicas y una interfaz de usuario visualmente deslumbrante (Wow Factor) inspirada en una estética "Dark Cyberpunk / Neon Pulse".

---

## 📸 Galería Visual (Screenshots Showcase)

A continuación se presentan las capturas de pantalla de la interfaz pública y el panel administrativo del proyecto:

### 🖥️ Vista Pública (Landing & Eventos)

La vitrina comercial donde los clientes exploran y compran tickets con interactividad fluida.

![Vista Principal](assets/img/screenshots/home_desktop.png)

### 🔐 Gestión y Flujo de Compra

Modales optimizados para la interacción del usuario y del administrador.

|              🔑 Iniciar Sesión (Admin Modal)               |                     🎟️ Detalle de Evento                      |
| :-------------------------------------------------------: | :----------------------------------------------------------: |
| ![Iniciar Sesión](assets/img/screenshots/login_modal.png) | ![Detalle del Evento](assets/img/screenshots/purchase_detail.png) |

|              📝 Formulario de Registro de Compra              |             🖥️ Panel Principal de Administración              |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| ![Formulario de Compra](assets/img/screenshots/purchase_form.png) | ![Panel de Administración](assets/img/screenshots/admin_panel.png) |

---

## 🗺️ Mapa de Vistas (Arquitectura de Información)

La aplicación cuenta con 2 secciones principales y 5 vistas estratégicas que estructuran el flujo del usuario (User Journey):

### 👥 Sección Pública (Cliente)

1. **🏠 Inicio & Catálogo ([index.html](file:///home/camper/Escritorio/Proyecto-SeVenTonic---Js/index.html))**:
   - **Hero Interactivo**: Banner llamativo con tipografía de alto impacto neón y degradados fluidos.
   - **Filtros Dinámicos**: Menú de categorías (Conciertos, Deportes, Negocios, Festivales, Jazz & Blues, Electrónica) que filtra los eventos en tiempo real al hacer clic.
   - **Galería de Eventos**: Renderiza dinámicamente las tarjetas de eventos utilizando Web Components con efectos hover tridimensionales, precios destacados y tags de ubicación.
   - **Modal de Detalle**: Al dar clic sobre una tarjeta, se abre un popup detallando el evento (ciudad, fecha, hora, descripción).
   - **Simulación de Compra**: Permite seleccionar la cantidad de entradas y despliega dinámicamente el formulario "Datos del comprador" para registrar la venta en LocalStorage.

### 👑 Sección Administrativa (Personal Autorizado)

2. **🖥️ Dashboard Principal ([Principaladmin.html](file:///home/camper/Escritorio/Proyecto-SeVenTonic---Js/Administracion/Principaladmin.html))**:
   - Panel de control exclusivo para administradores (acceso seguro mediante Login con credenciales `admin@mail.com` / `123456`). Distribuye visualmente el acceso a la gestión de categorías, eventos y ventas.
3. **🏷️ Gestión de Categorías ([Categorias.html](file:///home/camper/Escritorio/Proyecto-SeVenTonic---Js/Administracion/Categorias.html))**:
   - Tabla administrativa interactiva (CRUD) que permite dar de alta nuevas categorías, editarlas o eliminarlas del catálogo global.
4. **📅 Gestión de Eventos ([gestion-eventos.html](file:///home/camper/Escritorio/Proyecto-SeVenTonic---Js/Administracion/gestion-eventos.html))**:
   - Formulario para crear y editar eventos con validaciones visuales. Permite especificar código de evento, nombre, categoría correspondiente, precio, fecha, hora, ciudad, imagen (URL) y descripción.
5. **📊 Reporte de Ventas ([Reporte-ventas.html](file:///home/camper/Escritorio/Proyecto-SeVenTonic---Js/Administracion/Reporte-ventas.html))**:
   - Historial detallado de compras simuladas realizadas por los clientes, mostrando información del comprador, ítems adquiridos, fechas de transacción y totales facturados.

---

## 🎨 Sistema de Diseño y Paleta de Colores

Se definió una estética moderna basada en variables de CSS3 (`:root`) definidas en [styles.css](file:///home/camper/Escritorio/Proyecto-SeVenTonic---Js/css/styles.css) con una paleta de colores contrastante que emula la iluminación de un concierto nocturno (Neon Glow):

```css
:root {
    /* Tonos de Acento Neón */
    --cian-neon:       #00dce5; /* Llamadas a la acción (CTA), botones de compra y hover activo */
    --purpura-neon:    #9d00ff; /* Contrastes visuales y textos con degradados */
    --color-boton-pri: #00f5ff; /* Botón de acción destacado con efectos de pulso */

    /* Neutros Ultra Oscuros */
    --fondo-superficie: #0d1515; /* Fondo de la aplicación con matiz cyberpunk */
    --contenedor-super: #192121; /* Fondo principal de tarjetas, tablas y modales */
    --contenedor-bajo:  #151d1d; /* Superficies secundarias de menor importancia */
    
    /* Tipografía y Textos */
    --sobre-superficie: #dce4e4; /* Texto principal (Blanco suave para lectura premium) */
    --sobre-sup-var:    #b9caca; /* Texto secundario y etiquetas de metadatos */
    --color-letra:      #dadada; /* Texto plano general */
}
```

*   **Tipografías utilizadas**: `Inter`, `Sora`, `Space Grotesk`, `Be Vietnam Pro` y `JetBrains Mono` importadas desde Google Fonts para garantizar máxima modernidad y legibilidad.
*   **Iconografía**: `Material Symbols Outlined` para la representación de iconos semánticos.

---

## ✨ Características UX/UI Implementadas (Sin Frameworks)

1.  **Web Components Nativos**:
    - Creación de componentes reutilizables como `<header-user>` y `<cards-eventos>` definidos en [components.js](file:///home/camper/Escritorio/Proyecto-SeVenTonic---Js/js/components.js). Esto aísla la estructura HTML de la UI del flujo principal de lógica.
2.  **Persistencia del Estado Local (No Base de Datos)**:
    - Sincronización continua de datos entre las vistas de usuario y administrador a través de `localStorage` utilizando `JSON.parse` y `JSON.stringify`. Si el almacenamiento está vacío, se carga automáticamente un conjunto de datos iniciales por defecto ([data-seed.js](file:///home/camper/Escritorio/Proyecto-SeVenTonic---Js/js/data-seed.js)).
3.  **Animaciones Fluidas (60 FPS)**:
    - Modales interactivos que abren y cierran mediante transiciones de opacidad combinadas con la clase de utilidad `.none`.
    - Efectos hover tridimensionales en tarjetas de eventos, aplicando elevación suave (`transform: translateY(-5px)`) y expansión de sombras con bordes cian neón (`box-shadow: 0 0 15px var(--cian-neon)`).
4.  **Cálculo Dinámico de Precios**:
    - En el modal de compra, cambiar el input numérico de entradas multiplica instantáneamente el precio unitario del boleto y actualiza el subtotal en tiempo real.

---

## 📂 Estructura del Proyecto (Project Anatomy)

El proyecto mantiene una estructura modular limpia para garantizar escalabilidad:

```text
Proyecto-SeVenTonic---Js/
│
├── index.html                       # Vista pública principal (Eventos y flujo de compra)
├── JS_GUIDE.md                      # Guía de estándares de desarrollo en JavaScript del proyecto
├── README.md                        # Documentación premium actual
│
├── Administracion/                  # Páginas HTML exclusivas del administrador
│   ├── Principaladmin.html          # Panel principal de control
│   ├── Categorias.html              # Gestión de Categorías
│   ├── gestion-eventos.html         # Gestión de Eventos (CRUD)
│   └── Reporte-ventas.html          # Visualización de historial de ventas
│
├── css/                             # Estilos modulares organizados por vista
│   ├── styles.css                   # Estilos y variables globales
│   ├── home-Usuario.css             # Estilos de la interfaz pública
│   ├── WebComponents.css            # Estilos de los Custom Elements
│   ├── Admin-pages.css              # Estilos del panel de control
│   ├── Admin-categorias.css         # Estilos de la interfaz de categorías
│   ├── Admin-GestionEventos.css      # Estilos de la interfaz de eventos
│   ├── Admin-RegistroVentas.css     # Estilos de los reportes de ventas
│   └── responsive.css               # Diseño adaptativo para dispositivos móviles
│
├── js/                              # Lógica de la aplicación
│   ├── main.js                      # Inicializador de la interfaz pública
│   ├── storage.js                   # API de persistencia en localStorage
│   ├── components.js                # Definición de Web Components reutilizables
│   ├── data-seed.js                 # Generación de datos de prueba
│   └── modulos-admin/               # Controladores específicos de la administración
│       ├── categorias.js            # Lógica para la gestión de categorías
│       ├── gestion-eventos.js       # Lógica para la gestión de eventos
│       └── reporte-ventas.js        # Lógica para el análisis de ventas
│
└── assets/                          # Recursos gráficos
    └── img/                         # Iconos e imágenes del proyecto
        └── screenshots/             # Capturas de pantalla utilizadas en este README
```

---

## 🛠️ Tecnologías y Herramientas Utilizadas

*   **Maquetación**: HTML5 Semántico (`<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
*   **Estilos**: CSS3 Puro (Variables nativas, Flexbox para alineaciones, Grid para layouts bidimensionales, Media Queries).
*   **Lógica**: JavaScript ES6 nativo (Selectores, API de formularios, Event Listeners, Promesas, LocalStorage).
*   **Fuentes e Iconos**: Google Fonts y Material Symbols.
*   **Control de Versiones**: Git & GitHub.

---

## 🚀 Instrucciones de Visualización y Ejecución

Al ser un desarrollo estático puro, **SeVenTonic** no requiere servidores de aplicación complejos ni procesos de compilación o instalación.

### Método Local

1. Clona el repositorio en tu máquina:

   ```bash
   git clone https://github.com/tu-usuario/Proyecto-SeVenTonic---Js.git
   ```

2. Abre la carpeta del proyecto y haz doble clic sobre [index.html](file:///home/camper/Escritorio/Proyecto-SeVenTonic---Js/index.html) para ejecutarlo de inmediato en cualquier navegador web.

### Método Recomendado (Live Server en VS Code)

Para una mejor experiencia con recargas en tiempo real:

1. Abre la carpeta del proyecto en **VS Code**.
2. Asegúrate de tener instalada la extensión **Live Server**.
3. Haz clic derecho sobre [index.html](file:///home/camper/Escritorio/Proyecto-SeVenTonic---Js/index.html) y selecciona **Open with Live Server**.
4. La aplicación se abrirá por defecto en `http://127.0.0.1:5500/index.html`.
5. Si se quiere ingresar a zona administrativa:
    - Correo: admin@gmail.com
    - Clave : Administrador12345

---

## ✍️ Autores y Colaboradores

*   **Jesús Salcedo** — *Desarrollador Principal & Lógica JS* — [GitHub](https://github.com/tecnicajesus20)
*   **Julio Castaño** — *Diseñador UX/UI & Estilos CSS*

*Proyecto desarrollado como parte de las sesiones prácticas de Campusland.*

---

## 📚 Documentación Adicional

Para ver la guía técnica de JavaScript con los conceptos aplicados y estándares de programación establecidos para el proyecto, consulta:
👉 **[Guía de Referencia y Estándares de JavaScript](file:///home/camper/Escritorio/Proyecto-SeVenTonic---Js/JS_GUIDE.md)**