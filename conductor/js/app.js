/* ============================================
   InnoCR Conductor — app.js
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
            if (producto.precio.oficial !== null) {
                const total = producto.precio.oficial + (producto.precio.gestion || 0);
                precioTexto = Utils.formatearMoneda(total);
                if (producto.precio.gestion > 0) {
                    desglose = `(${Utils.formatearMoneda(producto.precio.oficial)} oficial + ${Utils.formatearMoneda(producto.precio.gestion)} gestión)`;
                }
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
       ABRIR PRODUCTO (con preselección opcional)
       ============================================ */
    abrirProducto(idProducto, preseleccion) {
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

        // Aplicar preselección si viene
        if (preseleccion && typeof preseleccion === "object") {
            Object.keys(preseleccion).forEach(campoId => {
                this.estado.selecciones[campoId] = preseleccion[campoId];
            });
        }

        const titulo = document.getElementById("form-titulo");
        if (titulo) titulo.textContent = producto.titulo;

        this.irAPantalla("pantalla-formulario");

        if (producto.multipaso && producto.pasos) {
            this.estado.pasos = producto.pasos;
            this.renderizarPaso();
        } else {
            this.estado.pasos = [{ titulo: null, campos: producto.campos }];
            this.renderizarFormulario(producto);
        }
    },

    /* ============================================
       MODAL DE INFORMACIÓN (con botón solicitar)
       ============================================ */
    abrirModalInfo(tipoModal) {
        const overlay = document.getElementById("modal-seleccion");
        const titulo = document.getElementById("modal-seleccion-titulo");
        const lista = document.getElementById("modal-seleccion-lista");
        const btnConfirmar = document.getElementById("modal-seleccion-confirmar");
        const btnCancelar = document.getElementById("modal-seleccion-cancelar");

        if (!overlay) return;

        const items = tipoModal === "licencias" ? CONFIG.tiposLicencia : CONFIG.tiposPlaca;
        titulo.textContent = tipoModal === "licencias" ? "Tipos de licencia" : "Tipos de placa";

        lista.innerHTML = "";
        items.forEach(item => {
            const div = document.createElement("div");
            div.className = "info-item";
            div.innerHTML = `
        <div class="info-item-info">
          <strong>${Utils.escaparHtml(item.nombre)}</strong>
          <p>${Utils.escaparHtml(item.descripcion)}</p>
        </div>
        <button class="btn-solicitar-info" type="button">
          <i class="fa-brands fa-whatsapp"></i> Solicitar
        </button>
      `;

            const btn = div.querySelector(".btn-solicitar-info");
            btn.addEventListener("click", () => {
                overlay.classList.remove("activo");
                if (tipoModal === "licencias") {
                    this.abrirProducto(1, {
                        1: [{ id: 3, nombre: "Práctica", esPractica: true }],
                        2: [item]
                    });
                } else {
                    this.abrirProducto(4, {
                        1: [item]
                    });
                }
            });

            lista.appendChild(div);
        });

        overlay.classList.add("activo");

        btnConfirmar.textContent = "Entendido";
        btnConfirmar.onclick = () => overlay.classList.remove("activo");
        btnCancelar.style.display = "none";
    },

    /* ============================================
       COOKIES
       ============================================ */
    inicializarCookies() {
        const banner = document.getElementById("cookie-banner");
        if (!banner) return;

        const preferencia = localStorage.getItem("innocr_conductor_cookies");
        if (!preferencia) {
            setTimeout(() => banner.classList.add("visible"), 800);
        }

        window.aceptarCookies = () => {
            localStorage.setItem("innocr_conductor_cookies", "aceptadas");
            banner.classList.remove("visible");
            Utils.mostrarToast("Cookies aceptadas");
        };

        window.rechazarCookies = () => {
            localStorage.setItem("innocr_conductor_cookies", "rechazadas");
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
       MOTOR DE FORMULARIOS
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
        this.aplicarDependencias();
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
            const vacio =
                val === undefined ||
                val === null ||
                val === "" ||
                (Array.isArray(val) && val.length === 0) ||
                (campo.tipo === "checkbox-legal" && val !== true);

            if (vacio) {
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
            this.actualizarPrecio();
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
        if (previo && previo.length) {
            btn.querySelector(".select-valor").textContent = previo.map(s => s.nombre).join(", ");
        }

        btn.addEventListener("click", () => {
            this.abrirModalSeleccion(campo, (seleccionados) => {
                this.estado.selecciones[campo.id] = seleccionados;
                const texto = seleccionados.length
                    ? seleccionados.map(s => s.nombre).join(", ")
                    : "Seleccionar...";
                btn.querySelector(".select-valor").textContent = texto;
                this.aplicarDependencias();
                this.actualizarPrecio();
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
                this.actualizarPrecio();
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

    aplicarDependencias() {
        const producto = this.estado.productoActual;
        if (!producto) return;

        const todosCampos = producto.multipaso
            ? producto.pasos.flatMap(p => p.campos)
            : producto.campos;

        todosCampos.forEach(campo => {
            if (!campo.dependeDe) return;
            const wrapper = document.querySelector(`.campo-wrapper[data-campo-id="${campo.id}"]`);
            if (!wrapper) return;

            const dep = campo.dependeDe;
            const valorDep = this.estado.selecciones[dep.campo];

            let cumple = false;
            if (Array.isArray(valorDep)) {
                cumple = valorDep.some(v => v.id == dep.valor);
            } else if (valorDep && valorDep.id !== undefined) {
                cumple = valorDep.id == dep.valor;
            }

            wrapper.style.display = cumple ? "" : "none";
        });
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
        const seleccionados = new Set(
            (this.estado.selecciones[campo.id] || []).map(s => s.id)
        );

        opciones.forEach(op => {
            const lbl = document.createElement("label");
            lbl.className = "opcion-radio" + (seleccionados.has(op.id) ? " seleccionado" : "");
            lbl.innerHTML = `
        <input type="${campo.multiple ? "checkbox" : "radio"}" name="opcion-modal" value="${op.id}" ${seleccionados.has(op.id) ? "checked" : ""}>
        <span><strong>${Utils.escaparHtml(op.nombre)}</strong>${op.descripcion ? `<br><small>${Utils.escaparHtml(op.descripcion)}</small>` : ""}</span>
      `;
            const input = lbl.querySelector("input");

            input.addEventListener("change", () => {
                if (campo.multiple) {
                    lbl.classList.toggle("seleccionado", input.checked);
                } else {
                    lista.querySelectorAll(".opcion-radio").forEach(el => el.classList.remove("seleccionado"));
                    lbl.classList.add("seleccionado");
                }
            });

            lista.appendChild(lbl);
        });

        overlay.classList.add("activo");

        btnConfirmar.textContent = "Confirmar";
        btnCancelar.style.display = "";
        btnCancelar.textContent = "Cancelar";

        btnConfirmar.onclick = () => {
            const marcados = Array.from(lista.querySelectorAll("input:checked"))
                .map(i => opciones.find(o => o.id == i.value));
            overlay.classList.remove("activo");
            if (callback) callback(marcados);
        };

        btnCancelar.onclick = () => {
            overlay.classList.remove("activo");
        };
    },

    actualizarPrecio() {
        const producto = this.estado.productoActual;
        const cont = document.getElementById("form-precio-total");
        if (!producto || !cont) return;

        let total = 0;
        let desglose = "";

        const todosCampos = producto.multipaso
            ? producto.pasos.flatMap(p => p.campos)
            : producto.campos;

        if (producto.precio.oficial !== null) {
            let unidades = 1;

            todosCampos.forEach(campo => {
                if (campo.multiple && Array.isArray(this.estado.selecciones[campo.id]) && this.estado.selecciones[campo.id].length > 0) {
                    unidades = Math.max(unidades, this.estado.selecciones[campo.id].length);
                }
            });

            const oficialTotal = producto.precio.oficial * unidades;
            const gestion = producto.precio.gestion || 0;

            if (producto.precio.feeUnico) {
                total = oficialTotal + gestion;
                if (gestion > 0) {
                    desglose = `(${Utils.formatearMoneda(oficialTotal)} oficial + ${Utils.formatearMoneda(gestion)} gestión)`;
                }
            } else {
                total = (producto.precio.oficial + gestion) * unidades;
                if (gestion > 0) {
                    desglose = `(${Utils.formatearMoneda(producto.precio.oficial)} oficial + ${Utils.formatearMoneda(gestion)} gestión) × ${unidades}`;
                } else {
                    desglose = `(${Utils.formatearMoneda(producto.precio.oficial)} × ${unidades})`;
                }
            }
        }

        if (producto.precio.oficial === null) {
            todosCampos.forEach(campo => {
                if (campo.opciones === "sedesDictamen" || campo.opciones === "sedesTraspaso") {
                    const sel = this.estado.selecciones[campo.id];
                    if (sel && sel[0] && sel[0].precio) {
                        total = sel[0].precio + (producto.precio.gestion || 0);
                        desglose = `(${Utils.formatearMoneda(sel[0].precio)} sede + ${Utils.formatearMoneda(producto.precio.gestion)} gestión)`;
                    } else {
                        desglose = "Seleccioná una sede para ver el total";
                    }
                }
            });
        }

        cont.innerHTML = `
      <div class="precio-linea">
        <span>Total estimado:</span>
        <strong>${total > 0 ? Utils.formatearMoneda(total) : "—"}</strong>
      </div>
      ${desglose ? `<small>${desglose}</small>` : ""}
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

        for (const campo of todosCampos) {
            if (!campo.requerido) continue;
            const val = this.estado.selecciones[campo.id];
            const vacio =
                val === undefined ||
                val === null ||
                val === "" ||
                (Array.isArray(val) && val.length === 0) ||
                (campo.tipo === "checkbox-legal" && val !== true);

            if (vacio) {
                Utils.mostrarToast(`Completá: ${campo.label}`);
                return;
            }
        }

        const campoPrueba = todosCampos.find(c => c.clave === "tipoPrueba");
        const campoLicencia = todosCampos.find(c => c.clave === "licencias");

        if (campoPrueba && campoLicencia) {
            const seleccionPrueba = this.estado.selecciones[campoPrueba.id] || [];
            const eligioPractica = Array.isArray(seleccionPrueba)
                ? seleccionPrueba.some(p => p.esPractica === true)
                : seleccionPrueba.esPractica === true;

            if (eligioPractica) {
                const seleccionLicencia = this.estado.selecciones[campoLicencia.id] || [];
                if (!seleccionLicencia.length) {
                    Utils.mostrarToast("Si elegís Práctica, seleccioná una licencia.");
                    return;
                }
            }
        }

        const datos = {};
        todosCampos.forEach(campo => {
            const val = this.estado.selecciones[campo.id];
            let texto = "";

            if (Array.isArray(val)) {
                texto = val.map(v => v.nombre).join(", ");
            } else if (typeof val === "object" && val !== null) {
                texto = val.nombre || "";
            } else {
                texto = val || "";
            }

            if (campo.clave) {
                if (campo.clave === "licencias" && texto) {
                    datos.licencias = `, licencia ${texto}`;
                } else {
                    datos[campo.clave] = texto;
                }
            }
        });

        const contPrecio = document.getElementById("form-precio-total");
        const totalTexto = contPrecio ? contPrecio.querySelector("strong")?.textContent : "";
        datos.total = totalTexto || "";

        const mensaje = Utils.interpolar(producto.mensajeWhatsApp, datos);
        const url = Utils.construirUrlWhatsApp(CONFIG.whatsapp.numero, mensaje);
        window.open(url, "_blank");
    },

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

document.addEventListener("DOMContentLoaded", () => App.iniciar());