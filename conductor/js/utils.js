/* ============================================
   InnoCR — utils.js
   Funciones auxiliares reutilizables.
   ============================================ */

const Utils = {

    /* --------------------------------------------
       1. Formateo de moneda
       formatearMoneda(5000) → "₡5.000"
       -------------------------------------------- */
    formatearMoneda(valor) {
        if (valor === null || valor === undefined) return "—";
        return new Intl.NumberFormat(CONFIG.moneda.locale, {
            style: "currency",
            currency: CONFIG.moneda.codigo,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(valor);
    },

    /* --------------------------------------------
       2. Limpiar cédula (quitar espacios y guiones)
       -------------------------------------------- */
    limpiarCedula(valor) {
        return (valor || "").replace(/[\s-]/g, "");
    },

    /* --------------------------------------------
       3. Validar cédula costarricense (9 dígitos)
       Nota: validación básica de formato, no algorítmica.
       -------------------------------------------- */
    validarCedula(valor) {
        const limpia = this.limpiarCedula(valor);
        return /^\d{9}$/.test(limpia);
    },

    /* --------------------------------------------
       4. Construir URL de WhatsApp
       -------------------------------------------- */
    construirUrlWhatsApp(numero, mensaje) {
        const textoCodificado = encodeURIComponent(mensaje);
        return `https://wa.me/${numero}?text=${textoCodificado}`;
    },

    /* --------------------------------------------
       5. Interpolar plantilla
       interpolar("Hola {nombre}", { nombre: "Ana" }) → "Hola Ana"
       -------------------------------------------- */
    interpolar(plantilla, datos) {
        return plantilla.replace(/\{(\w+)\}/g, (match, clave) => {
            return datos[clave] !== undefined && datos[clave] !== null && datos[clave] !== ""
                ? datos[clave]
                : "";
        });
    },

    /* --------------------------------------------
       6. Mostrar toast (usa el CSS .toast-guardado)
       -------------------------------------------- */
    mostrarToast(mensaje, duracion = 2200) {
        let toast = document.getElementById("toast-global");

        if (!toast) {
            toast = document.createElement("div");
            toast.id = "toast-global";
            toast.className = "toast-guardado";
            document.body.appendChild(toast);
        }

        toast.textContent = mensaje;
        toast.classList.add("visible");

        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => {
            toast.classList.remove("visible");
        }, duracion);
    },

    /* --------------------------------------------
       7. Debounce
       -------------------------------------------- */
    debounce(fn, espera = 250) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, args), espera);
        };
    },

    /* --------------------------------------------
       8. Escapar HTML (para insertar texto del usuario sin romper)
       -------------------------------------------- */
    escaparHtml(texto) {
        const div = document.createElement("div");
        div.textContent = texto;
        return div.innerHTML;
    }

};