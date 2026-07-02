// js/storage.js

// 1. Guardar cualquier cosa
function guardarDatos(nombre, datos) {
    localStorage.setItem(nombre, JSON.stringify(datos));
}

// 2. Traer cualquier cosa
function ObtenerDatos(nombre) {
    const datos = localStorage.getItem(nombre);
    if (datos) {
        return JSON.parse(datos);
    }
    return []; // Si no hay nada, devuelve un array vacío
}

// 3. Funciones específicas (usan las de arriba)
function guardarCategorias(lista) {
    guardarDatos('categorias', lista);
}

function obtenerCategorias() {
    return ObtenerDatos('categorias');
}

function guardarEventos(lista) {
    guardarDatos('eventos', lista);
}

function obtenerEventos() {
    return ObtenerDatos('eventos');
}

function guardarCarrito(lista) {
    guardarDatos('carrito', lista);
}

function obtenerCarrito() {
    return ObtenerDatos('carrito');
}

function guardarVentas(lista) {
    guardarDatos('ventas', lista);
}

function obtenerVentas() {
    return ObtenerDatos('ventas');
}

// 4. Sesión
function iniciarSesion() {
    localStorage.setItem('sesionAdmin', 'activa');
}

function cerrarSesion() {
    localStorage.removeItem('sesionAdmin');
}

function estaLogueado() {
    return localStorage.getItem('sesionAdmin') === 'activa';
}

function contarTodo() {
    return {
        categorias: obtenerCategorias().length,
        eventos: obtenerEventos().length,
        ventas: obtenerVentas().length,
        carrito: obtenerCarrito().length
    };
}

function buscarEventos(texto) {
    const todos = obtenerEventos();
    if (!texto) return todos;

    const busqueda = texto.toLowerCase();
    return todos.filter(e =>
        e.nombre.toLowerCase().includes(busqueda) ||
        e.ciudad.toLowerCase().includes(busqueda) ||
        e.descripcion.toLowerCase().includes(busqueda)
    );
}

function filtrarPorPrecio(min, max) {
    const todos = obtenerEventos();
    return todos.filter(e => {
        if (min && e.precio < min) return false;
        if (max && e.precio > max) return false;
        return true;
    });
}

function obtenerCiudades() {
    const eventos = obtenerEventos();
    const ciudades = eventos.map(e => e.ciudad);
    return [...new Set(ciudades)].sort();
}

console.log("💾 storage.js listo");