// js/data-seed.js
// ============================================
// DATOS INICIALES
// ============================================

const categoriasIniciales = [
    { id: 1, nombre: "Conciertos", descripcion: "Conciertos y shows en vivo", icono: "music_note" },
    { id: 2, nombre: "Deportes", descripcion: "Eventos deportivos", icono: "sports_soccer" },
    { id: 3, nombre: "Negocios", descripcion: "Conferencias y networking", icono: "business_center" },
    { id: 4, nombre: "Festivales", descripcion: "Festivales multigénero", icono: "festival" },
    { id: 5, nombre: "Jazz & Blues", descripcion: "Música jazz y blues", icono: "piano" },
    { id: 6, nombre: "Electrónica", descripcion: "Música electrónica y EDM", icono: "graphic_eq" }
];

const eventosIniciales = [
    {
        id: 101,
        codigo: "EVT001",
        nombre: "Rock al Parque 2026",
        categoriaId: 1,
        precio: 85000,
        fecha: "2026-07-20",
        hora: "19:00",
        ciudad: "Bogotá",
        imagen: "https://picsum.photos/seed/rockparque/120/120", // 👈 placeholder online
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
        imagen: "https://picsum.photos/seed/metallica/120/120",
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
        imagen: "https://picsum.photos/seed/popfest/120/120",
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
        imagen: "https://picsum.photos/seed/karolg/120/120",
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
        imagen: "https://picsum.photos/seed/ultra/120/120",
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
        imagen: "https://picsum.photos/seed/futbol/120/120",
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
        imagen: "https://picsum.photos/seed/jazz/120/120",
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
        imagen: "https://picsum.photos/seed/verano/120/120",
        descripcion: "3 días de música y playa en el caribe"
    }
];

const ventasIniciales = [
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
const usuario =[
    {
        id: "001",
        user: "admin@gmail.com",
        password : "Administrador12345"
    }
]

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
    if (!localStorage.getItem('user')) {
        localStorage.setItem('user', JSON.stringify(usuario));
    }
    if (!localStorage.getItem('carrito')) {
        localStorage.setItem('carrito', JSON.stringify([]));
    }
}

// Ejecutar al cargar
inicializarDatos();

console.log("📦 data-seed.js cargado con imágenes placeholder");