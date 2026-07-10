const formbuzon = document.getElementById("modal-sugerencias");
const btnBuzon = document.getElementById("sugerencias");
const btnCerrarBuzon = document.getElementById("cerrar");
const infSugerencias = document.getElementById("form-sugerencias");



function OverlayBuzon (){
    formbuzon.classList.remove('none');
    formbuzon.classList.add("activo");
};

function cerrarBuzon (){
        console.log("Cerrando buzón");

    formbuzon.classList.remove('activo');
    formbuzon.classList.add("none" );
};
function TraersugerenciasUsers (e){
    e.preventDefault();

    const newsugerencias = ObtenerSugerencias();
    const formulario = new FormData(e.target);
    const datos  = {
        "id": Date.now(),
        "fecha": new Date().toISOString(),
        ...Object.fromEntries(formulario.entries())
    };
    newsugerencias.push(datos)
    GuardarSugerencias(newsugerencias);
    
    e.target.reset();
    cerrarBuzon();
}

infSugerencias.addEventListener("submit", TraersugerenciasUsers)

btnBuzon.addEventListener("click", OverlayBuzon)
btnCerrarBuzon.addEventListener("click", cerrarBuzon)



function PintarSugerencias (){
    data = ObtenerSugerencias()
    const tbody = document.getElementById("tabla-suggestions")

    tbody.innerHTML= "";

    data.forEach(sugerencia => {
        const fila = document.createElement("tr");

       fila.innerHTML = `
            <td>${sugerencia.fecha}</td>
            <td>${sugerencia.id}</td>
            <td>${sugerencia.nombre}</td>
            <td>${sugerencia.correo}</td>
            <td>${sugerencia.mensaje}</td>
            <td class="text-right">
                <button>Contactar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });

}

function inicializarSuggets (){
    
    PintarSugerencias()
    console.log("sugerencias cargadas")
};

inicializarSuggets();