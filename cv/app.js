/* ============================================
   1. LÓGICA DE LA LANDING PAGE (cv/index.html)
   ============================================ */
function inicializarLandingPage() {
    // Verificamos que estemos en la Landing Page (buscando un ID específico)
    const tarjetaCV = document.getElementById('titulo-servicio-cv');
    if (!tarjetaCV) return; // Si no existe, es porque estamos en otra página

    if (typeof CONFIG === 'undefined') {
        console.error("No se pudo cargar data.js");
        return;
    }

    // Inyectar datos del Currículum
    document.getElementById('titulo-servicio-cv').textContent = CONFIG.servicios.curriculum.nombre;
    document.getElementById('desc-servicio-cv').textContent = CONFIG.servicios.curriculum.descripcion;
    document.getElementById('precio-servicio-cv').textContent = CONFIG.servicios.curriculum.precio_texto;

    // Inyectar datos de la Carta
    document.getElementById('titulo-servicio-carta').textContent = CONFIG.servicios.carta.nombre;
    document.getElementById('desc-servicio-carta').textContent = CONFIG.servicios.carta.descripcion;
    document.getElementById('precio-servicio-carta').textContent = CONFIG.servicios.carta.precio_texto;
}

/* ============================================
   2. SISTEMA DE ALERTAS Y MODALES (Compartido)
   ============================================ */
function mostrarAlerta(mensaje, titulo = "Atención", esError = true) {
    const modal = document.getElementById('modal-alerta');
    if (!modal) return; // Si la página no tiene el modal, usamos alert nativo
    document.getElementById('alerta-titulo').textContent = titulo;
    document.getElementById('alerta-mensaje').textContent = mensaje;

    const icono = document.getElementById('alerta-icono');
    if (esError) {
        icono.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
        icono.style.color = 'var(--error)';
    } else {
        icono.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        icono.style.color = 'var(--exito)';
    }
    modal.classList.add('activo');
}

function cerrarModalAlerta() {
    const modal = document.getElementById('modal-alerta');
    if (modal) modal.classList.remove('activo');
}

function abrirModalPrivacidad() {
    const modal = document.getElementById('modal-privacidad');
    if (!modal) return;
    document.getElementById('texto-privacidad').textContent = CONFIG.legal.texto_politica;
    modal.classList.add('activo');
}

function cerrarModalPrivacidad() {
    const modal = document.getElementById('modal-privacidad');
    if (modal) modal.classList.remove('activo');
}

function abrirModalYaLLeno() {
    const modal = document.getElementById('modal-ya-lleno');
    if (!modal) return;
    modal.classList.add('activo');
    document.querySelectorAll('input[name="motivo"]').forEach(r => {
        r.checked = false;
        r.closest('.opcion-radio').classList.remove('seleccionado');
    });
}

function cerrarModalYaLLeno() {
    const modal = document.getElementById('modal-ya-lleno');
    if (modal) modal.classList.remove('activo');
}

function confirmarModalYaLLeno() {
    const seleccionado = document.querySelector('input[name="motivo"]:checked');
    if (!seleccionado) {
        mostrarAlerta('Por favor selecciona una opción.');
        return;
    }
    let mensaje = '';
    switch (seleccionado.value) {
        case 'pago': mensaje = 'Hola, ya llené el formulario y quiero coordinar el pago de mi servicio.'; break;
        case 'modificar': mensaje = 'Hola, ya llené el formulario y quiero modificar mi servicio.'; break;
        case 'otra': mensaje = 'Hola, quiero hacer una consulta sobre el servicio.'; break;
    }
    cerrarModalYaLLeno();
    abrirWhatsApp(mensaje);
}

/* ============================================
   3. WHATSAPP Y UTILIDADES
   ============================================ */
function abrirWhatsApp(mensaje) {
    const url = `https://wa.me/${CONFIG.whatsapp.numero}?text=${encodeURIComponent(mensaje)}`;
    window.location.href = url;
}

function normalizarIdentificacion(id) {
    return String(id).replace(/[\s\-\.]/g, '').trim().toUpperCase();
}

function soloDigitos(str) {
    return String(str).replace(/\D/g, '');
}

/* ============================================
   4. LÓGICA DEL FORMULARIO DEL CV (Para curriculum/index.html)
   ============================================ */
// Nota: Estas funciones se activarán cuando carguemos el formulario del CV.

function validarYAvanzar(pantalla) {
    // Esta función se expandirá en el archivo de curriculum
    console.log("Validando pantalla: " + pantalla);
}

function recolectarDatos() {
    // Esta función se expandirá en el archivo de curriculum
    return {};
}

async function enviarFormulario() {
    // Esta función se expandirá en el archivo de curriculum
    console.log("Enviando formulario...");
}

/* ============================================
   5. INICIALIZACIÓN
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Intentar inicializar la Landing Page
    inicializarLandingPage();

    // 2. Configurar evento para los radio buttons del Modal "Ya llené antes"
    document.addEventListener('change', (e) => {
        if (e.target.name === 'motivo') {
            document.querySelectorAll('input[name="motivo"]').forEach(r => {
                r.closest('.opcion-radio').classList.toggle('seleccionado', r.checked);
            });
        }
    });
});