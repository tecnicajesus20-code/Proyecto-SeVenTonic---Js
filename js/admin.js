const btningreso = document.getElementById("Sign");
const ModalInicioSesion = document.getElementById("modal-inicioseccion")
const btnCerrar = document.getElementById("user-cerrar")
const DatosSesion = document.getElementById("form-evento")
const validoUser = document.getElementById("login")
const moreinf = document.getElementById("modal-info")
const btnmoreInf = document.querySelectorAll(".arrow-icon")
const btnCrrInf = document.getElementById("btncerrar")
const cntdTickets = document.getElementById("input");
const Facturacion = document.getElementById("modal-compra")
const btnfacturacion = document.getElementById("btn-comprar")
const btncerrarFactura = document.getElementById("cerrar-fact");
const formulario = document.getElementById("modal-formulario");
const contenido = document.querySelector("#modal-info .modal-contenido");
const informacion = document.querySelector("#modal-info .card-body");
const btnCompra = document.getElementById("btnfinal");
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














////////////////////////////////////////////////////////////////////////////////////////
function OverlayModalSesion (){
    ModalInicioSesion.classList.remove('none');
    ModalInicioSesion.classList.add("activo");
};

function cerrarModalSesion (){
    ModalInicioSesion.classList.remove('activo');
    ModalInicioSesion.classList.add("none");
};

function validarDatos(evento) {
    evento.preventDefault();
    const correo = document.getElementById("Email").value;
    const password = document.getElementById("Contraseña").value;
    const datos = obtenerUsers();
    if(correo === datos[0].user && password === datos[0].password){
        alert("Inciando Seccion...");
        window.location.href = "Administracion/Principaladmin.html";
        }
    else {
        alert("Credenciales incorrectas... SI NO ES ADMINISTRADOR EVITE INTENTARLO");
        cerrarModalSesion();
    }
};


let precioUnitario = 0;

function MostrarMasInformacion(informacionEventos) {
    const img = document.getElementById("modal-imagen");
    const title = document.getElementById("modal-nombre");
    const city = document.getElementById("modal-ciudad");
    const dates = document.getElementById("modal-fecha");
    const hour = document.getElementById("modal-hora");
    const description = document.getElementById("modal-descripcion");
    const price = document.getElementById("modal-precio");
    img.src = informacionEventos.imagen;
    title.textContent = informacionEventos.nombre;
    city.textContent = informacionEventos.ciudad;
    dates.textContent = informacionEventos.fecha;
    hour.textContent = informacionEventos.hora;
    description.textContent = informacionEventos.descripcion;
    price.textContent = informacionEventos.precio;

    ///////////////////////// PRECIO ////////////////
    precioUnitario = Number(informacionEventos.precio);
    document.getElementById("modal-precio").textContent = precioUnitario;

};
let eventoSeleccionado = null;  
 
function OverlayModalinf(e){

    moreinf.classList.remove('none');
    moreinf.classList.add("activo");

    const idEvento = Number(e.currentTarget.dataset.id);

    eventoSeleccionado = obtenerinfoenEvento(idEvento);

    console.log(eventoSeleccionado);

    MostrarMasInformacion(eventoSeleccionado);
}

function cerrarModalinf (){
    moreinf.classList.remove('activo');
    moreinf.classList.add("none");
};
function Precio() {
    const price = document.getElementById("modal-precio");
    const cantidad = Number(cntdTickets.value);

    const totalPrecio = precioUnitario * cantidad;

    price.textContent = `$${totalPrecio.toLocaleString("es-CO")}`;

    return totalPrecio;
}
function mostrarFormularioCompra() {
    formulario.classList.remove("none");
    contenido.classList.add("modal-compra");
    informacion.classList.add("info-compra");
    btnfacturacion.style.display = "none";
}

function cerrarModalinf() {

    moreinf.classList.remove("activo");
    moreinf.classList.add("none");

    formulario.classList.add("none");

    contenido.classList.remove("modal-compra");

    informacion.classList.remove("info-compra");

    btnfacturacion.style.display = "inline-flex";

}
function registrarVenta() {

    const confirmar = confirm("¿Desea confirmar la compra?");

    if(!confirmar){
        return;
    }

    const ventas = obtenerVentas();

    const nuevaVenta = {
        id: ventas.length > 0
            ? ventas[ventas.length - 1].id + 1
            : 1001,

        fecha: new Date().toISOString(),

        cliente:{
            identificacion: document.getElementById("identificacion").value,
            nombre: document.getElementById("nombre").value,
            direccion: document.getElementById("direccion").value,
            telefono: document.getElementById("telefono").value,
            email: document.getElementById("email").value
        },

        ciudad: eventoSeleccionado.ciudad,

        items:[
            {
                id:eventoSeleccionado.id,
                nombre:eventoSeleccionado.nombre,
                precio:eventoSeleccionado.precio,
                cantidad:Number(cntdTickets.value)
            }
        ],

        total:eventoSeleccionado.precio * Number(cntdTickets.value)
    };


    ventas.push(nuevaVenta);

    guardarVentas(ventas);

    console.log(obtenerVentas());

    alert("Compra realizada correctamente");
}

btningreso.addEventListener("click", OverlayModalSesion);
btnCerrar.addEventListener("click", cerrarModalSesion) ;
DatosSesion.addEventListener("submit", validarDatos);


btnfacturacion.addEventListener("click", mostrarFormularioCompra);

btnCompra.addEventListener("click" , registrarVenta);

btnmoreInf.forEach(boton => {
    boton.addEventListener("click", OverlayModalinf);
});

btnCrrInf.addEventListener("click", cerrarModalinf);

cntdTickets.addEventListener("input" , Precio);