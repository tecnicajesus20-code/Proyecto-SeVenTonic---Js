class Btnprimario extends HTMLElement {
    constructor(){
        super();
        this.classList.add("btn-primary")
    }
}

customElements.define(
    "btn-primario", Btnprimario

);

class BtnSecundario extends HTMLElement {
    constructor(){
        super();
        this.classList.add("btn-submit")
    }
}

customElements.define(
    "btn-secundario", BtnSecundario
);
customElements.get("btn-secundario")
class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <section class="header">
                <div>
                <h2 class="header-title">Administración</h2>
                <div class="header-breadcrumb">
                    <span>Admin</span>
                    <span>/</span>
                    <span>Categorías</span>
                </div>
            </div>
               <a href="gestion-eventos.html">
                 <btn-primario  id="btn-nueva-categoria">
                    <span class="material-symbols-outlined"><img src="" alt=""></span>
                    NEW EVENT
                </btn-primario>
               </a>
        </section>
        `;
    }
}

customElements.define(
    "header-admin", Header
);

class Sidebar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
          <aside class="sidebar">
        <div class="sidebar-header">
            <span class="sidebar-logo material-symbols-outlined">
                <h2 class="footer-logo">SeVenTonic</h2>
            </span>
            <p class="sidebar-label">ADMIN PANEL</p>
        </div>
        <nav class="sidebar-nav">
            <a href="Principaladmin.html">
                <span class="material-symbols-outlined"></span>
                PRINCIPAL
            </a>
            <a href="gestion-eventos.html">
                <span class="material-symbols-outlined"></span>
                GESTIÓN DE EVENTOS
            </a>
            <a href="Categorias.html">
                <span class="material-symbols-outlined"></span>
                CATEGORÍAS
            </a>
            <a href="Reporte-ventas.html">
                <span class="material-symbols-outlined"></span>
                REGISTRO DE VENTAS
            </a>
            <a href="../index.html" class="logout" id="btn-cerrar-sesion">
                <span class="material-symbols-outlined"></span>
                CERRAR SESIÓN
            </a>
        </nav>
        <div class="sidebar-footer">
            <div class="sidebar-user">
                <div class="sidebar-avatar">
                    <img src="" alt="">
                </div>
                <div>
                    <div class="sidebar-user-name">Administrador</div>
                    <div class="sidebar-user-role"></div>
                </div>
            </div>
        </div>
    </aside>
        `;
    }
}

customElements.define(
    "barra-lateral-admin", Sidebar
);


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
                        <li><a href="#" class="footer-link">Privacy
                                Policy</a></li>
                        <li><a href="#" class="footer-link">Terms of
                                Service</a></li>
                    </ul>
                </div>
                <div>
                    <h5 class="footer-title">Soporte</h5>
                    <ul class="footer-links">
                        <li><a href="#" class="footer-link">Help
                                Center</a></li>
                        <li><a href="#" class="footer-link">Newsletter</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h5 class="footer-title">Estado del Sistema</h5>
                    <div class="footer-status">
                        <div class="footer-status-dot">
                        </div>
                        <span class="footer-status-text">Servidores
                            Operativos</span>
                    </div>
                </div>
            </div>
<<<<<<< HEAD
           </section>
            `;
        }
    
    }
    
    customElements.define("footer-admin", footeradmin);
=======
        </footer>
        `;
    }
}

customElements.define(
    "footer-admin", footer
);
>>>>>>> 5493e649491944226bfd6b9d1dc081f977e3d1a0
