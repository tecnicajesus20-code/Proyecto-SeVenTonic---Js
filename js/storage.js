
function guardarDatos(nombre, datos) {
    localStorage.setItem(nombre, JSON.stringify(datos));
}

function ObtenerDatos(nombre) {
    const datos = localStorage.getItem(nombre);
    if (datos) {
        return JSON.parse(datos);
    }
    return [];
}

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
function obtenerinfoenEvento(idEvento) {
    const eventos = obtenerEventos();
    console.log("id recibido:", idEvento, typeof idEvento);
    for (let i = 0; i < eventos.length; i++) {
        console.log("id del evento:", eventos[i].id, typeof eventos[i].id);
        if (eventos[i].id === idEvento) {
            return eventos[i];
        }
    }
    
    return null;
}
function guardarVentas(lista) {
    guardarDatos('ventas', lista);
}

function obtenerVentas() {
    return ObtenerDatos('ventas');
}

function obtenerUsers() {
    return ObtenerDatos('user');
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


async function cargarCiudades() {
    try {
        const response = await fetch("../Data/Ciudades.json");

        if (!response.ok) {
            throw new Error("No se pudo cargar el archivo.");
        }

        const Ciudades = await response.json();
        return Ciudades;
    } catch (error) {
        console.error(error);
    }
}

function GuardarCiudades (lista){
    guardarDatos("ciudades", lista)
}

function ObtenerCiudades(){
    return ObtenerDatos("ciudades")
}

console.log(" storage.js listo");// 👈 placeholder online
