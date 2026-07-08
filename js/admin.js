const btningreso = document.getElementById("Sign");
const ModalInicioSesion = document.getElementById("modal-inicioseccion")
const btnCerrar = document.getElementById("user-cerrar")
const DatosSesion = document.getElementById("form-evento")
const validoUser = document.getElementById("login")
const moreinf = document.getElementById("modal-info")
const btnmoreInf = document.querySelectorAll(".arrow-icon")
const btnCrrInf = document.getElementById("cerrar-modal")
const cntdTickets = document.getElementById("input");
const Facturacion = document.getElementById("modal-compra")
const btnfacturacion = document.getElementById("btn-comprar")
const btncerrarFactura = document.getElementById("cerrar-fact");
const formulario = document.getElementById("modal-formulario");
const contenido = document.querySelector("#modal-info .modal-contenido");
const informacion = document.querySelector("#modal-info .card-body");
const btnCompra = document.getElementById("btnfinal");
const formbuzon = document.getElementById("modal-sugerencias");
const btnBuzon = document.getElementById("sugerencias")


function OverlayBuzon (){
    formbuzon.classList.remove('none');
    formbuzon.classList.add("activo");
};

function cerrarBuzon (){
    formbuzon.classList.remove('activo');
    formbuzon.classList.add("none");
};

btnBuzon.addEventListener("click", OverlayBuzon)
.addEventListener("click", cerrarBuzon)


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



btningreso.addEventListener("click", OverlayModalSesion)
btnCerrar.addEventListener("click", cerrarModalSesion) 
DatosSesion.addEventListener("submit", validarDatos)



btnmoreInf.forEach(boton => {
    boton.addEventListener("click", OverlayModalinf);
});
btnCrrInf.addEventListener("click", cerrarModalinf)

cntdTickets.addEventListener("input" , Precio)



btnfacturacion.addEventListener("click", mostrarFormularioCompra);

btnCompra.addEventListener("click" , registrarVenta)

