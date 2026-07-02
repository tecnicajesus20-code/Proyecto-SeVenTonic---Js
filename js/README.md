# Proyecto-SeVenTonic---Js
Proyecto_Conciertos_SalcedoKleiderson/
│
├── index.html                      # Vista pública (Contiene el diseño base, los eventos y los modales de Login e Info)
├── admin.html                      # Vista principal del Administrador (Dashboard / Panel de control)
├── README.md                       # Documentación del proyecto
│
├── administracion/                 # Carpetas de subpáginas exclusivas del administrador (HTMLs independientes)
│   ├── gestion-eventos.html        # Formulario para crear/editar eventos y asignarles categoría
│   ├── categorias.html             # Gestión y visualización de las categorías (Musical, Deportivo, etc.)
│   └── reporte-ventas.html         # Panel con métricas y reportes de los tickets vendidos
│
├── css/
│   ├── styles.css                  # Estilos generales y variables dinámicas (Neon Pulse / Adaptable)
│   ├── responsive.css              # Estilos responsivos para que se vea bien en celulares y tablets
│   └── admin-pages.css             # Estilos específicos para el dashboard y sus 3 subpáginas
│
├── js/
│   ├── main.js                     # Lógica de la vista pública (control de los modales de Login e Info)
│   ├── admin.js                    # Lógica del dashboard principal de administración
│   ├── storage.js                  # Manejo de localStorage (guardar eventos, usuarios y ventas en el navegador)
│   ├── components.js               # Web Components reutilizables (ej: header, footer, tarjetas de eventos)
│   ├── data-seed.js                # Datos iniciales quemados (conciertos, deportes y negocios por defecto)
│   └── modulos-admin/              # Lógica específica para las tres subpáginas del admin
│       ├── gestion-eventos.js
│       ├── categorias.js
│       └── reporte-ventas.js
│
└── assets/
    └── img/