class Btnprimario extends HTMLElement {
    constructor(){
        super();
        this.classList.add("btn-primary")
    }
}

customElements.define(
    "btn-primario", Btnprimario

);

    class Sidebar extends HTMLElement {

        connectedCallback() {
            this.innerHTML = `
                <aside class="sidebar">
                    <div class="sidebar-header">
                        <div class="sidebar-logo">
                            <h2 class="footer-logo">SeVenTonic</h2>
                        </div>
    
                        <p class="sidebar-label">ADMIN PANEL</p>
                    </div>
    
                    <nav class="sidebar-nav">
                        <a href="../admin.html">PRINCIPAL</a>
    
                        <a href="gestion-eventos.html">
                            GESTIÓN DE EVENTOS
                        </a>
    
                        <a href="#" class="active">
                            CATEGORÍAS
                        </a>
    
                        <a href="reporte-ventas.html">
                            REGISTRO DE VENTAS
                        </a>
    
                        <a href="#" class="logout" id="btn-cerrar-sesion">
                            CERRAR SESIÓN
                        </a>
                    </nav>
    
                    <div class="sidebar-footer">
                        <div class="sidebar-user">
                            <div class="sidebar-avatar">
                                <img src="" alt="">
                            </div>
    
                            <div>
                                <div class="sidebar-user-name">
                                    Administrador
                                </div>
    
                                <div class="sidebar-user-role"></div>
                            </div>
                        </div>
                    </div>
                </aside>
            `;
        }
    
    }
    
    customElements.define("barra-lateral", Sidebar);


    class headerAdmin extends HTMLElement {

        connectedCallback() {
            this.innerHTML = `
            <section class="header">
            <div>
                <h2 class="header-title">Gestión de Categorías</h2>
                <div class="header-breadcrumb">
                    <span>Admin</span>
                    <span>/</span>
                    <span>Categorías</span>
                </div>
            </div>
            <button class="btn-primary" id="btn-nueva-categoria">
                <span class="material-symbols-outlined">add</span>
                Nueva Categoría
            </button>
        </section>
            `;
        }
    
    }
    
    customElements.define("header-admin", headerAdmin);


    class footeradmin extends HTMLElement {

        connectedCallback() {
            this.innerHTML = `
            <section class="admin-footer">
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
           </section>
            `;
        }
    
    }
    
    customElements.define("footer-admin", footeradmin);