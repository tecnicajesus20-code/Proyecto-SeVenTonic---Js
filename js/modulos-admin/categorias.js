/**
 * ============================================================
 * ARCHIVO: categorias.js
 * PROPÓSITO: Controlar la página de "Gestión de Categorías"
 * AUTOR: [Aprendiz]
 * FECHA: [fecha actual]
 * ============================================================
 * 
 * ¿Qué hace este archivo?
 * 1. Muestra todas las categorías en un grid.
 * 2. Permite buscar categorías por nombre.
 * 3. Permite crear nuevas categorías (formulario lateral).
 * 4. Permite editar categorías existentes (cargando datos en el formulario).
 * 5. Permite eliminar categorías (con confirmación y validación).
 * 6. Muestra cuántos eventos tiene cada categoría.
 * 7. Todos los datos se guardan en localStorage mediante storage.js.
 * ============================================================
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {

    // ============================================================
    // 1. REFERENCIAS A ELEMENTOS DEL DOM
    // ============================================================

    const contenedorCategorias = document.getElementById('contenedor-categorias');
    const buscador = document.getElementById('buscador-categorias');
    const formCategoria = document.getElementById('form-categoria');
    const inputNombre = document.getElementById('input-nombre');
    const inputIcono = document.getElementById('input-icono');
    const inputDescripcion = document.getElementById('input-descripcion');
    const categoriaIdEditar = document.getElementById('categoria-id-editar');
    const formTitulo = document.getElementById('form-titulo');
    const vistaPreviaIcono = document.getElementById('vista-previa-icono');
    const btnNueva = document.getElementById('btn-nueva-categoria');
    const btnCancelar = document.getElementById('btn-cancelar-edicion');
    const btnGuardar = document.getElementById('btn-guardar');

    // Modal de confirmación
    const modalConfirmacion = document.getElementById('modal-confirmacion');
    const modalMensaje = document.getElementById('modal-mensaje');
    const btnModalCancelar = document.getElementById('btn-modal-cancelar');
    const btnModalConfirmar = document.getElementById('btn-modal-confirmar');

    // Variable para almacenar el ID de la categoría a eliminar
    let categoriaAEliminar = null;

    // ============================================================
    // 2. FUNCIONES AUXILIARES (helpers)
    // ============================================================

    /**
     * Obtiene todas las categorías desde localStorage (usando storage.js)
     */
    function obtenerTodasLasCategorias() {
        return obtenerCategorias(); // <-- viene de storage.js
    }

    /**
     * Obtiene todos los eventos desde localStorage (usando storage.js)
     */
    function obtenerTodosLosEventos() {
        return obtenerEventos(); // <-- viene de storage.js
    }

    /**
     * Cuenta cuántos eventos pertenecen a una categoría
     */
    function contarEventosPorCategoria(categoriaId) {
        const eventos = obtenerTodosLosEventos();
        let contador = 0;
        for (let i = 0; i < eventos.length; i++) {
            if (eventos[i].categoriaId === categoriaId) {
                contador++;
            }
        }
        return contador;
    }

    /**
     * Muestra un mensaje tipo "toast" (notificación)
     */
    function mostrarToast(mensaje, tipo = 'success') {
        // Eliminar toast anterior si existe
        const toastAnterior = document.querySelector('.toast');
        if (toastAnterior) toastAnterior.remove();

        const toast = document.createElement('div');
        toast.className = `toast toast-${tipo}`;
        toast.textContent = mensaje;
        document.body.appendChild(toast);

        // Ocultar después de 3 segundos
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.5s';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    // ============================================================
    // 3. FUNCIONES DE RENDERIZADO
    // ============================================================

    /**
     * Renderiza las categorías en el grid, aplicando filtro de búsqueda si existe
     */
    function renderizarCategorias(filtro = '') {
        const categorias = obtenerTodasLasCategorias();
        const texto = filtro.toLowerCase().trim();

        // Filtrar categorías según el texto de búsqueda
        const filtradas = categorias.filter(function (cat) {
            return cat.nombre.toLowerCase().includes(texto);
        });

        // Si no hay categorías, mostrar mensaje
        if (filtradas.length === 0) {
            contenedorCategorias.innerHTML = `
                <p class="category-grid-loading" style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--sobre-superficie-variante);">
                    No hay categorías para mostrar.
                </p>
            `;
            return;
        }

        // Generar HTML para cada categoría
        let html = '';
        for (let i = 0; i < filtradas.length; i++) {
            const cat = filtradas[i];
            const icono = cat.icono || 'category';
            const eventos = contarEventosPorCategoria(cat.id);

            html += `
                <div class="category-card" data-id="${cat.id}">
                    <div class="category-card-top">
                        <div class="category-icon">
                            <span class="material-symbols-outlined">${icono}</span>
                        </div>
                        <div class="category-actions">
                            <button type="button" class="btn-edit" title="Editar" data-id="${cat.id}">
                                <span class="material-symbols-outlined">edit</span>
                            </button>
                            <button type="button" class="btn-delete" title="Eliminar" data-id="${cat.id}">
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
        }

        contenedorCategorias.innerHTML = html;
    }

    /**
     * Actualiza la previsualización del icono en el formulario
     */
    function actualizarVistaPreviaIcono() {
        const nombreIcono = inputIcono.value.trim() || 'category';
        vistaPreviaIcono.textContent = nombreIcono;
    }

    // ============================================================
    // 4. FUNCIONES DEL FORMULARIO (Crear / Editar)
    // ============================================================

    /**
     * Resetea el formulario al modo "Crear" (limpia campos y oculta ID)
     */
    function resetearFormulario() {
        formCategoria.reset();
        categoriaIdEditar.value = '';
        formTitulo.textContent = 'Creación Rápida';
        inputIcono.value = 'category';
        actualizarVistaPreviaIcono();
        // Quitar estilos de edición si los hubiera
        btnGuardar.textContent = 'GUARDAR CATEGORÍA';
        btnCancelar.style.display = 'none';
    }

    /**
     * Carga los datos de una categoría en el formulario para editar
     */
    function cargarCategoriaParaEditar(id) {
        const categorias = obtenerTodasLasCategorias();
        let categoriaEncontrada = null;
        for (let i = 0; i < categorias.length; i++) {
            if (categorias[i].id === id) {
                categoriaEncontrada = categorias[i];
                break;
            }
        }

        if (!categoriaEncontrada) {
            mostrarToast('Categoría no encontrada', 'error');
            return;
        }

        // Llenar el formulario con los datos
        categoriaIdEditar.value = categoriaEncontrada.id;
        inputNombre.value = categoriaEncontrada.nombre;
        inputIcono.value = categoriaEncontrada.icono || 'category';
        inputDescripcion.value = categoriaEncontrada.descripcion || '';
        formTitulo.textContent = 'Editar Categoría';
        btnGuardar.textContent = 'ACTUALIZAR CATEGORÍA';
        btnCancelar.style.display = 'inline-block';

        actualizarVistaPreviaIcono();

        // Desplazar el formulario a la vista
        document.querySelector('.form-sidebar').scrollIntoView({ behavior: 'smooth' });
        inputNombre.focus();
    }

    /**
     * Guarda la categoría (crea o actualiza según si hay ID en el campo oculto)
     */
    function guardarCategoria(evento) {
        evento.preventDefault(); // Evitar recarga de página

        // 1. Obtener valores del formulario
        const id = categoriaIdEditar.value;
        const nombre = inputNombre.value.trim();
        const icono = inputIcono.value.trim() || 'category';
        const descripcion = inputDescripcion.value.trim();

        // 2. Validar campo obligatorio (nombre)
        if (!nombre) {
            mostrarToast('El nombre de la categoría es obligatorio.', 'error');
            inputNombre.focus();
            return;
        }

        // 3. Obtener lista actual de categorías
        let categorias = obtenerTodasLasCategorias();

        // 4. Verificar duplicados (evitar nombres repetidos)
        const nombreExiste = categorias.some(function (cat) {
            // Si estamos editando, permitir el mismo nombre si es la misma categoría
            if (id && cat.id == id) return false;
            return cat.nombre.toLowerCase() === nombre.toLowerCase();
        });

        if (nombreExiste) {
            mostrarToast('Ya existe una categoría con ese nombre.', 'error');
            inputNombre.focus();
            return;
        }

        // 5. Guardar o actualizar
        if (id) {
            // ===== MODO EDICIÓN =====
            let actualizado = false;
            for (let i = 0; i < categorias.length; i++) {
                if (categorias[i].id == id) {
                    categorias[i] = {
                        ...categorias[i],
                        nombre: nombre,
                        icono: icono,
                        descripcion: descripcion
                    };
                    actualizado = true;
                    break;
                }
            }
            if (!actualizado) {
                mostrarToast('Error al actualizar la categoría.', 'error');
                return;
            }
            mostrarToast('✅ Categoría actualizada correctamente.', 'success');
        } else {
            // ===== MODO CREACIÓN =====
            // Generar nuevo ID (el mayor + 1)
            let nuevoId = 1;
            if (categorias.length > 0) {
                let maxId = 0;
                for (let i = 0; i < categorias.length; i++) {
                    if (categorias[i].id > maxId) {
                        maxId = categorias[i].id;
                    }
                }
                nuevoId = maxId + 1;
            }

            const nuevaCategoria = {
                id: nuevoId,
                nombre: nombre,
                icono: icono,
                descripcion: descripcion
            };

            categorias.push(nuevaCategoria);
            mostrarToast('✅ Categoría creada correctamente.', 'success');
        }

        // 6. Guardar en localStorage
        guardarCategorias(categorias); // <-- viene de storage.js

        // 7. Actualizar la vista
        renderizarCategorias(buscador.value);
        resetearFormulario();
    }

    // ============================================================
    // 5. FUNCIONES PARA ELIMINAR (con modal)
    // ============================================================

    /**
     * Muestra el modal de confirmación para eliminar una categoría
     */
    function mostrarModalEliminar(id) {
        const categorias = obtenerTodasLasCategorias();
        let categoria = null;
        for (let i = 0; i < categorias.length; i++) {
            if (categorias[i].id === id) {
                categoria = categorias[i];
                break;
            }
        }

        if (!categoria) {
            mostrarToast('Categoría no encontrada.', 'error');
            return;
        }

        // Verificar si tiene eventos asociados
        const eventos = contarEventosPorCategoria(id);
        let mensaje = `¿Estás seguro de que quieres eliminar la categoría "${categoria.nombre}"?`;
        if (eventos > 0) {
            mensaje += `\n\n⚠️ Esta categoría tiene ${eventos} evento(s) asociado(s). Si la eliminas, esos eventos quedarán sin categoría.`;
        }
        mensaje += '\n\nEsta acción no se puede deshacer.';

        modalMensaje.textContent = mensaje;
        categoriaAEliminar = id;
        modalConfirmacion.classList.add('active');
        modalConfirmacion.style.display = 'flex';
    }

    /**
     * Cierra el modal de confirmación
     */
    function cerrarModalEliminar() {
        modalConfirmacion.classList.remove('active');
        modalConfirmacion.style.display = 'none';
        categoriaAEliminar = null;
    }

    /**
     * Elimina la categoría (después de confirmar)
     */
    function eliminarCategoriaConfirmado() {
        if (categoriaAEliminar === null) return;

        // Obtener categorías y filtrar
        let categorias = obtenerTodasLasCategorias();
        const nuevasCategorias = [];
        for (let i = 0; i < categorias.length; i++) {
            if (categorias[i].id !== categoriaAEliminar) {
                nuevasCategorias.push(categorias[i]);
            }
        }

        if (nuevasCategorias.length === categorias.length) {
            mostrarToast('Error: la categoría no existe.', 'error');
            cerrarModalEliminar();
            return;
        }

        // Guardar en localStorage
        guardarCategorias(nuevasCategorias);

        // Actualizar vista
        renderizarCategorias(buscador.value);
        cerrarModalEliminar();
        mostrarToast('🗑️ Categoría eliminada correctamente.', 'success');

        // Si estábamos editando esa categoría, resetear formulario
        const idEditando = categoriaIdEditar.value;
        if (idEditando && idEditando == categoriaAEliminar) {
            resetearFormulario();
        }
    }

    // ============================================================
    // 6. EVENT LISTENERS (interacción del usuario)
    // ============================================================

    // 6.1 Buscador
    buscador.addEventListener('input', function (e) {
        renderizarCategorias(e.target.value);
    });

    // 6.2 Previsualización del icono
    inputIcono.addEventListener('input', actualizarVistaPreviaIcono);

    // 6.3 Botón "Nueva categoría" (limpia formulario)
    btnNueva.addEventListener('click', function () {
        resetearFormulario();
        document.querySelector('.form-sidebar').scrollIntoView({ behavior: 'smooth' });
        inputNombre.focus();
    });

    // 6.4 Botón "Cancelar edición"
    btnCancelar.addEventListener('click', function () {
        resetearFormulario();
    });

    // 6.5 Envío del formulario (guardar)
    formCategoria.addEventListener('submit', guardarCategoria);

    // 6.6 Botones de editar y eliminar (delegación de eventos en el grid)
    contenedorCategorias.addEventListener('click', function (e) {
        // Buscar el botón más cercano (puede ser el ícono o el botón)
        const boton = e.target.closest('button');
        if (!boton) return;

        const categoriaId = boton.dataset.id;
        if (!categoriaId) return;

        // Editar
        if (boton.classList.contains('btn-edit')) {
            cargarCategoriaParaEditar(Number(categoriaId));
        }

        // Eliminar
        else if (boton.classList.contains('btn-delete')) {
            mostrarModalEliminar(Number(categoriaId));
        }
    });

    // 6.7 Modal: botón cancelar
    btnModalCancelar.addEventListener('click', cerrarModalEliminar);

    // 6.8 Modal: botón confirmar
    btnModalConfirmar.addEventListener('click', eliminarCategoriaConfirmado);

    // 6.9 Modal: cerrar al hacer clic fuera del contenido
    modalConfirmacion.addEventListener('click', function (e) {
        if (e.target === modalConfirmacion) {
            cerrarModalEliminar();
        }
    });

    // ============================================================
    // 7. INICIALIZACIÓN AL CARGAR LA PÁGINA
    // ============================================================

    console.log('Cargando página de gestión de categorías...');
    renderizarCategorias();
    resetearFormulario();
    console.log('✅ Página lista.');
});