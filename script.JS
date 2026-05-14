/* ============================
MENSAJES BONITOS (GLOBAL)
============================ */
function mostrarMensaje(texto, color) {
const msg = document.createElement("div");
msg.innerText = texto;
msg.style.background = color;
msg.style.color = "white";
msg.style.padding = "10px";
msg.style.position = "fixed";
msg.style.top = "20px";
msg.style.right = "20px";
msg.style.borderRadius = "5px";
msg.style.zIndex = "1000";


document.body.appendChild(msg);

setTimeout(() => msg.remove(), 3000);


}

/* ============================
REGISTRO (MULTI-USUARIOS)
============================ */
if (document.getElementById("formRegistro")) {


const formRegistro = document.getElementById("formRegistro");
const mensaje = document.getElementById("mensaje");

formRegistro.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const usuarioCorreo = document.getElementById("correoUsuario").value;
    const correo = usuarioCorreo + "@dcamps.com";
    const password = document.getElementById("password").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Validar duplicados (ignora mayúsculas)
    const existe = usuarios.find(
        u => u.correo.toLowerCase() === correo.toLowerCase()
    );

    if (existe) {
        mostrarMensaje("Este correo ya está registrado", "red");
        return;
    }

    // Validar contraseña
    if (password.length < 6) {
        mostrarMensaje("La contraseña debe tener mínimo 6 caracteres", "orange");
        return;
    }

    // Guardar usuario
    usuarios.push({ nombre, correo, password });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mostrarMensaje("Registro exitoso ✔", "green");

    formRegistro.reset();
});


}

/* ============================
LOGIN
============================ */
if (document.getElementById("formLogin")) {


const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", function(e) {
    e.preventDefault();

    const correo = document.getElementById("loginCorreo").value;
    const password = document.getElementById("loginPassword").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(
        u => u.correo === correo && u.password === password
    );

    if (usuario) {
        // Guardar sesión
        sessionStorage.setItem("usuarioActivo", JSON.stringify(usuario));

        mostrarMensaje("Bienvenido " + usuario.nombre, "green");

        mostrarDashboard();

        function mostrarUsuarioActivo() {
        const usuario = JSON.parse(sessionStorage.getItem("usuarioActivo"));

        if (usuario && document.getElementById("usuarioActivo")) {
        document.getElementById("usuarioActivo").innerText =
            "👤 " + usuario.nombre;
        }
}

    } else {
        mostrarMensaje("Correo o contraseña incorrectos", "red");
    }
});


}

/* ============================
DASHBOARD
============================ */
function mostrarDashboard() {
const usuario = JSON.parse(sessionStorage.getItem("usuarioActivo"));

if (!usuario) return;

if (document.getElementById("Dashboard")) {
    document.getElementById("Dashboard").style.display = "block";
}

if (document.getElementById("Login")) {
    document.getElementById("Login").style.display = "none";
}

if (document.getElementById("Registro")) {
    document.getElementById("Registro").style.display = "none";
}

if (document.getElementById("bienvenida")) {
    document.getElementById("bienvenida").innerText =
        "Bienvenido, " + usuario.nombre;
}
}

/* ============================
   USUARIO ACTIVO (HEADER)
============================ */
function mostrarUsuarioActivo() {
    const usuario = JSON.parse(sessionStorage.getItem("usuarioActivo"));

    if (usuario && document.getElementById("usuarioActivo")) {
        document.getElementById("usuarioActivo").innerText =
            "👤 " + usuario.nombre;
    }
}



/* ============================
LOGOUT
============================ */
if (document.getElementById("logout")) {
document.getElementById("logout").addEventListener("click", function() {
sessionStorage.removeItem("usuarioActivo");


    mostrarMensaje("Sesión cerrada", "blue");

    location.reload();
});


}

/* ============================
VERIFICAR SESIÓN AL CARGAR
============================ */
window.addEventListener("load", function() {
    const usuario = sessionStorage.getItem("usuarioActivo");

    // Mostrar usuario SIEMPRE
    mostrarUsuarioActivo();

    // Mostrar dashboard SOLO si existe
    if (usuario) {
        mostrarDashboard();
    }
});


