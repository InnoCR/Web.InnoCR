/* ============================================
   InnoCR — app.js (GLOBAL)
   Compartido por: landing, curriculum, recomendación
   ============================================ */

/* ============================================
   1. LÓGICA DE LA LANDING PAGE (cv/index.html)
   ============================================ */
function inicializarLandingPage() {
    const tarjetaCV = document.getElementById('titulo-servicio-cv');
    if (!tarjetaCV) return; // Si no existe, no estamos en la landing

    if (typeof CONFIG === 'undefined') {
        console.error("No se pudo cargar data.js. Verifica la ruta.");
        return;
    }

    document.getElementById('titulo-servicio-cv').textContent = CONFIG.servicios.curriculum.nombre;
    document.getElementById('desc-servicio-cv').textContent = CONFIG.servicios.curriculum.descripcion;
    document.getElementById('precio-servicio-cv').textContent = CONFIG.servicios.curriculum.precio_texto;

    document.getElementById('titulo-servicio-carta').textContent = CONFIG.servicios.carta.nombre;
    document.getElementById('desc-servicio-carta').textContent = CONFIG.servicios.carta.descripcion;
    document.getElementById('precio-servicio-carta').textContent = CONFIG.servicios.carta.precio_texto;

    const anioSpan = document.getElementById('anio-actual');
    if (anioSpan) anioSpan.textContent = new Date().getFullYear();
}

/* ============================================
   2. SISTEMA DE MODALES Y ALERTAS
   ============================================ */
function mostrarAlerta(mensaje, titulo = "Atención", esError = true) {
    const modal = document.getElementById('modal-alerta');
    if (!modal) {
        alert(titulo + ": " + mensaje);
        return;
    }

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

    if (typeof CONFIG !== 'undefined' && CONFIG.legal) {
        document.getElementById('texto-privacidad').textContent = CONFIG.legal.texto_politica;
    }

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
        mostrarAlerta('Por favor selecciona una opción antes de continuar.');
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
   3. UTILIDADES GENERALES
   ============================================ */
function abrirWhatsApp(mensaje) {
    if (typeof CONFIG === 'undefined' || !CONFIG.whatsapp) {
        console.error("Falta la configuración de WhatsApp en data.js");
        return;
    }
    const url = `https://wa.me/${CONFIG.whatsapp.numero}?text=${encodeURIComponent(mensaje)}`;
    // Abrir en nueva pestaña para no perder el contexto del sitio
    window.open(url, '_blank', 'noopener,noreferrer');
}

function normalizarIdentificacion(id) {
    return String(id).replace(/[\s\-\.]/g, '').trim().toUpperCase();
}

function soloDigitos(str) {
    return String(str).replace(/\D/g, '');
}

function getVal(id) {
    const el = document.getElementById(id);
    return el ? String(el.value).trim() : '';
}

function marcarError(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('error');
}

function limpiarError(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('error');
}

function debounce(fn, ms) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), ms);
    };
}

function activarSoloDigitos() {
    document.addEventListener('input', (e) => {
        const el = e.target;
        if (el.matches('input[inputmode="numeric"], input[type="tel"]')) {
            const limpio = el.value.replace(/\D/g, '');
            if (el.value !== limpio) el.value = limpio;
        }
    });
}

/* ============================================
   4. HELPERS DE FECHAS Y SELECTS
   ============================================ */
const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

function opcionesMes() {
    let html = '<option value="">Mes</option>';
    MESES.forEach((m, i) => {
        const val = String(i + 1).padStart(2, '0');
        html += `<option value="${val}">${m}</option>`;
    });
    return html;
}

function opcionesAnioInicio() {
    const actual = new Date().getFullYear();
    let html = '<option value="">Año</option>';
    for (let y = actual; y >= 1950; y--) html += `<option value="${y}">${y}</option>`;
    return html;
}

function opcionesAnioFin() {
    const actual = new Date().getFullYear();
    let html = '<option value="">Año</option>';
    for (let y = actual + 5; y >= 1950; y--) html += `<option value="${y}">${y}</option>`;
    return html;
}

