/**
 * ============================================================
 * ARCHIVO: gestion-eventos.js
 * PROPÓSITO: Controlar la página de "Gestión de Eventos"
 * AUTOR: [Aprendiz]
 * FECHA: [fecha actual]
 * ============================================================
 * 
 * ¿Qué hace este archivo?
 * 1. Muestra el total de eventos, categorías y ventas.
 * 2. Lista todos los eventos con su información.
 * 3. Permite buscar eventos por nombre, artista o fecha.
 * 4. Permite CREAR nuevos eventos (modal).
 * 5. Permite EDITAR eventos existentes (modal).
 * 6. Permite ELIMINAR eventos (con confirmación).
 * 7. Todos los datos se guardan en el navegador (localStorage).
 * 
 * ¿Cómo funciona?
 * - Usa funciones de storage.js para leer y guardar datos.
 * - Cuando la página carga, lee los datos y los muestra.
 * - Cuando el usuario escribe en el buscador, filtra los eventos.
 * - Los modales se abren para crear o editar, y al guardar se actualiza la lista.
 * ============================================================
 */

// Esperar a que el HTML esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {

    // ============================================================
    // 1. OBTENER REFERENCIAS A LOS ELEMENTOS DEL HTML
    // ============================================================
    // Estas variables "apuntan" a los lugares donde vamos a mostrar
    // la información. Así podemos cambiar su contenido fácilmente.

    const contenedorTotalEventos = document.getElementById('total-eventos');
    const contenedorTotalCategorias = document.getElementById('total-categorias');
    const contenedorTotalVentas = document.getElementById('total-ventas');
    const campoBusqueda = document.getElementById('search-input');
    const botonCrearEvento = document.getElementById('btn-crear-evento');
    const contenedorListaEventos = document.getElementById('eventos-list');

    // ============================================================
    // 1.b REFERENCIAS A ELEMENTOS DEL MODAL
    // ============================================================
    const modalOverlay = document.getElementById('modal-evento');
    const modalTitulo = document.getElementById('modal-titulo');
    const formEvento = document.getElementById('form-evento');
    const eventoIdInput = document.getElementById('evento-id');
    const nombreInput = document.getElementById('nombre');
    const categoriaSelect = document.getElementById('categoria');
    const precioInput = document.getElementById('precio');
    const fechaInput = document.getElementById('fecha');
    const horaInput = document.getElementById('hora');
    const ciudadInput = document.getElementById('ciudad');
    const descripcionInput = document.getElementById('descripcion');
    const imagenInput = document.getElementById('imagen');
    const btnGuardar = document.getElementById('btn-guardar-evento');
    const btnCerrarModal = document.getElementById('btn-cerrar-modal');

    // Asegurar que el modal empiece oculto
    modalOverlay.style.display = 'none';

    // ============================================================
    // 2. FUNCIONES PARA OBTENER DATOS DESDE localStorage
    // ============================================================
    // Estas funciones usan las que ya están en storage.js.
    // Si no hay datos, devuelven un arreglo vacío [].

    function obtenerTodosLosEventos() {
        return obtenerEventos(); // <-- viene de storage.js
    }

    function obtenerTodasLasCategorias() {
        return obtenerCategorias(); // <-- viene de storage.js
    }

    function obtenerTodasLasVentas() {
        return obtenerVentas(); // <-- viene de storage.js
    }

    // ============================================================
    // 3. FUNCIÓN PARA FORMATEAR LA FECHA
    // ============================================================
    // La fecha viene en formato "2026-07-20" y queremos mostrarla
    // como "20 JUL" (día y mes abreviado en mayúsculas).

    function formatearFecha(fechaISO) {
        // Si no hay fecha, devolvemos "--"
        if (!fechaISO) {
            return '--';
        }

        // Creamos un objeto Date con la fecha
        // Le agregamos 'T00:00:00' para evitar problemas de zona horaria
        const fecha = new Date(fechaISO + 'T00:00:00');

        // Obtenemos el día (con dos dígitos, ej: 01, 02, ... 31)
        const dia = fecha.getDate().toString().padStart(2, '0');

        // Obtenemos el nombre del mes en español, solo 3 letras, y lo pasamos a mayúsculas
        const mes = fecha.toLocaleString('es', { month: 'short' }).toUpperCase();

        // Devolvemos el formato "DD MMM"
        return dia + ' ' + mes;
    }

    // ============================================================
    // 4. FUNCIÓN PARA CREAR UNA TARJETA DE EVENTO (HTML)
    // ============================================================
    // Esta función recibe un evento y un mapa de categorías,
    // y devuelve el código HTML de una tarjeta.

    function crearTarjetaEvento(evento, mapaCategorias) {
        // Buscar el nombre de la categoría usando el categoriaId del evento
        // Si no existe, mostrar "Sin categoría"
        const nombreCategoria = mapaCategorias[evento.categoriaId] || 'Sin categoría';

        // Formatear la fecha
        const fechaMostrada = formatearFecha(evento.fecha);

        // Obtener la hora (si no tiene, mostrar "--:--")
        const horaMostrada = evento.hora || '--:--';

        // Obtener la ciudad (si no tiene, mostrar "Lugar no especificado")
        const ciudadMostrada = evento.ciudad || 'Lugar no especificado';

        // Obtener la imagen (si no tiene, usar una imagen por defecto)
        const imagenMostrada = evento.imagen || 'assets/img/default-event.jpg';

        // Construir el HTML de la tarjeta
        // Usamos template literals (con ` `) para poder poner variables
        const tarjetaHTML = `
            <div class="evento-card">
                <!-- Imagen del evento -->
                <img src="${imagenMostrada}" alt="${evento.nombre}" class="evento-imagen">

                <!-- Información principal -->
                <div class="evento-info">
                    <span class="evento-categoria">${nombreCategoria}</span>
                    <span class="evento-id">ID: ${evento.codigo || '#' + evento.id}</span>
                    <h4 class="evento-titulo">${evento.nombre}</h4>
                    <div class="evento-artista">
                        <span class="material-symbols-outlined">person</span>
                        <p>${evento.descripcion || 'Artista no disponible'}</p>
                    </div>
                </div>

                <!-- Fecha y lugar -->
                <div class="evento-fecha-lugar">
                    <h6>Fecha</h6>
                    <h5>${fechaMostrada}</h5>
                    <p>${horaMostrada} - ${ciudadMostrada}</p>
                </div>

                <!-- Acciones: estado, editar, eliminar -->
                <div class="evento-acciones">
                    <span class="evento-estado">Publicado</span>
                    <button class="btn-editar" data-id="${evento.id}">
                        <span class="material-symbols-outlined">edit</span>
                    </button>
                    <button class="btn-eliminar" data-id="${evento.id}">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>
        `;

        return tarjetaHTML;
    }

    // ============================================================
    // 5. FUNCIÓN PARA ACTUALIZAR LAS ESTADÍSTICAS
    // ============================================================
    // Lee los datos y coloca los totales en los contenedores.

    function actualizarEstadisticas() {
        // Obtener los datos actuales
        const eventos = obtenerTodosLosEventos();
        const categorias = obtenerTodasLasCategorias();
        const ventas = obtenerTodasLasVentas();

        // 5.1 Total de eventos
        const totalEventos = eventos.length;
        contenedorTotalEventos.textContent = totalEventos;

        // 5.2 Total de categorías
        const totalCategorias = categorias.length;
        contenedorTotalCategorias.textContent = totalCategorias;

        // 5.3 Total de ventas (suma de todos los montos)
        let totalVentas = 0;
        for (let i = 0; i < ventas.length; i++) {
            totalVentas = totalVentas + ventas[i].total;
        }
        // Mostrar en formato de moneda colombiana (COP)
        contenedorTotalVentas.textContent = totalVentas.toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP'
        });
    }

    // ============================================================
    // 6. FUNCIÓN PARA MOSTRAR LOS EVENTOS EN PANTALLA
    // ============================================================
    // Recibe un arreglo de eventos (puede ser todos o los filtrados)
    // y los dibuja en el contenedor.

    function mostrarEventos(listaDeEventos) {
        // Si no se pasa una lista, usamos todos los eventos
        if (!listaDeEventos) {
            listaDeEventos = obtenerTodosLosEventos();
        }

        // Si no hay eventos, mostramos un mensaje
        if (listaDeEventos.length === 0) {
            contenedorListaEventos.innerHTML = `
                <p style="color: var(--sobre-superficie-variante); padding: 2rem; text-align: center;">
                    No hay eventos para mostrar.
                </p>
            `;
            return; // Salir de la función
        }

        // Obtener las categorías para poder mostrar el nombre de cada una
        const categorias = obtenerTodasLasCategorias();

        // Crear un "mapa" o diccionario para buscar el nombre de la categoría
        // por su ID. Esto es más rápido que recorrer el arreglo cada vez.
        const mapaCategorias = {};
        for (let i = 0; i < categorias.length; i++) {
            const categoria = categorias[i];
            mapaCategorias[categoria.id] = categoria.nombre;
        }

        // Construir el HTML de todas las tarjetas
        let htmlCompleto = '';
        for (let i = 0; i < listaDeEventos.length; i++) {
            const evento = listaDeEventos[i];
            const tarjeta = crearTarjetaEvento(evento, mapaCategorias);
            htmlCompleto = htmlCompleto + tarjeta;
        }

        // Poner todo el HTML en el contenedor
        contenedorListaEventos.innerHTML = htmlCompleto;
    }

    // ============================================================
    // 7. FUNCIÓN PARA FILTRAR EVENTOS POR BÚSQUEDA
    // ============================================================
    // Recibe el texto que el usuario escribió y filtra los eventos.

    function filtrarEventos(textoBusqueda) {
        // Obtener todos los eventos
        const todosLosEventos = obtenerTodosLosEventos();

        // Si el campo de búsqueda está vacío, mostrar todos
        if (textoBusqueda.trim() === '') {
            mostrarEventos(todosLosEventos);
            return;
        }

        // Convertir la búsqueda a minúsculas para comparar sin importar mayúsculas
        const busqueda = textoBusqueda.toLowerCase().trim();

        // Crear un arreglo donde guardaremos los eventos que coinciden
        const eventosFiltrados = [];

        // Recorrer todos los eventos
        for (let i = 0; i < todosLosEventos.length; i++) {
            const evento = todosLosEventos[i];

            // Obtener los campos que vamos a comparar, todos en minúsculas
            const nombre = evento.nombre.toLowerCase();
            const artista = (evento.descripcion || '').toLowerCase();
            const ciudad = (evento.ciudad || '').toLowerCase();
            const fechaFormateada = formatearFecha(evento.fecha).toLowerCase();

            // Verificar si el texto de búsqueda está en alguno de estos campos
            const coincide =
                nombre.includes(busqueda) ||
                artista.includes(busqueda) ||
                ciudad.includes(busqueda) ||
                fechaFormateada.includes(busqueda);

            // Si coincide, lo agregamos al arreglo de filtrados
            if (coincide) {
                eventosFiltrados.push(evento);
            }
        }

        // Mostrar solo los eventos filtrados
        mostrarEventos(eventosFiltrados);
    }

    // ============================================================
    // 8. FUNCIONES PARA EL MODAL (CREAR, EDITAR, CERRAR)
    // ============================================================

    /**
     * Carga las categorías en el <select> del formulario.
     * Si se pasa un id, selecciona esa categoría (para edición).
     */
    function cargarCategoriasEnSelect(categoriaIdSeleccionada = null) {
        const categorias = obtenerTodasLasCategorias();
        categoriaSelect.innerHTML = ''; // limpiar opciones

        for (let i = 0; i < categorias.length; i++) {
            const cat = categorias[i];
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.nombre;
            if (categoriaIdSeleccionada && cat.id == categoriaIdSeleccionada) {
                option.selected = true; // seleccionar si coincide
            }
            categoriaSelect.appendChild(option);
        }
    }

    /**
     * Abre el modal en modo "Crear" (todos los campos vacíos)
     */
    function abrirModalCrear() {
        modalTitulo.textContent = 'Nuevo Evento';
        formEvento.reset();                         // Limpiar formulario
        eventoIdInput.value = '';                  // Sin ID = creación

        // Valores por defecto (opcional)
        const hoy = new Date().toISOString().split('T')[0];
        fechaInput.value = hoy;
        horaInput.value = '19:00';

        cargarCategoriasEnSelect();                // Cargar categorías
        modalOverlay.classList.add('activo');
        modalOverlay.style.display = 'flex';       // Mostrar modal
    }

    /**
     * Abre el modal en modo "Editar" con los datos del evento
     */
    function abrirModalEditar(evento) {
        modalTitulo.textContent = 'Editar Evento';
        eventoIdInput.value = evento.id;

        // Rellenar todos los campos con los datos del evento
        nombreInput.value = evento.nombre || '';
        precioInput.value = evento.precio || '';
        fechaInput.value = evento.fecha || '';
        horaInput.value = evento.hora || '19:00';
        ciudadInput.value = evento.ciudad || '';
        descripcionInput.value = evento.descripcion || '';
        imagenInput.value = evento.imagen || '';

        // Cargar categorías y seleccionar la actual
        cargarCategoriasEnSelect(evento.categoriaId);

        modalOverlay.classList.add('activo');
        modalOverlay.style.display = 'flex';
    }

    /**
     * Cierra el modal (oculta)
     */
    function cerrarModal() {
        modalOverlay.classList.remove('activo');
        modalOverlay.style.display = 'none';
    }

    // ============================================================
    // 9. FUNCIÓN PARA GUARDAR EVENTO (CREAR O EDITAR)
    // ============================================================

    /**
     * Maneja el envío del formulario: guarda el evento en localStorage
     * (crea uno nuevo o actualiza uno existente según el ID)
     */
    function guardarEventoFormulario(e) {
        e.preventDefault(); // Evita que la página se recargue

        // 9.1 Recoger datos del formulario
        const id = eventoIdInput.value;
        const nombre = nombreInput.value.trim();
        const categoriaId = parseInt(categoriaSelect.value);
        const precio = parseFloat(precioInput.value);
        const fecha = fechaInput.value;
        const hora = horaInput.value;
        const ciudad = ciudadInput.value.trim();
        const descripcion = descripcionInput.value.trim();
        const imagen = imagenInput.value.trim();

        // 9.2 Validación básica (campos obligatorios)
        if (!nombre || !categoriaId || !precio || !fecha || !ciudad) {
            alert('Por favor, completa todos los campos obligatorios (*)');
            return;
        }

        // 9.3 Obtener la lista actual de eventos
        let eventos = obtenerTodosLosEventos();

        // 9.4 Determinar si es edición o creación
        if (id) {
            // ===== MODO EDICIÓN =====
            let eventoEncontrado = false;
            for (let i = 0; i < eventos.length; i++) {
                if (eventos[i].id == id) {
                    // Actualizar los datos del evento existente
                    eventos[i] = {
                        ...eventos[i],        // mantiene id y código originales
                        nombre,
                        categoriaId,
                        precio,
                        fecha,
                        hora,
                        ciudad,
                        descripcion,
                        imagen
                    };
                    eventoEncontrado = true;
                    break;
                }
            }
            if (!eventoEncontrado) {
                alert('Error: el evento no existe.');
                return;
            }
        } else {
            // ===== MODO CREACIÓN =====
            // Generar un nuevo ID (el mayor existente + 1)
            let nuevoId = 1;
            if (eventos.length > 0) {
                let maxId = 0;
                for (let i = 0; i < eventos.length; i++) {
                    if (eventos[i].id > maxId) {
                        maxId = eventos[i].id;
                    }
                }
                nuevoId = maxId + 1;
            }

            // Crear el nuevo objeto evento
            const nuevoEvento = {
                id: nuevoId,
                codigo: 'EVT' + String(nuevoId).padStart(4, '0'), // ejemplo: EVT0009
                nombre,
                categoriaId,
                precio,
                fecha,
                hora,
                ciudad,
                descripcion,
                imagen
            };

            // Añadirlo a la lista
            eventos.push(nuevoEvento);
        }

        // 9.5 Guardar en localStorage y actualizar vista
        guardarEventos(eventos); // <-- viene de storage.js

        cerrarModal();                     // Cerrar modal
        actualizarEstadisticas();          // Actualizar números
        mostrarEventos();                  // Actualizar lista

        // Mensaje de éxito
        alert(id ? '✅ Evento actualizado correctamente.' : '✅ Evento creado correctamente.');
    }

    // ============================================================
    // 10. FUNCIÓN PARA ELIMINAR UN EVENTO
    // ============================================================
    // Recibe el ID del evento y lo borra de localStorage.

    function eliminarEvento(idEvento) {
        // Preguntar al usuario si está seguro
        const confirmacion = confirm('¿Estás seguro de que quieres eliminar este evento?');

        if (!confirmacion) {
            return; // Si no confirma, no hace nada
        }

        // Obtener todos los eventos
        const eventos = obtenerTodosLosEventos();

        // Crear un nuevo arreglo sin el evento que tiene ese ID
        const eventosActualizados = [];
        for (let i = 0; i < eventos.length; i++) {
            if (eventos[i].id !== idEvento) {
                eventosActualizados.push(eventos[i]);
            }
        }

        // Guardar el nuevo arreglo en localStorage
        guardarEventos(eventosActualizados); // <-- viene de storage.js

        // Actualizar la pantalla
        actualizarEstadisticas();
        mostrarEventos();

        // Mostrar un mensaje de éxito
        alert('Evento eliminado correctamente.');
    }

    // ============================================================
    // 11. CONFIGURAR LOS EVENTOS DEL USUARIO (listeners)
    // ============================================================
    // Aquí "escuchamos" lo que el usuario hace (escribir, hacer clic, etc.)

    // 11.1 Cuando el usuario escribe en el buscador, filtramos
    campoBusqueda.addEventListener('input', function (evento) {
        const texto = evento.target.value;
        filtrarEventos(texto);
    });

    // 11.2 Cuando el usuario hace clic en "Crear evento" → abrir modal
    botonCrearEvento.addEventListener('click', function () {
        abrirModalCrear();
    });

    // 11.3 Cuando el usuario hace clic en los botones de editar o eliminar
    // Usamos "delegación de eventos" porque los botones se crean dinámicamente
    contenedorListaEventos.addEventListener('click', function (evento) {
        // Verificar si el clic fue en un botón o en su ícono
        const botonClickeado = evento.target.closest('button');

        // Si no fue en un botón, salimos
        if (!botonClickeado) {
            return;
        }

        // Obtener el ID del evento desde el atributo data-id
        const idEvento = botonClickeado.dataset.id;

        // Si no tiene ID, salimos
        if (!idEvento) {
            return;
        }

        // Verificar si el botón es de "editar" o "eliminar"
        if (botonClickeado.classList.contains('btn-editar')) {
            // Buscar el evento en la lista completa
            const eventos = obtenerTodosLosEventos();
            let eventoEncontrado = null;
            for (let i = 0; i < eventos.length; i++) {
                if (eventos[i].id == idEvento) {
                    eventoEncontrado = eventos[i];
                    break;
                }
            }
            if (eventoEncontrado) {
                abrirModalEditar(eventoEncontrado);
            } else {
                alert('No se encontró el evento.');
            }
        } else if (botonClickeado.classList.contains('btn-eliminar')) {
            // Eliminar evento
            eliminarEvento(Number(idEvento)); // Convertir a número
        }
    });

    // 11.4 Cerrar modal al hacer clic en la X o en el fondo oscuro
    btnCerrarModal.addEventListener('click', cerrarModal);

    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
            cerrarModal();
        }
    });

    // 11.5 Enviar formulario (guardar evento)
    formEvento.addEventListener('submit', guardarEventoFormulario);

    // ============================================================
    // 12. INICIALIZAR LA PÁGINA CUANDO CARGA
    // ============================================================
    // Al final, ejecutamos las funciones para mostrar los datos iniciales.

    console.log('Cargando página de gestión de eventos...');
    actualizarEstadisticas();
    mostrarEventos();
    console.log('✅ Página lista.');

});