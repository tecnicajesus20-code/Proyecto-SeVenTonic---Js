/**
 * ============================================================
 * ARCHIVO: reporte-ventas.js (VERSIÓN OPTIMIZADA)
 * PROPÓSITO: Controlar la página de "Reporte de Ventas"
 * ============================================================
 * 
 * ¿Qué hace?
 * 1. Muestra métricas: total ventas, ingresos, tickets y ticket promedio.
 * 2. Lista ventas en tabla con paginación (10 por página).
 * 3. Filtra por búsqueda (cliente/evento) y por ciudad.
 * 4. Actualiza todo dinámicamente al filtrar.
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. REFERENCIAS A ELEMENTOS DEL DOM
    // ============================================================
    const $ = (id) => document.getElementById(id);
    const totalVentasEl = $('total-ventas');
    const totalIngresosEl = $('total-ingresos');
    const totalTicketsEl = $('total-tickets');
    const ticketPromedioEl = $('ticket-promedio');
    const tablaBody = $('tabla-ventas-body');
    const buscador = $('buscador-ventas');
    const filtroCiudad = $('filtro-ciudad-ventas');
    const infoVentas = $('info-ventas');
    const paginaActualSpan = $('pagina-actual');
    const btnAnterior = $('btn-anterior');
    const btnSiguiente = $('btn-siguiente');

    // ============================================================
    // 2. ESTADO Y CONSTANTES
    // ============================================================
    let todasLasVentas = [];
    let ventasFiltradas = [];
    let paginaActual = 1;
    const POR_PAGINA = 10;

    // ============================================================
    // 3. FUNCIONES AUXILIARES (helpers)
    // ============================================================
    const obtenerNombreEvento = (id) => {
        const eventos = obtenerEventos(); // de storage.js
        const evento = eventos.find(e => e.id === id);
        return evento?.nombre || 'Evento desconocido';
    };

    const formatearFecha = (fechaISO) => {
        if (!fechaISO) return '--/--/----';
        const f = new Date(fechaISO);
        return `${String(f.getDate()).padStart(2, '0')}/${String(f.getMonth() + 1).padStart(2, '0')}/${f.getFullYear()} ${String(f.getHours()).padStart(2, '0')}:${String(f.getMinutes()).padStart(2, '0')}`;
    };

    const formatearMoneda = (valor) =>
        valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });

    const mostrarToast = (mensaje, tipo = 'info') => {
        const toastAnterior = document.querySelector('.toast');
        if (toastAnterior) toastAnterior.remove();
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
    // 4. MÉTRICAS
    // ============================================================
    const calcularMetricas = (ventas) => {
        const totalVentas = ventas.length;
        const ingresosNetos = ventas.reduce((sum, v) => sum + (v.total || 0), 0);
        const totalTickets = ventas.reduce((sum, v) =>
            sum + (v.items?.reduce((s, item) => s + (item.cantidad || 0), 0) || 0), 0);
        const ticketPromedio = totalTickets > 0 ? ingresosNetos / totalTickets : 0;
        return { totalVentas, ingresosNetos, totalTickets, ticketPromedio };
    };

    const actualizarMetricas = (ventas) => {
        const m = calcularMetricas(ventas);
        totalVentasEl.textContent = m.totalVentas;
        totalIngresosEl.textContent = formatearMoneda(m.ingresosNetos);
        totalTicketsEl.textContent = m.totalTickets;
        ticketPromedioEl.textContent = formatearMoneda(m.ticketPromedio);
    };

    // ============================================================
    // 5. FILTROS
    // ============================================================
    const obtenerCiudadesUnicas = (ventas) =>
        [...new Set(ventas.map(v => v.ciudad).filter(Boolean))].sort();

    const llenarFiltroCiudades = (ventas) => {
        filtroCiudad.innerHTML = '<option value="">Todas las ciudades</option>';
        obtenerCiudadesUnicas(ventas).forEach(ciudad => {
            const option = document.createElement('option');
            option.value = ciudad;
            option.textContent = ciudad;
            filtroCiudad.appendChild(option);
        });
    };

    const aplicarFiltros = () => {
        const texto = buscador.value.trim().toLowerCase();
        const ciudad = filtroCiudad.value;

        ventasFiltradas = todasLasVentas.filter(venta => {
            if (ciudad && venta.ciudad !== ciudad) return false;
            if (!texto) return true;

            const cliente = (venta.cliente?.nombre || '').toLowerCase();
            const eventos = venta.items?.map(item => obtenerNombreEvento(item.id).toLowerCase()).join(' ') || '';
            return cliente.includes(texto) || eventos.includes(texto);
        });

        paginaActual = 1;
    };

    // ============================================================
    // 6. RENDERIZADO DE TABLA (con paginación)
    // ============================================================
    const renderizarTabla = () => {
        const inicio = (paginaActual - 1) * POR_PAGINA;
        const ventasPagina = ventasFiltradas.slice(inicio, inicio + POR_PAGINA);

        if (ventasPagina.length === 0) {
            tablaBody.innerHTML = `<tr><td colspan="6" style="padding:40px;text-align:center;color:var(--sobre-superficie-variante);">No hay ventas para mostrar.</td></tr>`;
            return;
        }

        tablaBody.innerHTML = ventasPagina.map(venta => {
            const eventosStr = venta.items?.map(item => obtenerNombreEvento(item.id)).join(', ') || 'Sin eventos';
            return `
                <tr>
                    <td>${formatearFecha(venta.fecha)}</td>
                    <td>${venta.cliente?.nombre || 'Cliente desconocido'}</td>
                    <td>${eventosStr}</td>
                    <td>${venta.ciudad || 'Sin ciudad'}</td>
                    <td>${formatearMoneda(venta.total || 0)}</td>
                    <td style="text-align:right;">
                        <button class="btn-ver-detalle" data-id="${venta.id}" title="Ver detalle">
                            <span class="material-symbols-outlined" style="font-size:20px;color:var(--primario-fijo-tenue);">visibility</span>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

        const total = ventasFiltradas.length;
        const totalPaginas = Math.ceil(total / POR_PAGINA);
        infoVentas.textContent = `Mostrando ${ventasPagina.length} de ${total} ventas`;
        paginaActualSpan.textContent = `Página ${paginaActual} de ${totalPaginas || 1}`;
        btnAnterior.disabled = paginaActual <= 1;
        btnSiguiente.disabled = paginaActual >= totalPaginas || totalPaginas === 0;
    };

    // ============================================================
    // 7. ACTUALIZAR VISTA COMPLETA
    // ============================================================
    const actualizarVista = () => {
        aplicarFiltros();
        actualizarMetricas(ventasFiltradas);
        renderizarTabla();
    };

    // ============================================================
    // 8. EVENT LISTENERS
    // ============================================================
    buscador.addEventListener('input', actualizarVista);
    filtroCiudad.addEventListener('change', actualizarVista);
    btnAnterior.addEventListener('click', () => { if (paginaActual > 1) { paginaActual--; renderizarTabla(); } });
    btnSiguiente.addEventListener('click', () => {
        const totalPaginas = Math.ceil(ventasFiltradas.length / POR_PAGINA);
        if (paginaActual < totalPaginas) { paginaActual++; renderizarTabla(); }
    });

    // Detalle de venta (delegación)
    tablaBody.addEventListener('click', (e) => {
        const boton = e.target.closest('.btn-ver-detalle');
        if (!boton) return;
        const venta = todasLasVentas.find(v => v.id == boton.dataset.id);
        if (!venta) return mostrarToast('Venta no encontrada.', 'error');

        const items = venta.items?.map(item =>
            `\n- ${obtenerNombreEvento(item.id)} x${item.cantidad} (${formatearMoneda(item.precio)} c/u)`
        ).join('') || ' Sin productos';

        alert(`📋 DETALLE DE VENTA\n\nCliente: ${venta.cliente?.nombre || 'Desconocido'}\nFecha: ${formatearFecha(venta.fecha)}\nCiudad: ${venta.ciudad || 'Sin ciudad'}\nTotal: ${formatearMoneda(venta.total || 0)}\n\nProductos:${items}`);
    });

    // ============================================================
    // 9. INICIALIZACIÓN
    // ============================================================
    const inicializar = () => {
        console.log('Cargando reporte de ventas...');
        todasLasVentas = obtenerVentas(); // de storage.js
        llenarFiltroCiudades(todasLasVentas);
        if (todasLasVentas.length === 0) mostrarToast('No hay ventas registradas.', 'info');
        actualizarVista();
        console.log('✅ Listo.');
    };

    inicializar();
});