function formatoMesAnio(mes, anio) {
    if (!mes && !anio) return '';
    if (mes && anio) return `${MESES[parseInt(mes, 10) - 1]} ${anio}`;
    if (anio) return anio;
    return MESES[parseInt(mes, 10) - 1];
}

function formatoFechaNac(dia, mes, anio) {
    if (!dia || !mes || !anio) return '';
    return `${dia}/${mes}/${anio}`;
}

function poblarSelect(select, opciones) {
    if (!select) return;
    select.innerHTML = '';
    opciones.forEach(o => {
        const opt = document.createElement('option');
        opt.value = o.value;
        opt.textContent = o.label;
        select.appendChild(opt);
    });
}

/* ============================================
   5. REGISTRO DE CALLBACKS
   ============================================ */
const Callbacks = {
    guardar: null,
    mostrarToast: null
};

function registrarCallbackGuardado(fn) {
    Callbacks.guardar = fn;
}

function registrarCallbackToast(fn) {
    Callbacks.mostrarToast = fn;
}

function invocarGuardado() {
    if (typeof Callbacks.guardar === 'function') Callbacks.guardar();
}

function mostrarToastGuardado() {
    if (typeof Callbacks.mostrarToast === 'function') Callbacks.mostrarToast();
}

/* ============================================
   6. HELPERS DE BLOQUES DINÁMICOS
   ============================================ */
function moverBloque(id, direccion) {
    const bloque = document.getElementById(id);
    if (!bloque) return;
    const padre = bloque.parentNode;

    if (direccion === 'up') {
        const anterior = bloque.previousElementSibling;
        if (anterior && anterior.classList.contains('bloque')) {
            padre.insertBefore(bloque, anterior);
        }
    } else {
        const siguiente = bloque.nextElementSibling;
        if (siguiente && siguiente.classList.contains('bloque')) {
            padre.insertBefore(siguiente, bloque);
        }
    }

    invocarGuardado();
}

function eliminarBloque(id) {
    const bloque = document.getElementById(id);
    if (bloque) {
        bloque.remove();
        invocarGuardado();
    }
}

function generarAccionesBloque(id) {
    return `
    <div class="bloque-acciones">
      <button type="button" class="btn-accion btn-mover" onclick="moverBloque('${id}', 'up')" title="Mover arriba"><i class="fa-solid fa-arrow-up"></i></button>
      <button type="button" class="btn-accion btn-mover" onclick="moverBloque('${id}', 'down')" title="Mover abajo"><i class="fa-solid fa-arrow-down"></i></button>
      <button type="button" class="btn-accion btn-eliminar" onclick="eliminarBloque('${id}')" title="Eliminar"><i class="fa-solid fa-xmark"></i></button>
    </div>
  `;
}

/* ============================================
   7. TOAST DE GUARDADO
   ============================================ */
function mostrarToast(mensaje = 'Borrador guardado ✓') {
    let toast = document.getElementById('toast-guardado');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-guardado';
        toast.className = 'toast-guardado';
        document.body.appendChild(toast);
    }
    toast.textContent = mensaje;
    toast.classList.add('visible');

    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.classList.remove('visible');
    }, 1800);
}

/* ============================================
   8. GOOGLE TAG MANAGER Y COOKIES
   ============================================ */

// Estado interno del consentimiento
const COOKIE_CONSENT = {
    GRANTED: 'granted',
    DENIED: 'denied'
};

// Devuelve la decisión guardada, o null si no hay
function getConsentDecision() {
    try {
        const key = (typeof CONFIG !== 'undefined' && CONFIG.analytics && CONFIG.analytics.ls_key_consent)
            ? CONFIG.analytics.ls_key_consent
            : 'innocr_cookies_consent_v1';
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return (parsed && (parsed.decision === COOKIE_CONSENT.GRANTED || parsed.decision === COOKIE_CONSENT.DENIED))
            ? parsed.decision
            : null;
    } catch (e) {
        return null;
    }
}

