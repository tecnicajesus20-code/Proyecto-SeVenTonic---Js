const btningreso = document.getElementById("Sign");
const ModalInicioSesion = document.getElementById("modal-inicioseccion")
const btnCerrar = document.getElementById("user-cerrar")
const DatosSesion = document.getElementById("form-evento")
const validoUser = document.getElementById("login")

function Overlay (){
    ModalInicioSesion.classList.remove('none');
    ModalInicioSesion.classList.add("modal-overlay.activo")
}

function cerrar (){
    ModalInicioSesion.classList.remove('modal-overlay.activo');
    ModalInicioSesion.classList.add("none")
}



function validarDatos(evento) {
    evento.preventDefault();
    const correo = document.getElementById("Email").value;
    const password = document.getElementById("Contraseña").value;
    const datos = obtenerUsers()
    if(correo === datos[0].user && password === datos[0].password){
        console.log("Inciando Seccion...")
        window.location.href = "Administracion/Principaladmin.html"
        }
    else {
        console.log("Credenciales incorrectas")
        window.location.href = "index.html";
    }
}

function mostrarEvento(idEvento) {

    const evento = obtenerInfoEvento(idEvento);

    document.getElementById("modal-imagen").src = evento.imagen;
    document.getElementById("modal-nombre").textContent = evento.nombre;
    document.getElementById("modal-ciudad").textContent = evento.ciudad;
    document.getElementById("modal-fecha").textContent = evento.fecha;
    document.getElementById("modal-hora").textContent = evento.hora;
    document.getElementById("modal-precio").textContent = evento.precio;
    document.getElementById("modal-descripcion").textContent = evento.descripcion;

    document.getElementById("modal-info").classList.remove("none");
}



btningreso.addEventListener("click", Overlay)
btnCerrar.addEventListener("click", cerrar)

DatosSesion.addEventListener("submit", validarDatos)
