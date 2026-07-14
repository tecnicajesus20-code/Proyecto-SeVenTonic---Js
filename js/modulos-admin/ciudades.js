const NewCiudades = document.getElementById("modal-ciudades");
const btnabrir = document.getElementById("btn-crear-ciudad");
const Cerrar = document.getElementById("cerrar");
const AgregarCiudad = document.getElementById("form-ciudades");
const tbody = document.getElementById("tabla-citys");
const btnEditar = document.getElementById("form-editar")
const btncerrarEditar = document.getElementById("editarcerrar");

// //////////////////////////////////////////
// CIUDADES
// ////////////////////////////

function Overlaycity (){
    NewCiudades.classList.remove('none');
    NewCiudades.classList.add("activo");
};

function cerrarModalCiudad (){
    console.log("Cerrando buzón");

    NewCiudades.classList.remove('activo');
    NewCiudades.classList.add("none" );
};

function cerrarmodalEditar (){
    edit.classList.remove("activo");
    edit.classList.add("none")
}


btnabrir.addEventListener("click", Overlaycity)
Cerrar.addEventListener("click", cerrarModalCiudad)

function PintarTabla (){
    data = ObtenerCiudades() || [];
    const tbody = document.getElementById("tabla-citys")

    tbody.innerHTML= "";

    data.forEach(ciudad => {
        const fila = document.createElement("tr");

       fila.innerHTML = `
            <td>${ciudad.id}</td>
            <td>${ciudad.fecha}</td>
            <td>${ciudad.nombre}</td>
            <td class="text-right">
                <button class="btn-editar" data-id="${ciudad.id}">
                    <span class="material-symbols-outlined">edit</span>
                 </button>
                <button class="btn-eliminar" data-id="${ciudad.id}">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </td>
        `;
        tbody.appendChild(fila);
      
    });

}

//CRUD

function crearCiudad(e){
    e.preventDefault();

    const newcitys = ObtenerCiudades();
    const formulario = new FormData(e.target);
    const datos  = {
        "fecha": new Date().toISOString(),
        ...Object.fromEntries(formulario.entries())
    };
    newcitys.push(datos)
    GuardarCiudades(newcitys);
    
    e.target.reset();
    PintarTabla()
    cerrarModalCiudad();
}
function inicializarCiudades (){
    PintarTabla()
    console.log("ciudades cargadas")
};


AgregarCiudad.addEventListener("submit", crearCiudad)





function eliminarCiudad(id){
    const ciudades = ObtenerCiudades();
    const nuevasCiudades = ciudades.filter(ciudad => ciudad.id != id);
    GuardarCiudades(nuevasCiudades);
    PintarTabla();
}
const edit = document.getElementById("modal-editar");

function editarCiudad(id) {

    const ciudades = ObtenerCiudades();

    ciudadEditando = ciudades.find(ciudad => ciudad.id == id);

    if (!ciudadEditando) return;

    document.getElementById("idEDITABLE").value = ciudadEditando.id;
    document.getElementById("EditarCiudad").value = ciudadEditando.nombre;

    edit.classList.remove("none");
    edit.classList.add("activo");

}

function guardarEdicion(e) {
    e.preventDefault();

    const ciudades = ObtenerCiudades();

    const ciudad = ciudades.find(c => c.id == ciudadEditando.id);

    if (!ciudad) return;

    ciudad.id = document.getElementById("idEDITABLE").value.trim();
    ciudad.nombre = document.getElementById("EditarCiudad").value.trim().toUpperCase();
    ciudad.fecha = new Date().toISOString();

    GuardarCiudades(ciudades);

    PintarTabla();
    
    cerrarmodalEditar();
}



function accionesTabla(e){

    const boton = e.target.closest("button");

    if(!boton) return;

    const id = boton.dataset.id;

    if(boton.classList.contains("btn-editar")){
        editarCiudad(id);
    }

    if(boton.classList.contains("btn-eliminar")){
        eliminarCiudad(id);
    }

}






tbody.addEventListener("click", accionesTabla);

btncerrarEditar.addEventListener("click", cerrarmodalEditar)



btnEditar.addEventListener("submit", guardarEdicion)




inicializarCiudades();
