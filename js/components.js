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
    "Sugerencias.html":{
        titulo:"Sugerencias",
        breadcrumb: "sugerencias"
    }
};

function obtenerPaginaActual() {
    return window.location.pathname.split("/").pop() || "Principaladmin.html";
}

class Header extends HTMLElement {
    connectedCallback() {
        const pagina = paginasAdmin[obtenerPaginaActual()] || paginasAdmin["Principaladmin.html"];
        const botonHtml = pagina.boton
            ? `<btn-primario id="${pagina.boton.id}">
                    <span class="material-symbols-outlined">${pagina.boton.icono}</span>
                    ${pagina.boton.texto}
               </btn-primario>`
               : "";

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
            { href: "Reporte-ventas.html", icono: "payments", texto: "REGISTRO DE VENTAS" },
            {href: "Sugerencias.html", icono: "box", texto: "SUGERENCIAS"}
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
                <button type="button" class="menu-toggle" id="btn-menu-toggle" aria-label="Abrir menú" aria-expanded="false">
                    <span class="material-symbols-outlined">menu</span>
                </button>
            </div>
            <nav class="sidebar-nav" id="sidebar-nav">
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

        // --- Lógica del menú hamburguesa ---
        const btnToggle = this.querySelector("#btn-menu-toggle");
        const nav = this.querySelector("#sidebar-nav");
        const icono = btnToggle.querySelector(".material-symbols-outlined");

        btnToggle.addEventListener("click", () => {
            const abierto = nav.classList.toggle("menu-open");
            btnToggle.setAttribute("aria-expanded", abierto);
            icono.textContent = abierto ? "close" : "menu";
        });

        // Cierra el menú al elegir una opción (mejor UX en móvil)
        nav.querySelectorAll("a").forEach((enlace) => {
            enlace.addEventListener("click", () => {
                nav.classList.remove("menu-open");
                btnToggle.setAttribute("aria-expanded", "false");
                icono.textContent = "menu";
            });
        });
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
                 <nav class="navbar-fixed" ">
                    <div class="navbar-container">
                            <div class="">
                                <h2 class="footer-logo">SeVenTonic</h2>
                                <span class="person nav">
                                ${listaCategory}
                                </span>
                            </div>
                        <div style="display: flex; gap: 4vh;">
                                <btn-secundario id="sugerencias" class ="btn">
                                <span class="material-symbols-outlined"> box 
                                </span> Sugerencias
                                </btn-secundario>
                                <btn-secundario id="Sign" class ="btn">Ingresar como Admistrador</btn-secundario>
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
    console.log(eventos)
    let cards = ""
    for (let i = 0; i < eventos.length; i++) {
      cards += `
            <article >
                <div class="event-card glass-card neon-glow-cyan">
                        <img class=" card-image-wrapper img" src="${eventos[i].imagen}">
                        <div class="absolute top-3 right-3">
                            <span class="badge-recommended">${eventos[i].ciudad}</span>
                        </div>
                    <div class="card-body">
                        <h3 class="card-title">${eventos[i].nombre}</h3>
                        <p class="card-info">Fecha: ${eventos[i].fecha} <span> || Hora: ${eventos[i].hora}</span></p>
                        <div class="card-footer">
                            <span class="card-tag">${eventos[i].precio}</span>
                             <button
                                id="more-information"
                                class="material-symbols-outlined arrow-icon"
                                data-id="${eventos[i].id}">arrow_forward
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }
    this.innerHTML = cards
    }
}

customElements.define("cards-eventos" , CardEvent)



