

document.addEventListener('DOMContentLoaded', () => {
    const $ = id => document.getElementById(id);
    const contenedor = $('contenedor-categorias');
    const buscador = $('buscador-categorias');
    const form = $('form-categoria');
    const inputNombre = $('input-nombre');
    const inputIcono = $('input-icono');
    const inputDescripcion = $('input-descripcion');
    const categoriaIdEditar = $('categoria-id-editar');
    const formTitulo = $('form-titulo');
    const vistaPrevia = $('vista-previa-icono');
    const btnNueva = $('btn-nueva-categoria');
    const btnCancelar = $('btn-cancelar-edicion');
    const btnGuardar = $('btn-guardar');

    const modalConfirmacion = $('modal-confirmacion');
    const modalMensaje = $('modal-mensaje');
    const btnModalCancelar = $('btn-modal-cancelar');
    const btnModalConfirmar = $('btn-modal-confirmar');

    let categoriaAEliminar = null;

    // ============================================================
    // 2. FUNCIONES AUXILIARES (storage)
    // ============================================================
    const obtenerCategoriasStorage = () => obtenerCategorias();
    const obtenerEventosStorage = () => obtenerEventos();
    const guardarCategoriasStorage = (lista) => guardarCategorias(lista);

    const contarEventosPorCategoria = (id) =>
        obtenerEventosStorage().filter(e => e.categoriaId === id).length;

    const mostrarToast = (mensaje, tipo = 'success') => {
        document.querySelector('.toast')?.remove();
        const toast = document.createElement('div');
        toast.className = `toast toast-${tipo}`;
        toast.textContent = mensaje;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.5s';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    };

    // ============================================================
    // 3. RENDERIZAR CATEGORÍAS (grid)
    // ============================================================
    const renderizarCategorias = (filtro = '') => {
        const categorias = obtenerCategoriasStorage();
        const texto = filtro.trim().toLowerCase();
        const filtradas = categorias.filter(c => c.nombre.toLowerCase().includes(texto));

        if (filtradas.length === 0) {
            contenedor.innerHTML = `
                <p class="category-grid-loading" style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--sobre-superficie-variante);">
                    No hay categorías para mostrar.
                </p>
            `;
            return;
        }

        contenedor.innerHTML = filtradas.map(cat => {
            const icono = cat.icono || 'category';
            const eventos = contarEventosPorCategoria(cat.id);
            return `
                <div class="category-card" data-id="${cat.id}">
                    <div class="category-card-top">
                        <div class="category-icon">
                            <span class="material-symbols-outlined">${icono}</span>
                        </div>
                        <div class="category-actions">
                            <button class="btn-edit" title="Editar" data-id="${cat.id}">
                                <span class="material-symbols-outlined">edit</span>
                            </button>
                            <button class="btn-delete" title="Eliminar" data-id="${cat.id}">
                                <span class="material-symbols-outlined">delete</span>
                            </button>
                        </div>
                    </div>
                    <div class="category-card-bottom">
                        <h4>${cat.nombre}</h4>
                        <p class="event-count">${eventos} EVENTOS ACTIVOS</p>
                    </div>
                </div>
            `;
        }).join('');
    };

    // ============================================================
    // 4. VISTA PREVIA DEL ICONO
    // ============================================================
    const actualizarVistaPrevia = () => {
        vistaPrevia.textContent = inputIcono.value.trim() || 'category';
    };

    // ============================================================
    // 5. FORMULARIO: RESET, CARGAR, GUARDAR
    // ============================================================
    const resetearFormulario = () => {
        form.reset();
        categoriaIdEditar.value = '';
        formTitulo.textContent = 'Creación Rápida';
        inputIcono.value = 'category';
        btnGuardar.textContent = 'GUARDAR CATEGORÍA';
        btnCancelar.style.display = 'none';
        actualizarVistaPrevia();
    };

    const cargarCategoriaParaEditar = (id) => {
        const categorias = obtenerCategoriasStorage();
        const cat = categorias.find(c => c.id === id);
        if (!cat) return mostrarToast('Categoría no encontrada', 'error');

        categoriaIdEditar.value = cat.id;
        inputNombre.value = cat.nombre;
        inputIcono.value = cat.icono || 'category';
        inputDescripcion.value = cat.descripcion || '';
        formTitulo.textContent = 'Editar Categoría';
        btnGuardar.textContent = 'ACTUALIZAR CATEGORÍA';
        btnCancelar.style.display = 'inline-block';
        actualizarVistaPrevia();
        document.querySelector('.form-sidebar').scrollIntoView({ behavior: 'smooth' });
        inputNombre.focus();
    };

    const guardarCategoria = (e) => {
        e.preventDefault();

        const id = categoriaIdEditar.value;
        const nombre = inputNombre.value.trim();
        const icono = inputIcono.value.trim() || 'category';
        const descripcion = inputDescripcion.value.trim();

        if (!nombre) {
            mostrarToast('El nombre es obligatorio.', 'error');
            inputNombre.focus();
            return;
        }

        let categorias = obtenerCategoriasStorage();


        const duplicado = categorias.some(c =>
            c.id != id && c.nombre.toLowerCase() === nombre.toLowerCase()
        );
        if (duplicado) {
            mostrarToast('Ya existe una categoría con ese nombre.', 'error');
            inputNombre.focus();
            return;
        }

        if (id) {
      
            const index = categorias.findIndex(c => c.id == id);
            if (index === -1) return mostrarToast('Error al actualizar.', 'error');
            categorias[index] = { ...categorias[index], nombre, icono, descripcion };
            mostrarToast('✅ Categoría actualizada.', 'success');
        } else {
          
            const nuevoId = categorias.length ? Math.max(...categorias.map(c => c.id)) + 1 : 1;
            categorias.push({ id: nuevoId, nombre, icono, descripcion });
            mostrarToast('✅ Categoría creada.', 'success');
        }

        guardarCategoriasStorage(categorias);
        renderizarCategorias(buscador.value);
        resetearFormulario();
    };

    // ============================================================
    // 6. ELIMINAR (modal)
    // ============================================================
    const mostrarModalEliminar = (id) => {
        const categorias = obtenerCategoriasStorage();
        const cat = categorias.find(c => c.id === id);
        if (!cat) return mostrarToast('Categoría no encontrada.', 'error');

        const eventos = contarEventosPorCategoria(id);
        let mensaje = `¿Eliminar la categoría "${cat.nombre}"?`;
        if (eventos > 0) {
            mensaje += `\n\n⚠️ Tiene ${eventos} evento(s) asociado(s). Quedarán sin categoría.`;
        }
        mensaje += '\n\nEsta acción no se puede deshacer.';

        modalMensaje.textContent = mensaje;
        categoriaAEliminar = id;
        modalConfirmacion.classList.add('active');
        modalConfirmacion.style.display = 'flex';
    };

    const cerrarModalEliminar = () => {
        modalConfirmacion.classList.remove('active');
        modalConfirmacion.style.display = 'none';
        categoriaAEliminar = null;
    };

    const eliminarCategoriaConfirmado = () => {
        if (categoriaAEliminar === null) return;

        const categorias = obtenerCategoriasStorage();
        const nuevas = categorias.filter(c => c.id !== categoriaAEliminar);

        if (nuevas.length === categorias.length) {
            mostrarToast('Error: la categoría no existe.', 'error');
            cerrarModalEliminar();
            return;
        }

        guardarCategoriasStorage(nuevas);
        renderizarCategorias(buscador.value);
        cerrarModalEliminar();
        mostrarToast('🗑️ Categoría eliminada.', 'success');

        // Si estábamos editando esa categoría, resetear
        if (categoriaIdEditar.value && categoriaIdEditar.value == categoriaAEliminar) {
            resetearFormulario();
        }
    };

    // ============================================================
    // 7. EVENT LISTENERS
    // ============================================================
    buscador.addEventListener('input', (e) => renderizarCategorias(e.target.value));
    inputIcono.addEventListener('input', actualizarVistaPrevia);
    btnNueva.addEventListener('click', () => {
        resetearFormulario();
        document.querySelector('.form-sidebar').scrollIntoView({ behavior: 'smooth' });
        inputNombre.focus();
    });
    btnCancelar.addEventListener('click', resetearFormulario);
    form.addEventListener('submit', guardarCategoria);

    contenedor.addEventListener('click', (e) => {
        const boton = e.target.closest('button');
        if (!boton) return;
        const id = boton.dataset.id;
        if (!id) return;

        if (boton.classList.contains('btn-edit')) {
            cargarCategoriaParaEditar(Number(id));
        } else if (boton.classList.contains('btn-delete')) {
            mostrarModalEliminar(Number(id));
        }
    });

    btnModalCancelar.addEventListener('click', cerrarModalEliminar);
    btnModalConfirmar.addEventListener('click', eliminarCategoriaConfirmado);
    modalConfirmacion.addEventListener('click', (e) => {
        if (e.target === modalConfirmacion) cerrarModalEliminar();
    });

    // ============================================================
    // 8. INICIALIZAR
    // ============================================================
    console.log('Cargando gestión de categorías...');
    renderizarCategorias();
    resetearFormulario();
    console.log('✅ Listo.');
});