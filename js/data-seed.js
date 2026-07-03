// js/data-seed.js
// ============================================
// DATOS INICIALES
// ============================================

const categorias = [
    { id: 1, nombre: "Rock", descripcion: "Conciertos de rock y metal" },
    { id: 2, nombre: "Pop", descripcion: "Música pop y comercial" },
    { id: 3, nombre: "Electrónica", descripcion: "Música electrónica y EDM" },
    { id: 4, nombre: "Deportes", descripcion: "Eventos deportivos" },
    { id: 5, nombre: "Jazz & Blues", descripcion: "Música jazz y blues" },
    { id: 6, nombre: "Festivales", descripcion: "Festivales multigénero" }
];

const eventos = [
    {
        id: 101,
        codigo: "EVT001",
        nombre: "Rock al Parque 2026",
        categoriaId: 1,
        precio: 85000,
        fecha: "2026-07-20",
        hora: "19:00",
        ciudad: "Bogotá",
        imagen: "assets/img/rock-parque.jpg",
        descripcion: "El festival de rock más grande de Colombia"
    },
    {
        id: 102,
        codigo: "EVT002",
        nombre: "Metallica en Concierto",
        categoriaId: 1,
        precio: 250000,
        fecha: "2026-08-15",
        hora: "20:30",
        ciudad: "Medellín",
        imagen: "assets/img/metallica.jpg",
        descripcion: "La legendaria banda de thrash metal"
    },
    {
        id: 201,
        codigo: "EVT003",
        nombre: "Pop Fest 2026",
        categoriaId: 2,
        precio: 65000,
        fecha: "2026-08-15",
        hora: "20:00",
        ciudad: "Medellín",
        imagen: "assets/img/pop-fest.jpg",
        descripcion: "Lo mejor del pop internacional"
    },
    {
        id: 202,
        codigo: "EVT004",
        nombre: "Karol G - Mañana Será Bonito",
        categoriaId: 2,
        precio: 180000,
        fecha: "2026-10-05",
        hora: "21:00",
        ciudad: "Bogotá",
        imagen: "assets/img/karol-g.jpg",
        descripcion: "La Bichota trae su gira a Colombia"
    },
    {
        id: 301,
        codigo: "EVT005",
        nombre: "Ultra Colombia 2026",
        categoriaId: 3,
        precio: 150000,
        fecha: "2026-09-25",
        hora: "14:00",
        ciudad: "Barranquilla",
        imagen: "assets/img/ultra-colombia.jpg",
        descripcion: "El festival de música electrónica más grande"
    },
    {
        id: 401,
        codigo: "EVT006",
        nombre: "Final del Fútbol Colombiano",
        categoriaId: 4,
        precio: 75000,
        fecha: "2026-12-10",
        hora: "18:00",
        ciudad: "Bogotá",
        imagen: "assets/img/final-futbol.jpg",
        descripcion: "La gran final del fútbol colombiano"
    },
    {
        id: 501,
        codigo: "EVT007",
        nombre: "Festival de Jazz 2026",
        categoriaId: 5,
        precio: 55000,
        fecha: "2026-09-05",
        hora: "18:30",
        ciudad: "Cali",
        imagen: "assets/img/jazz-fest.jpg",
        descripcion: "El festival de jazz más importante del país"
    },
    {
        id: 601,
        codigo: "EVT008",
        nombre: "Festival de Verano 2026",
        categoriaId: 6,
        precio: 120000,
        fecha: "2026-07-15",
        hora: "12:00",
        ciudad: "Santa Marta",
        imagen: "assets/img/festival-verano.jpg",
        descripcion: "3 días de música y playa en el caribe"
    }
];

const ventas = [
    {
        id: 1001,
        fecha: "2026-06-25T15:30:00.000Z",
        cliente: {
            identificacion: "123456789",
            nombre: "Laura Pérez García",
            direccion: "Calle 10 # 20-30",
            telefono: "3001234567",
            email: "laura@email.com"
        },
        ciudad: "Bogotá",
        items: [
            { id: 101, nombre: "Rock al Parque 2026", precio: 85000, cantidad: 2 }
        ],
        total: 170000
    }
];

// Inicializar datos si no existen
function inicializarDatos() {
    if (!localStorage.getItem('categorias')) {
        localStorage.setItem('categorias', JSON.stringify(categoriasIniciales));
    }
    if (!localStorage.getItem('eventos')) {
        localStorage.setItem('eventos', JSON.stringify(eventosIniciales));
    }
    if (!localStorage.getItem('ventas')) {
        localStorage.setItem('ventas', JSON.stringify(ventasIniciales));
    }
    if (!localStorage.getItem('carrito')) {
        localStorage.setItem('carrito', JSON.stringify([]));
    }
    localStorage.removeItem('sesionAdmin');
}

// Ejecutar al cargar
inicializarDatos();

console.log("📦 data-seed.js cargado");