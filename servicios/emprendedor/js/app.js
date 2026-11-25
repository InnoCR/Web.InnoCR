/* ============================================
   Emprendedor InnoCR — app.js
   Lógica principal de la SPA. Autocontenido.
   ============================================ */

const App = {

    estado: {
        productoActual: null,
        selecciones: {},
        pasoActual: 0,
        pasos: []
    },

    iniciar() {
        this.renderizarHub();
        this.inicializarCookies();
        this.configurarNavegacion();
        this.actualizarAnio();
        this.renderizarAvisoLegal();
    },

    irAPantalla(idPantalla) {
        document.querySelectorAll(".pantalla").forEach(p => p.classList.remove("activa"));
        const destino = document.getElementById(idPantalla);
        if (destino) {
            destino.classList.add("activa");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    },

    configurarNavegacion() {
        document.querySelectorAll("[data-ir-a]").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                this.irAPantalla(btn.dataset.irA);
            });
        });
    },

    /* ============================================
       HUB POR CATEGORÍAS
       ============================================ */
    renderizarHub() {
        const contenedor = document.getElementById("hub-categorias");
        if (!contenedor) return;
        contenedor.innerHTML = "";

        CONFIG.categorias.forEach(categoria => {
            const seccion = document.createElement("section");
            seccion.className = "categoria";

            const titulo = document.createElement("h2");
            titulo.className = "titulo-categoria";
            titulo.textContent = categoria.titulo;
            seccion.appendChild(titulo);

            if (categoria.tipo === "productos") {
                seccion.appendChild(this.renderizarProductos(categoria.items));
            } else if (categoria.tipo === "info") {
                seccion.appendChild(this.renderizarInfo(categoria.items));
            } else if (categoria.tipo === "enlaces") {
                seccion.appendChild(this.renderizarEnlaces(categoria.items));
            }

            contenedor.appendChild(seccion);
        });
    },

    renderizarProductos(items) {
        const grid = document.createElement("div");
        grid.className = "hub-contenido";

        items.filter(p => p.activo).forEach(producto => {
            const tarjeta = document.createElement("a");
            tarjeta.href = "#";
            tarjeta.className = "tarjeta-servicio";
            tarjeta.dataset.productoId = producto.id;

            let precioTexto = "";
            let desglose = "";
            if (producto.precio && producto.precio.oficial !== null) {
                const total = producto.precio.oficial + (producto.precio.gestion || 0);
                precioTexto = Utils.formatearMoneda(total);
            } else if (producto.precio && producto.precio.oficial === null) {
                precioTexto = "Cotizar";
            } else {
                precioTexto = "Consultar";
            }

            const tagHtml = producto.tag
                ? `<div class="tag-producto">${Utils.escaparHtml(producto.tag)}</div>`
                : `<div class="tag-producto tag-vacio"></div>`;

            tarjeta.innerHTML = `
        ${tagHtml}
        <div class="icono-wrapper">
          <i class="${producto.icono}"></i>
        </div>
        <h3>${Utils.escaparHtml(producto.titulo)}</h3>
        <p>${Utils.escaparHtml(producto.descripcion)}</p>
        <div class="precio-tag">${precioTexto}</div>
        ${desglose ? `<div class="precio-desglose">${desglose}</div>` : ""}
        <button class="btn-primario" type="button">Continuar</button>
      `;

            tarjeta.addEventListener("click", (e) => {
                e.preventDefault();
                this.abrirProducto(producto.id);
            });

            grid.appendChild(tarjeta);
        });

        return grid;
    },

    renderizarInfo(items) {
        const grid = document.createElement("div");
        grid.className = "hub-contenido";

        items.forEach(item => {
            const tarjeta = document.createElement("a");
            tarjeta.href = "#";
            tarjeta.className = "tarjeta-servicio tarjeta-info";
            tarjeta.dataset.tipoModal = item.tipoModal;

            tarjeta.innerHTML = `
        <div class="tag-producto tag-gratis-card">${Utils.escaparHtml(item.tag)}</div>
        <div class="icono-wrapper">
          <i class="${item.icono}"></i>
        </div>
        <h3>${Utils.escaparHtml(item.titulo)}</h3>
        <p>${Utils.escaparHtml(item.descripcion)}</p>
        <button class="btn-primario" type="button">Ver información</button>
      `;

            tarjeta.addEventListener("click", (e) => {
                e.preventDefault();
                this.abrirModalInfo(item.tipoModal);
            });

            grid.appendChild(tarjeta);
        });

        return grid;
    },

    renderizarEnlaces(items) {
        const grid = document.createElement("div");
        grid.className = "enlaces-grid";

        items.forEach(enlace => {
            const tarjeta = document.createElement("a");
            tarjeta.href = enlace.url;
            tarjeta.target = "_blank";
            tarjeta.rel = "noopener";
            tarjeta.className = "info-enlace-card";

            tarjeta.innerHTML = `
        <div class="info-enlace-tag">${Utils.escaparHtml(enlace.entidad)}</div>
        <strong>${Utils.escaparHtml(enlace.nombre)}</strong>
        <p>${Utils.escaparHtml(enlace.descripcion)}</p>
        <span class="info-enlace-link">Ir al sitio <i class="fa-solid fa-arrow-up-right-from-square"></i></span>
      `;

            grid.appendChild(tarjeta);
        });

        return grid;
    },

    /* ============================================
       ABRIR PRODUCTO
       Maneja dos modos: "formulario" y "solo-info"
       ============================================ */
    abrirProducto(idProducto) {
        let producto = null;
        CONFIG.categorias.forEach(cat => {
            if (cat.tipo === "productos") {
                const found = cat.items.find(p => p.id === idProducto);
                if (found) producto = found;
            }
        });

        if (!producto) return;

        this.estado.productoActual = producto;
        this.estado.selecciones = {};
        this.estado.pasoActual = 0;

        const titulo = document.getElementById("form-titulo");
        if (titulo) titulo.textContent = producto.titulo;

        this.irAPantalla("pantalla-formulario");

        if (producto.modo === "solo-info") {
            this.renderizarSoloInfo(producto);
        } else if (producto.multipaso && producto.pasos) {
            this.estado.pasos = producto.pasos;
            this.renderizarPaso();
        } else {
            this.estado.pasos = [{ titulo: null, campos: producto.campos }];
            this.renderizarFormulario(producto);
        }
    },

    /* ============================================
       MODO "SOLO INFO"
       Muestra texto introductorio, checkbox legal
       y botón directo a WhatsApp.
       ============================================ */
    renderizarSoloInfo(producto) {
        const contenedor = document.getElementById("form-campos");
        if (!contenedor) return;
        contenedor.innerHTML = "";

        const barra = document.getElementById("barra-progreso-wrapper");
        if (barra) barra.style.display = "none";

        // Texto introductorio
        const intro = document.createElement("div");
        intro.className = "solo-info-intro";
        intro.innerHTML = `<p>${Utils.escaparHtml(producto.descripcion)}</p>`;
        contenedor.appendChild(intro);

        // Checkbox legal
        producto.campos.forEach(campo => {
            contenedor.appendChild(this.crearCampoWrapper(campo));
        });

        // Botón WhatsApp directo
        const btnWa = document.createElement("button");
        btnWa.type = "button";
        btnWa.className = "btn-primario btn-whatsapp btn-grande";
        btnWa.innerHTML = `<i class="fa-brands fa-whatsapp"></i> Continuar por WhatsApp`;
        btnWa.addEventListener("click", () => this.enviarSoloInfo());
        contenedor.appendChild(btnWa);
    },

    enviarSoloInfo() {
        const producto = this.estado.productoActual;
        if (!producto) return;

        // Validar checkbox legal
        for (const campo of producto.campos) {
            if (!campo.requerido) continue;
            const val = this.estado.selecciones[campo.id];
            if (Utils.estaVacio(val, campo.tipo)) {
                Utils.mostrarToast(`Completá: ${campo.label}`);
                return;
            }
        }

        const mensaje = producto.mensajeWhatsApp;
        const url = Utils.construirUrlWhatsApp(CONFIG.whatsapp.numero, mensaje);
        window.open(url, "_blank");
    },

    /* ============================================
       MODAL DE INFORMACIÓN (guías)
       ============================================ */
    abrirModalInfo(tipoModal) {
        const overlay = document.getElementById("modal-info");
        const titulo = document.getElementById("modal-info-titulo");
        const texto = document.getElementById("modal-info-texto");

        if (!overlay) return;

        const info = CONFIG.modalesInfo[tipoModal];
        if (!info) return;

        titulo.textContent = info.titulo;
        texto.textContent = info.texto;
        overlay.classList.add("activo");
    },

    cerrarModalInfo() {
        const overlay = document.getElementById("modal-info");
        if (overlay) overlay.classList.remove("activo");
    },

    /* ============================================
       COOKIES
       ============================================ */
    inicializarCookies() {
        const banner = document.getElementById("cookie-banner");
        if (!banner) return;

        const analytics = CONFIG.analytics || {};
        const consentKey = analytics.ls_key_consent || "innocr_cookies_consent_v1";
        const granted = "granted";
        const denied = "denied";

        const getConsentDecision = () => {
            try {
                const consent = JSON.parse(localStorage.getItem(consentKey));
                return consent && (consent.decision === granted || consent.decision === denied)
                    ? consent.decision
                    : null;
            } catch (error) {
                console.warn("No se pudo leer la decisión de cookies:", error);
                return null;
            }
        };

        const saveConsentDecision = (decision) => {
            try {
                localStorage.setItem(consentKey, JSON.stringify({
                    decision: decision,
                    timestamp: Date.now()
                }));
            } catch (error) {
                console.warn("No se pudo guardar la decisión de cookies:", error);
            }
        };

        const loadGoogleTagManager = () => {
            if (!analytics.gtm_id) {
                console.warn("GTM ID no configurado en data.js");
                return;
            }
            if (document.getElementById("gtm-script")) return;

            window.dataLayer = window.dataLayer || [];
            window.gtag = function () {
                window.dataLayer.push(arguments);
            };
            window.gtag("js", new Date());
            window.gtag("consent", "update", {
                analytics_storage: "granted"
            });

            const script = document.createElement("script");
            script.id = "gtm-script";
            script.async = true;
            script.src = "https://www.googletagmanager.com/gtm.js?id=" + analytics.gtm_id;
            document.head.appendChild(script);
        };

        let decision = getConsentDecision();
        if (decision === null) {
            try {
                if (localStorage.getItem("emprendedor_innocr_cookies") === "rechazadas") {
                    decision = denied;
                    saveConsentDecision(denied);
                }
            } catch (error) {
                console.warn("No se pudo migrar la decisión de cookies:", error);
            }
        }

        if (decision === granted) {
            loadGoogleTagManager();
        } else if (decision === null) {
            setTimeout(() => banner.classList.add("visible"), 300);
        }

        window.aceptarCookies = () => {
            saveConsentDecision(granted);
            banner.classList.remove("visible");
            loadGoogleTagManager();
            setTimeout(() => window.location.reload(), 200);
            Utils.mostrarToast("Cookies aceptadas");
        };

        window.rechazarCookies = () => {
            saveConsentDecision(denied);
            banner.classList.remove("visible");
            Utils.mostrarToast("Cookies rechazadas");
        };

        window.abrirModalCookies = () => {
            const modal = document.getElementById("modal-cookies");
            const texto = document.getElementById("texto-cookies");
            if (texto) texto.textContent = CONFIG.textosLegales.cookies;
            if (modal) modal.classList.add("activo");
        };

        window.cerrarModalCookies = () => {
            const modal = document.getElementById("modal-cookies");
            if (modal) modal.classList.remove("activo");
        };
    },

    actualizarAnio() {
        const el = document.getElementById("anio-actual");
        if (el) el.textContent = new Date().getFullYear();
    },

    renderizarAvisoLegal() {
        const el = document.getElementById("footer-aviso-legal");
        if (el) el.textContent = CONFIG.avisoLegalFooter;
    },

    /* ============================================
       MOTOR DE FORMULARIOS (MODO "FORMULARIO")
       ============================================ */
    renderizarFormulario(producto) {
        const contenedor = document.getElementById("form-campos");
        if (!contenedor) return;
        contenedor.innerHTML = "";

        const barra = document.getElementById("barra-progreso-wrapper");
        if (barra) barra.style.display = "none";

        producto.campos.forEach(campo => {
            contenedor.appendChild(this.crearCampoWrapper(campo));
        });

        this.agregarPrecioYBoton(contenedor);
        this.actualizarPrecio();
    },

    renderizarPaso() {
        const contenedor = document.getElementById("form-campos");
        if (!contenedor) return;
        contenedor.innerHTML = "";

        const pasos = this.estado.pasos;
        const paso = pasos[this.estado.pasoActual];

        const barra = document.getElementById("barra-progreso-wrapper");
        if (barra) {
            barra.style.display = "";
            const progreso = document.getElementById("barra-progreso-fill");
            const texto = document.getElementById("paso-texto");
            const pct = ((this.estado.pasoActual + 1) / pasos.length) * 100;
            if (progreso) progreso.style.width = pct + "%";
            if (texto) texto.textContent = `Paso ${this.estado.pasoActual + 1} de ${pasos.length}`;
        }

        const h = document.createElement("h3");
        h.className = "titulo-seccion";
        h.textContent = paso.titulo;
        contenedor.appendChild(h);

        paso.campos.forEach(campo => {
            contenedor.appendChild(this.crearCampoWrapper(campo));
        });

        const nav = document.createElement("div");
        nav.className = "nav-pasos";

        if (this.estado.pasoActual > 0) {
            const btnAtras = document.createElement("button");
            btnAtras.type = "button";
            btnAtras.className = "btn-secundario";
            btnAtras.textContent = "Atrás";
            btnAtras.addEventListener("click", () => {
                this.estado.pasoActual--;
                this.renderizarPaso();
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
            nav.appendChild(btnAtras);
        }

        const esUltimo = this.estado.pasoActual === pasos.length - 1;

        if (!esUltimo) {
            const btnSig = document.createElement("button");
            btnSig.type = "button";
            btnSig.className = "btn-primario";
            btnSig.textContent = "Siguiente";
            btnSig.addEventListener("click", () => this.siguientePaso());
            nav.appendChild(btnSig);
        }

        contenedor.appendChild(nav);

        if (esUltimo) {
            this.agregarPrecioYBoton(contenedor);
            this.actualizarPrecio();
        }
    },

    siguientePaso() {
        const pasos = this.estado.pasos;
        const paso = pasos[this.estado.pasoActual];

        for (const campo of paso.campos) {
            if (!campo.requerido) continue;
            const val = this.estado.selecciones[campo.id];
            if (Utils.estaVacio(val, campo.tipo)) {
                Utils.mostrarToast(`Completá: ${campo.label}`);
                return;
            }
        }

        this.estado.pasoActual++;
        this.renderizarPaso();
        window.scrollTo({ top: 0, behavior: "smooth" });
    },

    crearCampoWrapper(campo) {
        const wrapper = document.createElement("div");
        wrapper.className = "campo-wrapper";
        wrapper.dataset.campoId = campo.id;

        if (campo.tipo !== "checkbox-legal") {
            const label = document.createElement("label");
            label.textContent = campo.label;
            if (campo.requerido) {
                const req = document.createElement("span");
                req.className = "obligatorio";
                req.textContent = " *";
                label.appendChild(req);
            }
            wrapper.appendChild(label);
        }

        switch (campo.tipo) {
            case "text":
                wrapper.appendChild(this.crearInputTexto(campo));
                break;
            case "modal-select":
                wrapper.appendChild(this.crearBotonModalSelect(campo));
                break;
            case "checkbox-group":
                wrapper.appendChild(this.crearCheckboxGroup(campo));
                break;
            case "checkbox-legal":
                wrapper.appendChild(this.crearCheckboxLegal(campo));
                break;
        }

        return wrapper;
    },

    crearInputTexto(campo) {
        const input = document.createElement("input");
        input.type = "text";
        input.id = `campo-${campo.id}`;
        input.placeholder = campo.placeholder || "";
        input.dataset.campoId = campo.id;

        const previo = this.estado.selecciones[campo.id];
        if (previo && typeof previo === "string") input.value = previo;

        input.addEventListener("input", () => {
            this.estado.selecciones[campo.id] = input.value.trim();
        });
        return input;
    },

    crearBotonModalSelect(campo) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn-select-modal";
        btn.id = `campo-${campo.id}`;
        btn.dataset.campoId = campo.id;
        btn.innerHTML = `<span class="select-valor">Seleccionar...</span> <i class="fa-solid fa-chevron-down"></i>`;

        const previo = this.estado.selecciones[campo.id];
        if (previo && previo.nombre) {
            btn.querySelector(".select-valor").textContent = previo.nombre;
        }

        btn.addEventListener("click", () => {
            this.abrirModalSeleccion(campo, (seleccionado) => {
                this.estado.selecciones[campo.id] = seleccionado;
                const texto = seleccionado ? seleccionado.nombre : "Seleccionar...";
                btn.querySelector(".select-valor").textContent = texto;
            });
        });

        return btn;
    },

    crearCheckboxGroup(campo) {
        const grupo = document.createElement("div");
        grupo.className = "checkbox-grupo";
        grupo.id = `campo-${campo.id}`;

        const opciones = this.obtenerOpciones(campo);
        const previos = (this.estado.selecciones[campo.id] || []).map(s => s.id);

        opciones.forEach(op => {
            const lbl = document.createElement("label");
            lbl.className = "checkbox-label";
            lbl.innerHTML = `
        <input type="checkbox" value="${op.id}" ${previos.includes(op.id) ? "checked" : ""}>
        <span><strong>${Utils.escaparHtml(op.nombre)}</strong>${op.descripcion ? ` — ${Utils.escaparHtml(op.descripcion)}` : ""}</span>
      `;
            const chk = lbl.querySelector("input");
            chk.addEventListener("change", () => {
                const seleccionados = Array.from(grupo.querySelectorAll("input:checked"))
                    .map(i => opciones.find(o => o.id == i.value));
                this.estado.selecciones[campo.id] = seleccionados;
            });
            grupo.appendChild(lbl);
        });

        return grupo;
    },

    crearCheckboxLegal(campo) {
        const lbl = document.createElement("label");
        lbl.className = "checkbox-label checkbox-legal";
        lbl.innerHTML = `
      <input type="checkbox" id="campo-${campo.id}" ${this.estado.selecciones[campo.id] === true ? "checked" : ""}>
      <span>${Utils.escaparHtml(campo.label)}</span>
    `;
        const chk = lbl.querySelector("input");
        chk.addEventListener("change", () => {
            this.estado.selecciones[campo.id] = chk.checked;
        });
        return lbl;
    },

    obtenerOpciones(campo) {
        if (Array.isArray(campo.opciones)) return campo.opciones;
        if (typeof campo.opciones === "string") return CONFIG[campo.opciones] || [];
        return [];
    },

    abrirModalSeleccion(campo, callback) {
        const overlay = document.getElementById("modal-seleccion");
        const titulo = document.getElementById("modal-seleccion-titulo");
        const lista = document.getElementById("modal-seleccion-lista");
        const btnConfirmar = document.getElementById("modal-seleccion-confirmar");
        const btnCancelar = document.getElementById("modal-seleccion-cancelar");

        if (!overlay) return;

        titulo.textContent = campo.label;
        lista.innerHTML = "";

        const opciones = this.obtenerOpciones(campo);
        const previo = this.estado.selecciones[campo.id];

        opciones.forEach(op => {
            const lbl = document.createElement("label");
            lbl.className = "opcion-radio" + (previo && previo.id === op.id ? " seleccionado" : "");
            lbl.innerHTML = `
        <input type="radio" name="opcion-modal" value="${op.id}" ${previo && previo.id === op.id ? "checked" : ""}>
        <span><strong>${Utils.escaparHtml(op.nombre)}</strong>${op.descripcion ? `<br><small>${Utils.escaparHtml(op.descripcion)}</small>` : ""}</span>
      `;
            const input = lbl.querySelector("input");

            input.addEventListener("change", () => {
                lista.querySelectorAll(".opcion-radio").forEach(el => el.classList.remove("seleccionado"));
                lbl.classList.add("seleccionado");
            });

            lista.appendChild(lbl);
        });

        overlay.classList.add("activo");

        btnConfirmar.onclick = () => {
            const marcado = lista.querySelector("input:checked");
            if (!marcado) {
                Utils.mostrarToast("Seleccioná una opción");
                return;
            }
            const seleccionado = opciones.find(o => o.id == marcado.value);
            overlay.classList.remove("activo");
            if (callback) callback(seleccionado);
        };

        btnCancelar.onclick = () => {
            overlay.classList.remove("activo");
        };
    },

    actualizarPrecio() {
        const producto = this.estado.productoActual;
        const cont = document.getElementById("form-precio-total");
        if (!producto || !cont) return;

        // Solo mostrar precio si el producto tiene precio.oficial definido
        if (!producto.precio || producto.precio.oficial === null) {
            cont.innerHTML = `
        <div class="precio-linea">
          <span>Precio:</span>
          <strong>Cotización personalizada</strong>
        </div>
        ${producto.notaPrecio ? `<p class="nota-precio">${Utils.escaparHtml(producto.notaPrecio)}</p>` : ""}
      `;
            return;
        }

        const total = producto.precio.oficial + (producto.precio.gestion || 0);

        cont.innerHTML = `
      <div class="precio-linea">
        <span>Total:</span>
        <strong>${Utils.formatearMoneda(total)}</strong>
      </div>
      ${producto.notaPrecio ? `<p class="nota-precio">${Utils.escaparHtml(producto.notaPrecio)}</p>` : ""}
    `;
    },

    agregarPrecioYBoton(contenedor) {
        const precioCont = document.createElement("div");
        precioCont.id = "form-precio-total";
        precioCont.className = "form-precio-total";
        contenedor.appendChild(precioCont);

        const btnWa = document.createElement("button");
        btnWa.type = "button";
        btnWa.className = "btn-primario btn-whatsapp btn-grande";
        btnWa.innerHTML = `<i class="fa-brands fa-whatsapp"></i> Continuar por WhatsApp`;
        btnWa.addEventListener("click", () => this.enviarPorWhatsApp());
        contenedor.appendChild(btnWa);
    },

    enviarPorWhatsApp() {
        const producto = this.estado.productoActual;
        if (!producto) return;

        const todosCampos = producto.multipaso
            ? producto.pasos.flatMap(p => p.campos)
            : producto.campos;

        // Validar todos los campos requeridos
        for (const campo of todosCampos) {
            if (!campo.requerido) continue;
            const val = this.estado.selecciones[campo.id];
            if (Utils.estaVacio(val, campo.tipo)) {
                Utils.mostrarToast(`Completá: ${campo.label}`);
                return;
            }
        }

        // Armar datos para interpolar
        const datos = {};
        todosCampos.forEach(campo => {
            const val = this.estado.selecciones[campo.id];
            const texto = Utils.seleccionATexto(val);
            if (campo.clave) {
                datos[campo.clave] = texto;
            }
        });

        const mensaje = Utils.interpolar(producto.mensajeWhatsApp, datos);
        const url = Utils.construirUrlWhatsApp(CONFIG.whatsapp.numero, mensaje);
        window.open(url, "_blank");
    },

    /* ============================================
       MODAL DE PRIVACIDAD
       ============================================ */
    abrirModalPrivacidad() {
        const modal = document.getElementById("modal-privacidad");
        const texto = document.getElementById("texto-privacidad");
        if (texto) texto.textContent = CONFIG.textosLegales.privacidad;
        if (modal) modal.classList.add("activo");
    },

    cerrarModalPrivacidad() {
        const modal = document.getElementById("modal-privacidad");
        if (modal) modal.classList.remove("activo");
    }

};

window.abrirModalPrivacidad = () => App.abrirModalPrivacidad();
window.cerrarModalPrivacidad = () => App.cerrarModalPrivacidad();
window.cerrarModalInfo = () => App.cerrarModalInfo();

document.addEventListener("DOMContentLoaded", () => App.iniciar());