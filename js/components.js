class Btnprimario extends HTMLElement {
    constructor() {
        super();
        this.classList.add("btn-primary");
    }
}

customElements.define("btn-primario", Btnprimario);

class BtnSecundario extends HTMLElement {
    constructor() {
        super();
        this.classList.add("btn-submit");
    }
}

customElements.define("btn-secundario", BtnSecundario);



const paginasAdmin = {
    "Principaladmin.html": {
        titulo: "Administración",
        breadcrumb: "Principal",
        boton: null
    },
    "Categorias.html": {
        titulo: "Gestión de Categorías",
        breadcrumb: "Categorías",
        boton: { id: "btn-nueva-categoria", icono: "add", texto: "NUEVA CATEGORÍA" }
    },
    "gestion-eventos.html": {
        titulo: "Gestión de Eventos",
        breadcrumb: "Eventos",
        boton: { id: "btn-nuevo-evento", icono: "add", texto: "NUEVO EVENTO", href: "#" }
    },
    "Reporte-ventas.html": {
        titulo: "Registro de Ventas",
        breadcrumb: "Ventas",
        boton: null
    },
};

function obtenerPaginaActual() {
    return window.location.pathname.split("/").pop() || "Principaladmin.html";
}


class HeaderUsuario extends HTMLElement {
    connectedCallback() {
        const categorias = obtenerCategorias();
        let listaCategory = "";
        for (let i = 0; i < categorias.length; i++) {
            listaCategory += `
                <div>
                    <span class="header-breadcrumb">
                        ${categorias[i].nombre}
                    </span>
                </div>
            `;
        }
        this.innerHTML = `
            <section >
                 <nav class="navbar-fixed">
        <div class="navbar-container">
            <div class="">
                <div class="">
                    <h2 class="footer-logo">SeVenTonic</h2>
                    <div class="person nav">
                         ${listaCategory}
                    </div>
                </div>
            </div>
            <div class=" items-center gap-4 ">
                <div class="search-bar-container">
                    <span class="material-symbols-outlined text-gray-400 mr-2">search</span>
                    <input class="search-input" placeholder="Buscar eventos..." type="text">
                </div>
                <button class="icon-button">
                    <span class="material-symbols-outlined">shopping_cart</span>
                </button>
                <button class="btn-primary">Sign In</button>
            </div>
        </div>
    </nav>
            </section>
        `;
        console.log("Header cargado");
        
    }
}

customElements.define("header-user", HeaderUsuario);
class CardEvent extends HTMLElement{
    connectedCallback(){
    const eventos = obtenerEventos()

     this.innerHTML = `
            <article class="events-grid">
                <div class="event-card glass-card neon-glow-cyan">
                    <div class="card-image-wrapper">
                        <div class="card-image" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3Ut0DGITbw_8crO0eQqjk-n26zmLqrk_3_bFrH_O6NUgW7ahPoe1MJgi5Eo-xAbB6M9AOv9lxjizklmsyu1Ow2WIQEYmluXSGhTqkCI8ad_rB59x0sVV6_jKp-ti4A_p2EP7iEsIwEkPr5wZ4GJhdQDZGllvrGQn-hXDaZuT4LvrzPiJtUbbJOLbRxWqHkNKNgCtzMEEaD4LEG3s86XZr0T3C2E8eOde-6DnbiIfdkxt4aeq8j0KH')"></div>
                        <div class="absolute top-3 right-3">
                            <span class="badge-recommended">RECOMENDADO</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">Artist Artist</h3>
                        <p class="card-info">Próximo Evento: <span class="text-gray-300">Estadio</span></p>
                        <div class="card-footer">
                            <span class="card-tag"># ITTTECIA</span>
                            <span class="material-symbols-outlined arrow-icon">arrow_forward</span>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }
}
class Header extends HTMLElement {
    connectedCallback() {
        const pagina = paginasAdmin[obtenerPaginaActual()] || paginasAdmin["Principaladmin.html"];
        const botonHtml = pagina.boton
            ? `<btn-primario id="${pagina.boton.id}">
                    <span class="material-symbols-outlined">${pagina.boton.icono}</span>
                    ${pagina.boton.texto}
               </btn-primario>
            `: "";

        this.innerHTML = `
        <section class="header">
            <div>
                <h2 class="header-title">${pagina.titulo}</h2>
                <div class="header-breadcrumb">
                    <span>Admin</span>
                    <span>/</span>
                    <span>${pagina.breadcrumb}</span>
                </div>
            </div>
            ${botonHtml}
        </section>`;
    }
}



customElements.define("header-admin", Header);

class Sidebar extends HTMLElement {
    connectedCallback() {
        const paginaActual = obtenerPaginaActual();
        const items = [
            { href: "Principaladmin.html", icono: "dashboard", texto: "PRINCIPAL" },
            { href: "gestion-eventos.html", icono: "event", texto: "GESTIÓN DE EVENTOS" },
            { href: "Categorias.html", icono: "category", texto: "CATEGORÍAS" },
            { href: "Reporte-ventas.html", icono: "payments", texto: "REGISTRO DE VENTAS" }
        ];

        const enlaces = items.map((item) => {
            const activo = paginaActual === item.href ? " active" : "";
            return `<a href="${item.href}" class="${activo.trim()}">
                <span class="material-symbols-outlined">${item.icono}</span>
                ${item.texto}
            </a>`;
        }).join("");

        this.innerHTML = `
        <aside class="sidebar">
            <div class="sidebar-header">
                <h2 class="sidebar-logo footer-logo">SeVenTonic</h2>
                <p class="sidebar-label">ADMIN PANEL</p>
            </div>
            <nav class="sidebar-nav">
                ${enlaces}
                <a href="../index.html" class="logout" id="btn-cerrar-sesion">
                    <span class="material-symbols-outlined">logout</span>
                    CERRAR SESIÓN
                </a>
            </nav>
            <div class="sidebar-footer">
                <div class="sidebar-user">
                    <div class="sidebar-avatar">
                        <span class="material-symbols-outlined">person</span>
                    </div>
                    <div>
                        <div class="sidebar-user-name">Admin User</div>
                        <div class="sidebar-user-role">ROOT ACCESS</div>
                    </div>
                </div>
            </div>
        </aside>`;
    }
}

customElements.define("barra-lateral-admin", Sidebar);

class footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="admin-footer">
            <div class="footer-grid">
                <div>
                    <h2 class="footer-logo">SeVenTonic</h2>
                    <p class="footer-copyright">
                        © 2024 SEVENTONIC PLATFORM. ALL RIGHTS RESERVED.
                    </p>
                </div>
                <div>
                    <h5 class="footer-title">Explorar</h5>
                    <ul class="footer-links">
                        <li><a href="#" class="footer-link">Privacy Policy</a></li>
                        <li><a href="#" class="footer-link">Terms of Service</a></li>
                    </ul>
                </div>
                <div>
                    <h5 class="footer-title">Soporte</h5>
                    <ul class="footer-links">
                        <li><a href="#" class="footer-link">Help Center</a></li>
                        <li><a href="#" class="footer-link">Newsletter</a></li>
                    </ul>
                </div>
                <div>
                    <h5 class="footer-title">Estado del Sistema</h5>
                    <div class="footer-status">
                        <div class="footer-status-dot"></div>
                        <span class="footer-status-text">Servidores Operativos</span>
                    </div>
                </div>
            </div>
        </footer>`;
    }
}

customElements.define("footer-admin", footer);