// Guarda la decisión
function saveConsentDecision(decision) {
    try {
        const key = (typeof CONFIG !== 'undefined' && CONFIG.analytics && CONFIG.analytics.ls_key_consent)
            ? CONFIG.analytics.ls_key_consent
            : 'innocr_cookies_consent_v1';
        localStorage.setItem(key, JSON.stringify({
            decision: decision,
            timestamp: Date.now()
        }));
    } catch (e) {
        console.warn('No se pudo guardar la decisión de cookies:', e);
    }
}

// Carga Google Tag Manager dinámicamente (solo si hay consentimiento)
function cargarGTM() {
    if (typeof CONFIG === 'undefined' || !CONFIG.analytics || !CONFIG.analytics.gtm_id) {
        console.warn('GTM ID no configurado en data.js');
        return;
    }

    const gtmId = CONFIG.analytics.gtm_id;

    // Evitar cargar dos veces
    if (document.getElementById('gtm-script')) return;

    // Inicializar dataLayer + gtag antes de cargar GTM
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('consent', 'update', {
        analytics_storage: 'granted'
    });

    // Inyectar el script de GTM
    const script = document.createElement('script');
    script.id = 'gtm-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    document.head.appendChild(script);
}

// Muestra el banner si no hay decisión guardada
function mostrarCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;

    // Si ya hay decisión guardada, no mostrar
    if (getConsentDecision() !== null) return;

    // Mostrar con animación
    setTimeout(() => {
        banner.classList.add('visible');
    }, 300);
}

// Se llama al hacer clic en "Aceptar todo"
function aceptarCookies() {
    saveConsentDecision(COOKIE_CONSENT.GRANTED);

    const banner = document.getElementById('cookie-banner');
    if (banner) banner.classList.remove('visible');

    // Cargar GTM inmediatamente
    cargarGTM();

    // Recargar para asegurar que GTM se ejecuta limpiamente
    setTimeout(() => {
        window.location.reload();
    }, 200);
}

// Se llama al hacer clic en "Rechazar"
function rechazarCookies() {
    saveConsentDecision(COOKIE_CONSENT.DENIED);

    const banner = document.getElementById('cookie-banner');
    if (banner) banner.classList.remove('visible');

    // NO se carga GTM (modo básico)
    // No recargamos: no hay nada que cargar
}

// Se llama al hacer clic en "Más información"
function abrirModalCookies() {
    const modal = document.getElementById('modal-cookies');
    if (!modal) return;

    const textoEl = document.getElementById('texto-cookies');
    if (textoEl && typeof CONFIG !== 'undefined' && CONFIG.legal && CONFIG.legal.texto_cookies) {
        textoEl.textContent = CONFIG.legal.texto_cookies;
    }

    modal.classList.add('activo');
}

function cerrarModalCookies() {
    const modal = document.getElementById('modal-cookies');
    if (modal) modal.classList.remove('activo');
}

// Inicializa todo el sistema de cookies
function inicializarCookies() {
    const decision = getConsentDecision();

    if (decision === COOKIE_CONSENT.GRANTED) {
        // Ya aceptó antes: cargar GTM sin preguntar
        cargarGTM();
    } else if (decision === COOKIE_CONSENT.DENIED) {
        // Ya rechazó: no cargar GTM, no mostrar banner
    } else {
        // Sin decisión: mostrar banner
        mostrarCookieBanner();
    }
}

/* ============================================
   9. INICIALIZACIÓN GLOBAL
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    inicializarLandingPage();

    document.addEventListener('change', (e) => {
        if (e.target.name === 'motivo') {
            document.querySelectorAll('input[name="motivo"]').forEach(r => {
                r.closest('.opcion-radio').classList.toggle('seleccionado', r.checked);
            });
        }
    });

    activarSoloDigitos();

    // Sistema de cookies + GTM
    inicializarCookies();
});