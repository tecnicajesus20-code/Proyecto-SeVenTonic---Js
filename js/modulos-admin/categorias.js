document.addEventListener("DOMContentLoaded", () => {
    if (!document.getElementById("contenedor-categorias")) return;

    const contenedor = document.getElementById("contenedor-categorias");
    const buscador = document.getElementById("buscador-categorias");
    const inputIcono = document.getElementById("input-icono");
    const vistaPreviaIcono = document.getElementById("vista-previa-icono");
    const form = document.getElementById("form-categoria");
    const btnNueva = document.getElementById("btn-nueva-categoria");

    function contarEventos(categoriaId) {
        return obtenerEventos().filter((e) => e.categoriaId === categoriaId).length;
    }

    function renderizarCategorias(filtro = "") {
        const categorias = obtenerCategorias();
        const texto = filtro.toLowerCase().trim();
        const filtradas = categorias.filter((c) =>
            c.nombre.toLowerCase().includes(texto)
        );

        if (filtradas.length === 0) {
            contenedor.innerHTML = `<p class="category-grid-loading">No hay categorías para mostrar.</p>`;
            return;
        }

        contenedor.innerHTML = filtradas.map((cat) => {
            const icono = cat.icono || "category";
            const eventos = contarEventos(cat.id);
            return `
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
            </div>`;
        }).join("");
    }

    function actualizarVistaPreviaIcono() {
        if (!inputIcono || !vistaPreviaIcono) return;
        const nombre = inputIcono.value.trim() || "category";
        vistaPreviaIcono.textContent = nombre;
    }

    function resetearFormulario() {
        if (!form) return;
        form.reset();
        document.getElementById("categoria-id-editar").value = "";
        document.getElementById("form-titulo").textContent = "Creación Rápida";
        inputIcono.value = "category";
        actualizarVistaPreviaIcono();
    }

    if (inputIcono) {
        inputIcono.addEventListener("input", actualizarVistaPreviaIcono);
    }

    if (buscador) {
        buscador.addEventListener("input", (e) => renderizarCategorias(e.target.value));
    }

    if (btnNueva) {
        btnNueva.addEventListener("click", () => {
            resetearFormulario();
            document.querySelector(".form-sidebar")?.scrollIntoView({ behavior: "smooth" });
            document.getElementById("input-nombre")?.focus();
        });
    }

    renderizarCategorias();
    actualizarVistaPreviaIcono();
});
