
document.addEventListener('DOMContentLoaded', () => {

    const $ = id => document.getElementById(id);
    const totalEventos = $('total-eventos');
    const totalCategorias = $('total-categorias');
    const totalVentas = $('total-ventas');
    const searchInput = $('search-input');
    const btnCrear = $('btn-crear-evento');
    const eventosList = $('eventos-list');

    // Referencias del modal
    const modalOverlay = $('modal-evento');
    const modalTitulo = $('modal-titulo');
    const formEvento = $('form-evento');
    const eventoIdInput = $('evento-id');
    const nombreInput = $('nombre');
    const categoriaSelect = $('categoria');
    const precioInput = $('precio');
    const fechaInput = $('fecha');
    const horaInput = $('hora');
    const ciudadInput = $('ciudad');
    const descripcionInput = $('descripcion');
    const imagenInput = $('imagen');
    const btnCerrarModal = $('btn-cerrar-modal');

    modalOverlay.style.display = 'none';

    // ============================================================
    // 2. FUNCIONES AUXILIARES (storage)
    // ============================================================
    const obtenerEventosStorage = () => obtenerEventos(); // de storage.js
    const obtenerCategoriasStorage = () => obtenerCategorias();
    const obtenerVentasStorage = () => obtenerVentas();
    const guardarEventosStorage = (lista) => guardarEventos(lista);

    // ============================================================
    // 3. FORMATEAR FECHA (YYYY-MM-DD → "DD MMM")
    // ============================================================
    const formatearFecha = (fechaISO) => {
        if (!fechaISO) return '--';
        const fecha = new Date(fechaISO + 'T00:00:00');
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = fecha.toLocaleString('es', { month: 'short' }).toUpperCase();
        return `${dia} ${mes}`;
    };

    // ============================================================
    // 4. CREAR TARJETA DE EVENTO (HTML)
    // ============================================================
    const crearTarjeta = (evento, mapaCategorias) => {
        const categoria = mapaCategorias[evento.categoriaId] || 'Sin categoría';
        const fecha = formatearFecha(evento.fecha);
        const hora = evento.hora || '--:--';
        const ciudad = evento.ciudad || 'Lugar no especificado';
        const imagen = evento.imagen || 'assets/img/default-event.jpg';
        const codigo = evento.codigo || `#${evento.id}`;

        return `
            <div class="evento-card">
                <img src="${imagen}" alt="${evento.nombre}" class="evento-imagen">
                <div class="evento-info">
                    <span class="evento-categoria">${categoria}</span>
                    <span class="evento-id">ID: ${codigo}</span>
                    <h4 class="evento-titulo">${evento.nombre}</h4>
                    <div class="evento-artista">
                        <span class="material-symbols-outlined">person</span>
                        <p>${evento.descripcion || 'Artista no disponible'}</p>
                    </div>
                </div>
                <div class="evento-fecha-lugar">
                    <h6>Fecha</h6>
                    <h5>${fecha}</h5>
                    <p>${hora} - ${ciudad}</p>
                </div>
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
    };

    // ============================================================
    // 5. RENDERIZAR ESTADÍSTICAS
    // ============================================================
    const actualizarEstadisticas = () => {
        const eventos = obtenerEventosStorage();
        const categorias = obtenerCategoriasStorage();
        const ventas = obtenerVentasStorage();
        totalEventos.textContent = eventos.length;
        totalCategorias.textContent = categorias.length;
        const total = ventas.reduce((acc, v) => acc + (v.total || 0), 0);
        totalVentas.textContent = total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    };

    // ============================================================
    // 6. RENDERIZAR LISTA DE EVENTOS (con filtro opcional)
    // ============================================================
    const mostrarEventos = (lista = null) => {
        const eventos = lista ?? obtenerEventosStorage();
        if (eventos.length === 0) {
            eventosList.innerHTML = `<p style="color:var(--sobre-superficie-variante);padding:2rem;text-align:center;">No hay eventos para mostrar.</p>`;
            return;
        }

        const categorias = obtenerCategoriasStorage();
        const mapaCategorias = categorias.reduce((map, cat) => ({ ...map, [cat.id]: cat.nombre }), {});
        eventosList.innerHTML = eventos.map(e => crearTarjeta(e, mapaCategorias)).join('');
    };

    // ============================================================
    // 7. FILTRAR EVENTOS (búsqueda)
    // ============================================================
    const filtrarEventos = (texto) => {
        const busqueda = texto.trim().toLowerCase();
        if (!busqueda) return mostrarEventos();

        const todos = obtenerEventosStorage();
        const filtrados = todos.filter(e => {
            const nombre = e.nombre.toLowerCase();
            const artista = (e.descripcion || '').toLowerCase();
            const ciudad = (e.ciudad || '').toLowerCase();
            const fecha = formatearFecha(e.fecha).toLowerCase();
            return nombre.includes(busqueda) || artista.includes(busqueda) || ciudad.includes(busqueda) || fecha.includes(busqueda);
        });
        mostrarEventos(filtrados);
    };

    // ============================================================
    // 8. MODAL: CARGAR CATEGORÍAS, ABRIR, CERRAR
    // ============================================================
    const cargarCategoriasEnSelect = (seleccionada = null) => {
        const categorias = obtenerCategoriasStorage();
        categoriaSelect.innerHTML = categorias.map(cat =>
            `<option value="${cat.id}" ${cat.id === seleccionada ? 'selected' : ''}>${cat.nombre}</option>`
        ).join('');
    };

    const abrirModalCrear = () => {
        modalTitulo.textContent = 'Nuevo Evento';
        formEvento.reset();
        eventoIdInput.value = '';
        fechaInput.value = new Date().toISOString().split('T')[0];
        horaInput.value = '19:00';
        cargarCategoriasEnSelect();
        modalOverlay.classList.add('activo');
        modalOverlay.style.display = 'flex';
    };

    const abrirModalEditar = (evento) => {
        modalTitulo.textContent = 'Editar Evento';
        eventoIdInput.value = evento.id;
        nombreInput.value = evento.nombre || '';
        precioInput.value = evento.precio || '';
        fechaInput.value = evento.fecha || '';
        horaInput.value = evento.hora || '19:00';
        ciudadInput.value = evento.ciudad || '';
        descripcionInput.value = evento.descripcion || '';
        imagenInput.value = evento.imagen || '';
        cargarCategoriasEnSelect(evento.categoriaId);
        modalOverlay.classList.add('activo');
        modalOverlay.style.display = 'flex';
    };

    const cerrarModal = () => {
        modalOverlay.classList.remove('activo');
        modalOverlay.style.display = 'none';
    };

    // ============================================================
    // 9. GUARDAR EVENTO (CREAR O EDITAR)
    // ============================================================
    const guardarEventoFormulario = (e) => {
        e.preventDefault();
        const id = eventoIdInput.value;
        const nombre = nombreInput.value.trim();
        const categoriaId = parseInt(categoriaSelect.value);
        const precio = parseFloat(precioInput.value);
        const fecha = fechaInput.value;
        const hora = horaInput.value;
        const ciudad = ciudadInput.value.trim();
        const descripcion = descripcionInput.value.trim();
        const imagen = imagenInput.value.trim();

        if (!nombre || !categoriaId || !precio || !fecha || !ciudad) {
            alert('Por favor, completa todos los campos obligatorios (*)');
            return;
        }

        let eventos = obtenerEventosStorage();

        if (id) {
         
            const index = eventos.findIndex(e => e.id == id);
            if (index === -1) return alert('Error: el evento no existe.');
            eventos[index] = { ...eventos[index], nombre, categoriaId, precio, fecha, hora, ciudad, descripcion, imagen };
        } else {
        
            const nuevoId = eventos.length ? Math.max(...eventos.map(e => e.id)) + 1 : 1;
            eventos.push({
                id: nuevoId,
                codigo: `EVT${String(nuevoId).padStart(4, '0')}`,
                nombre,
                categoriaId,
                precio,
                fecha,
                hora,
                ciudad,
                descripcion,
                imagen
            });
        }

        guardarEventosStorage(eventos);
        cerrarModal();
        actualizarEstadisticas();
        mostrarEventos();
        alert(id ? '✅ Evento actualizado correctamente.' : '✅ Evento creado correctamente.');
    };

    // ============================================================
    // 10. ELIMINAR EVENTO
    // ============================================================
    const eliminarEvento = (id) => {
        if (!confirm('¿Estás seguro de eliminar este evento?')) return;
        const eventos = obtenerEventosStorage();
        const actualizados = eventos.filter(e => e.id !== id);
        guardarEventosStorage(actualizados);
        actualizarEstadisticas();
        mostrarEventos();
        alert('Evento eliminado correctamente.');
    };


    ////////////////////////////////////////
    function cargarSelectCiudades() {

        const ciudades = ObtenerCiudades();
        const select = document.getElementById("ciudad");
    
        select.innerHTML = `
            <option value="">Seleccione una ciudad</option>
        `;
    
        ciudades.forEach(ciudad => {
    
            const option = document.createElement("option");
    
            option.value = ciudad.nombre;
            option.textContent = ciudad.nombre;
    
            select.appendChild(option);
    
        });
    
    }
    window.addEventListener("DOMContentLoaded", () => {
        cargarSelectCiudades();
    });

    // ============================================================
    // 11. EVENT LISTENERS
    // ============================================================
    searchInput.addEventListener('input', (e) => filtrarEventos(e.target.value));
    btnCrear.addEventListener('click', abrirModalCrear);
    btnCerrarModal.addEventListener('click', cerrarModal);
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) cerrarModal(); });
    formEvento.addEventListener('submit', guardarEventoFormulario);
    eventosList.addEventListener('click', (e) => {
        const boton = e.target.closest('button');
        if (!boton) return;
        const id = boton.dataset.id;
        if (!id) return;

        if (boton.classList.contains('btn-editar')) {
            const evento = obtenerEventosStorage().find(e => e.id == id);
            evento ? abrirModalEditar(evento) : alert('No se encontró el evento.');
        } else if (boton.classList.contains('btn-eliminar')) {
            eliminarEvento(Number(id));
        }
    });

    console.log('Cargando gestión de eventos...');
    actualizarEstadisticas();
    mostrarEventos();
    console.log('✅ Listo.');
});