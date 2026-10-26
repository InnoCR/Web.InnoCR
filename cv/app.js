/* ============================================
   SISTEMA DE ALERTAS ESTÉTICAS
   ============================================ */
function mostrarAlerta(mensaje, titulo = "Atención", esError = true) {
    document.getElementById('alerta-titulo').textContent = titulo;
    document.getElementById('alerta-mensaje').textContent = mensaje;

    const icono = document.getElementById('alerta-icono');
    if (esError) {
        icono.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
        icono.style.color = 'var(--error)'; // Rojo
    } else {
        icono.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        icono.style.color = 'var(--exito)'; // Verde
    }

    document.getElementById('modal-alerta').classList.add('activo');
}

function cerrarModalAlerta() {
    document.getElementById('modal-alerta').classList.remove('activo');
}

/* ============================================
   NAVEGACIÓN ENTRE PANTALLAS
   ============================================ */
function irAPantalla(n) {
    document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
    const target = document.getElementById('pantalla-' + n);
    if (target) {
        target.classList.add('activa');
        window.scrollTo(0, 0);
        const err = document.getElementById('mensaje-error');
        if (err) err.style.display = 'none';
    }
}

/* ============================================
   UTILIDADES GENERALES
   ============================================ */
function v(id) { return document.getElementById(id).value.trim(); }
function soloDigitos(str) { return String(str).replace(/\D/g, ''); }
function normalizarIdentificacion(id) { return String(id).replace(/[\s\-\.]/g, '').trim().toUpperCase(); }

function mostrarError(msg) {
    const el = document.getElementById('mensaje-error');
    el.textContent = msg;
    el.style.display = 'block';
}

/* ============================================
   MODALES (PRIVACIDAD Y YA LLENÉ ANTES)
   ============================================ */
function abrirModalPrivacidad() {
    document.getElementById('texto-privacidad').textContent = CONFIG.legal.texto_politica;
    document.getElementById('modal-privacidad').classList.add('activo');
}
function cerrarModalPrivacidad() {
    document.getElementById('modal-privacidad').classList.remove('activo');
}

function abrirModalYaLLeno() {
    document.getElementById('modal-ya-lleno').classList.add('activo');
    document.querySelectorAll('input[name="motivo"]').forEach(r => {
        r.checked = false;
        r.closest('.opcion-radio').classList.remove('seleccionado');
    });
}
function cerrarModalYaLLeno() {
    document.getElementById('modal-ya-lleno').classList.remove('activo');
}
function confirmarModalYaLLeno() {
    const seleccionado = document.querySelector('input[name="motivo"]:checked');
    if (!seleccionado) {
        mostrarAlerta('Por favor selecciona una opción.');
        return;
    }
    let mensaje = '';
    switch (seleccionado.value) {
        case 'pago': mensaje = 'Hola, ya llené el formulario y quiero coordinar el pago de mi CV.'; break;
        case 'modificar': mensaje = 'Hola, ya llené el formulario y quiero modificar mi CV.'; break;
        case 'otra': mensaje = 'Hola, quiero hacer una consulta sobre el servicio de CV.'; break;
    }
    cerrarModalYaLLeno();
    abrirWhatsApp(mensaje);
}

/* ============================================
   VALIDACIONES
   ============================================ */
function validarYAvanzar(pantalla) {
    if (pantalla === 1) { if (!validarDatosPersonales()) return; irAPantalla(2); }
    else if (pantalla === 2) { if (!validarTrabajos()) return; irAPantalla(3); }
    else if (pantalla === 3) { if (!validarEstudiosYProyectos()) return; irAPantalla(4); }
    else if (pantalla === 4) { if (!validarHabilidadesYMas()) return; irAPantalla(5); }
}

function validarDatosPersonales() {
    const id = normalizarIdentificacion(v('identificacion'));
    const nombre = v('nombre');
    const email = v('email');
    const telefono = soloDigitos(v('telefono'));

    document.querySelectorAll('#pantalla-1 input, #pantalla-1 select').forEach(i => i.classList.remove('error'));

    if (!id) { marcarError('identificacion'); mostrarAlerta('La identificación es obligatoria.'); return false; }
    if (id.length < 5) { marcarError('identificacion'); mostrarAlerta('La identificación parece inválida.'); return false; }
    if (!nombre) { marcarError('nombre'); mostrarAlerta('El nombre es obligatorio.'); return false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { marcarError('email'); mostrarAlerta('El correo no es válido.'); return false; }
    if (!telefono || telefono.length < 7) { marcarError('telefono'); mostrarAlerta('El teléfono es obligatorio.'); return false; }
    return true;
}

function marcarError(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('error');
}

/* ============================================
   HELPERS DE SELECTS (FECHAS)
   ============================================ */
function opcionesMes() {
    let html = '<option value="">Mes</option>';
    const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
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
    const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    if (mes && anio) return `${MESES[parseInt(mes, 10) - 1]} ${anio}`;
    if (anio) return anio;
    return MESES[parseInt(mes, 10) - 1];
}

function formatoFechaNac(dia, mes, anio) {
    if (!dia || !mes || !anio) return '';
    return `${dia}/${mes}/${anio}`;
}

/* ============================================
   MÉTODOS PARA MOVER Y ELIMINAR BLOQUES
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

    // Guardar el nuevo orden en localStorage
    guardarBorrador();
}

function eliminarBloque(id) {
    const bloque = document.getElementById(id);
    if (bloque) {
        bloque.remove();
        // Guardamos el borrador inmediatamente para que no reviva al recargar
        guardarBorrador();
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
   CREACIÓN DE BLOQUES DINÁMICOS
   ============================================ */
function agregarTrabajo() {
    const cont = document.getElementById('lista-trabajos');
    const id = 'trab-' + Date.now() + Math.random().toString(36).slice(2, 6);
    cont.insertAdjacentHTML('beforeend', `
    <div class="bloque" id="${id}">
      ${generarAccionesBloque(id)}
      <label>Puesto <span class="obligatorio">*</span></label>
      <input type="text" class="t-puesto">
      <label>Empresa <span class="obligatorio">*</span></label>
      <input type="text" class="t-empresa">
      <label>Ubicación</label>
      <input type="text" class="t-ubicacion">
      <label>Inicio <span class="obligatorio">*</span></label>
      <div class="fila">
        <select class="t-inicio-mes">${opcionesMes()}</select>
        <select class="t-inicio-anio">${opcionesAnioInicio()}</select>
      </div>
      <label>Fin <span class="opcional">(deja vacío si trabajas ahí actualmente)</span></label>
      <div class="fila">
        <select class="t-fin-mes">${opcionesMes()}</select>
        <select class="t-fin-anio">${opcionesAnioFin()}</select>
      </div>
      <label>Descripción</label>
      <textarea class="t-descripcion" rows="3"></textarea>
      <label>Logros</label>
      <textarea class="t-logros" rows="3" placeholder="Ej: Incrementé las ventas en un 20%"></textarea>
    </div>`);
}

function agregarEstudio() {
    const cont = document.getElementById('lista-estudios');
    const id = 'est-' + Date.now() + Math.random().toString(36).slice(2, 6);
    cont.insertAdjacentHTML('beforeend', `
    <div class="bloque" id="${id}">
      ${generarAccionesBloque(id)}
      <label>Título <span class="obligatorio">*</span></label>
      <input type="text" class="e-titulo">
      <label>Institución <span class="obligatorio">*</span></label>
      <input type="text" class="e-institucion">
      <label>Ubicación</label>
      <input type="text" class="e-ubicacion">
      <label>Inicio</label>
      <div class="fila">
        <select class="e-inicio-mes">${opcionesMes()}</select>
        <select class="e-inicio-anio">${opcionesAnioInicio()}</select>
      </div>
      <label>Fin</label>
      <div class="fila">
        <select class="e-fin-mes">${opcionesMes()}</select>
        <select class="e-fin-anio">${opcionesAnioFin()}</select>
      </div>
      <label>Estado <span class="obligatorio">*</span></label>
      <select class="e-estado">
        <option value="">-- Selecciona --</option>
        <option value="Completado">Completado</option>
        <option value="En curso">En curso</option>
        <option value="Abandonado">Abandonado</option>
      </select>
    </div>`);
}

function agregarProyecto() {
    const cont = document.getElementById('lista-proyectos');
    const id = 'proy-' + Date.now() + Math.random().toString(36).slice(2, 6);
    cont.insertAdjacentHTML('beforeend', `
    <div class="bloque" id="${id}">
      ${generarAccionesBloque(id)}
      <label>Nombre <span class="obligatorio">*</span></label>
      <input type="text" class="p-nombre" placeholder="Ej: Campaña de marketing digital">
      <label>Descripción <span class="obligatorio">*</span></label>
      <textarea class="p-descripcion" rows="3" placeholder="¿Qué hiciste y qué lograste?"></textarea>
      <label>Herramientas o skills</label>
      <input type="text" class="p-tecnologias" placeholder="Ej: Excel, Photoshop, trabajo en equipo">
      <label>Link <span class="opcional">(si aplica)</span></label>
      <input type="url" class="p-link" placeholder="https://...">
      <label>Inicio</label>
      <div class="fila">
        <select class="p-inicio-mes">${opcionesMes()}</select>
        <select class="p-inicio-anio">${opcionesAnioInicio()}</select>
      </div>
      <label>Fin</label>
      <div class="fila">
        <select class="p-fin-mes">${opcionesMes()}</select>
        <select class="p-fin-anio">${opcionesAnioFin()}</select>
      </div>
    </div>`);
}

function agregarHabilidad() {
    const cont = document.getElementById('lista-habilidades');
    const id = 'hab-' + Date.now() + Math.random().toString(36).slice(2, 6);
    cont.insertAdjacentHTML('beforeend', `
    <div class="bloque" id="${id}">
      ${generarAccionesBloque(id)}
      <label>Habilidad <span class="obligatorio">*</span></label>
      <input type="text" class="h-habilidad" placeholder="Ej: Excel, Comunicación">
      <label>Tipo <span class="obligatorio">*</span></label>
      <select class="h-tipo" onchange="toggleNivelHabilidad(this)">
        <option value="">-- Selecciona --</option>
        <option value="Técnica">Técnica</option>
        <option value="Blanda">Blanda</option>
      </select>
      <div class="h-nivel-wrap" style="display:none;">
        <label>Nivel <span class="obligatorio">*</span></label>
        <select class="h-nivel">
          <option value="">-- Selecciona --</option>
          <option value="Básico">Básico</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
          <option value="Experto">Experto</option>
        </select>
      </div>
    </div>`);
}

function toggleNivelHabilidad(select) {
    const bloque = select.closest('.bloque');
    const wrap = bloque.querySelector('.h-nivel-wrap');
    const nivel = bloque.querySelector('.h-nivel');
    if (select.value === 'Técnica') {
        wrap.style.display = 'block';
    } else {
        wrap.style.display = 'none';
        nivel.value = '';
    }
}

function agregarIdioma() {
    const cont = document.getElementById('lista-idiomas');
    const id = 'idi-' + Date.now() + Math.random().toString(36).slice(2, 6);
    cont.insertAdjacentHTML('beforeend', `
    <div class="bloque" id="${id}">
      ${generarAccionesBloque(id)}
      <label>Idioma <span class="obligatorio">*</span></label>
      <input type="text" class="i-idioma" placeholder="Ej: Español, Inglés">
      <label>Nivel <span class="obligatorio">*</span></label>
      <select class="i-nivel">
        <option value="">-- Selecciona --</option>
        <option value="Básico">Básico</option>
        <option value="Intermedio">Intermedio</option>
        <option value="Avanzado">Avanzado</option>
        <option value="Nativo">Nativo</option>
        <option value="Bilingüe">Bilingüe</option>
      </select>
    </div>`);
}

function agregarCertificacion() {
    const cont = document.getElementById('lista-certificaciones');
    const id = 'cert-' + Date.now() + Math.random().toString(36).slice(2, 6);
    cont.insertAdjacentHTML('beforeend', `
    <div class="bloque" id="${id}">
      ${generarAccionesBloque(id)}
      <label>Nombre <span class="obligatorio">*</span></label>
      <input type="text" class="c-nombre">
      <label>Institución</label>
      <input type="text" class="c-institucion">
      <label>Fecha</label>
      <div class="fila">
        <select class="c-fecha-mes">${opcionesMes()}</select>
        <select class="c-fecha-anio">${opcionesAnioFin()}</select>
      </div>
    </div>`);
}

function agregarLicencia() {
    const cont = document.getElementById('lista-licencias');
    const id = 'lic-' + Date.now() + Math.random().toString(36).slice(2, 6);
    cont.insertAdjacentHTML('beforeend', `
    <div class="bloque" id="${id}">
      ${generarAccionesBloque(id)}
      <label>Tipo <span class="obligatorio">*</span></label>
      <input type="text" class="l-tipo" placeholder="Ej: B1, A2">
      <label>Vencimiento</label>
      <div class="fila">
        <select class="l-vencimiento-mes">${opcionesMes()}</select>
        <select class="l-vencimiento-anio">${opcionesAnioFin()}</select>
      </div>
    </div>`);
}

function agregarReferencia() {
    const cont = document.getElementById('lista-referencias');
    const id = 'ref-' + Date.now() + Math.random().toString(36).slice(2, 6);
    cont.insertAdjacentHTML('beforeend', `
    <div class="bloque" id="${id}">
      ${generarAccionesBloque(id)}
      <label>Identificación <span class="obligatorio">*</span></label>
      <input type="text" class="r-identificacion">
      <label>Nombre <span class="obligatorio">*</span></label>
      <input type="text" class="r-nombre">
      <label>Teléfono <span class="obligatorio">*</span></label>
      <input type="tel" class="r-telefono" inputmode="numeric">
      <label>Email</label>
      <input type="email" class="r-email">
      <label>Puesto</label>
      <input type="text" class="r-puesto">
      <label>Empresa</label>
      <input type="text" class="r-empresa">
    </div>`);
}

/* ============================================
   VALIDACIONES DE BLOQUES DINÁMICOS
   ============================================ */
function validarTrabajos() {
    for (const b of document.querySelectorAll('#lista-trabajos .bloque')) {
        const puesto = b.querySelector('.t-puesto').value.trim();
        const empresa = b.querySelector('.t-empresa').value.trim();
        const mesIni = b.querySelector('.t-inicio-mes').value;
        const anioIni = b.querySelector('.t-inicio-anio').value;
        const algoLleno = puesto || empresa || mesIni || anioIni;
        if (algoLleno && (!puesto || !empresa || !mesIni || !anioIni)) {
            mostrarAlerta('En cada trabajo: Puesto, Empresa, Mes y Año de inicio son obligatorios. Si no quieres ese bloque, elimínalo con ✕.');
            return false;
        }
    }
    return true;
}

function validarEstudiosYProyectos() {
    for (const b of document.querySelectorAll('#lista-estudios .bloque')) {
        const titulo = b.querySelector('.e-titulo').value.trim();
        const inst = b.querySelector('.e-institucion').value.trim();
        const estado = b.querySelector('.e-estado').value.trim();
        const algoLleno = titulo || inst || estado;
        if (algoLleno && (!titulo || !inst || !estado)) {
            mostrarAlerta('En cada estudio: Título, Institución y Estado son obligatorios.');
            return false;
        }
    }
    for (const b of document.querySelectorAll('#lista-proyectos .bloque')) {
        const nombre = b.querySelector('.p-nombre').value.trim();
        const desc = b.querySelector('.p-descripcion').value.trim();
        const algoLleno = nombre || desc;
        if (algoLleno && (!nombre || !desc)) {
            mostrarAlerta('En cada proyecto: Nombre y Descripción son obligatorios.');
            return false;
        }
    }
    return true;
}

function validarHabilidadesYMas() {
    for (const b of document.querySelectorAll('#lista-habilidades .bloque')) {
        const habilidad = b.querySelector('.h-habilidad').value.trim();
        const tipo = b.querySelector('.h-tipo').value;
        const nivel = b.querySelector('.h-nivel').value;
        const algoLleno = habilidad || tipo || nivel;

        if (algoLleno) {
            if (!habilidad) { mostrarAlerta('En cada habilidad, el nombre es obligatorio.'); return false; }
            if (!tipo) { mostrarAlerta('Selecciona el tipo de habilidad (Técnica o Blanda).'); return false; }
            if (tipo === 'Técnica' && !nivel) { mostrarAlerta('Si la habilidad es Técnica, indica el nivel.'); return false; }
        }
    }

    const checks = [
        { sel: '#lista-idiomas .bloque', campos: ['.i-idioma', '.i-nivel'], msg: 'idioma (idioma y nivel)' },
        { sel: '#lista-certificaciones .bloque', campos: ['.c-nombre'], msg: 'certificación (nombre)' },
        { sel: '#lista-licencias .bloque', campos: ['.l-tipo'], msg: 'licencia (tipo)' }
    ];
    for (const { sel, campos, msg } of checks) {
        for (const b of document.querySelectorAll(sel)) {
            const valores = campos.map(c => b.querySelector(c).value.trim());
            const algoLleno = valores.some(x => x);
            const todoLleno = valores.every(x => x);
            if (algoLleno && !todoLleno) {
                mostrarAlerta('Completa todos los campos del bloque de ' + msg + ' o elimínalo con ✕.');
                return false;
            }
        }
    }
    return true;
}

/* ============================================
   RECOLECCIÓN DE DATOS (PARA ENVIAR AL SHEET)
   ============================================ */
function recolectarDatos() {
    const bloques = sel => [...document.querySelectorAll(sel)];
    const val = (el, cls) => el.querySelector(cls).value.trim();
    const sel = (el, cls) => el.querySelector(cls).value;

    const telCodigo = v('telefono_codigo');
    const telNumero = soloDigitos(v('telefono'));
    const ubicacionFinal = v('ubicacion');

    return {
        personal: {
            identificacion: normalizarIdentificacion(v('identificacion')),
            nombre: v('nombre'),
            fecha_nacimiento: formatoFechaNac(v('fecha_nac_dia'), v('fecha_nac_mes'), v('fecha_nac_anio')),
            email: v('email'),
            telefono: telCodigo ? `${telCodigo} ${telNumero}` : telNumero,
            ciudad: ubicacionFinal,
            pais: "Costa Rica",
            nacionalidad: v('nacionalidad'),
            estado_civil: v('estado_civil'),
            linkedin: v('linkedin'),
            sitio_web: v('sitio_web')
        },
        resumen: v('resumen'),
        trabajos: bloques('#lista-trabajos .bloque').map(b => ({
            puesto: val(b, '.t-puesto'),
            empresa: val(b, '.t-empresa'),
            ubicacion: val(b, '.t-ubicacion'),
            inicio: formatoMesAnio(sel(b, '.t-inicio-mes'), sel(b, '.t-inicio-anio')),
            fin: formatoMesAnio(sel(b, '.t-fin-mes'), sel(b, '.t-fin-anio')),
            actualidad: !sel(b, '.t-fin-mes') && !sel(b, '.t-fin-anio'),
            descripcion: val(b, '.t-descripcion'),
            logros: val(b, '.t-logros')
        })).filter(t => t.puesto),
        proyectos: bloques('#lista-proyectos .bloque').map(b => ({
            nombre: val(b, '.p-nombre'),
            descripcion: val(b, '.p-descripcion'),
            tecnologias: val(b, '.p-tecnologias'),
            link: val(b, '.p-link'),
            inicio: formatoMesAnio(sel(b, '.p-inicio-mes'), sel(b, '.p-inicio-anio')),
            fin: formatoMesAnio(sel(b, '.p-fin-mes'), sel(b, '.p-fin-anio'))
        })).filter(p => p.nombre),
        estudios: bloques('#lista-estudios .bloque').map(b => ({
            titulo: val(b, '.e-titulo'),
            institucion: val(b, '.e-institucion'),
            ubicacion: val(b, '.e-ubicacion'),
            inicio: formatoMesAnio(sel(b, '.e-inicio-mes'), sel(b, '.e-inicio-anio')),
            fin: formatoMesAnio(sel(b, '.e-fin-mes'), sel(b, '.e-fin-anio')),
            estado: val(b, '.e-estado')
        })).filter(e => e.titulo),
        habilidades: bloques('#lista-habilidades .bloque').map(b => ({
            habilidad: val(b, '.h-habilidad'),
            tipo: sel(b, '.h-tipo'),
            nivel: b.querySelector('.h-tipo').value === 'Técnica' ? sel(b, '.h-nivel') : ''
        })).filter(h => h.habilidad),
        idiomas: bloques('#lista-idiomas .bloque').map(b => ({
            idioma: val(b, '.i-idioma'),
            nivel: val(b, '.i-nivel')
        })).filter(i => i.idioma),
        certificaciones: bloques('#lista-certificaciones .bloque').map(b => ({
            nombre: val(b, '.c-nombre'),
            institucion: val(b, '.c-institucion'),
            fecha: formatoMesAnio(sel(b, '.c-fecha-mes'), sel(b, '.c-fecha-anio'))
        })).filter(c => c.nombre),
        licencias: bloques('#lista-licencias .bloque').map(b => ({
            tipo: val(b, '.l-tipo'),
            vencimiento: formatoMesAnio(sel(b, '.l-vencimiento-mes'), sel(b, '.l-vencimiento-anio'))
        })).filter(l => l.tipo),
        referencias: bloques('#lista-referencias .bloque').map(b => ({
            identificacion: val(b, '.r-identificacion'),
            nombre: val(b, '.r-nombre'),
            telefono: val(b, '.r-telefono'),
            email: val(b, '.r-email'),
            puesto: val(b, '.r-puesto'),
            empresa: val(b, '.r-empresa')
        })).filter(r => r.nombre)
    };
}

/* ============================================
   ENVÍO AL BACKEND Y WHATSAPP
   ============================================ */
let idEnviada = '';

async function enviarFormulario() {
    const checkbox = document.getElementById('consentimiento');

    if (!checkbox.checked) {
        const seccion = document.getElementById('seccion-consentimiento');
        seccion.scrollIntoView({ behavior: 'smooth', block: 'center' });

        const label = document.getElementById('label-consentimiento');
        label.style.borderColor = 'var(--error)';
        label.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';

        setTimeout(() => {
            label.style.borderColor = 'var(--borde)';
            label.style.backgroundColor = 'var(--fondo-suave)';
        }, 2000);

        mostrarAlerta('Debes aceptar la Política de Privacidad para continuar.');
        return;
    }

    const modal = document.getElementById('modal-espera');
    modal.classList.add('activo');

    const datos = recolectarDatos();
    idEnviada = datos.personal.identificacion;

    try {
        const res = await fetch(CONFIG.backend.url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' }
        });
        const json = await res.json();
        modal.classList.remove('activo');

        if (json.existe) {
            document.getElementById('resumen-id-dup').textContent = idEnviada;
            irAPantalla('duplicado');
        } else if (json.ok) {
            document.getElementById('resumen-id-exito').textContent = idEnviada;
            limpiarBorrador();
            irAPantalla('exito');

            setTimeout(() => {
                irAWhatsAppExito();
            }, 3000);

        } else {
            mostrarError('Error: ' + (json.error || 'No se pudo guardar el CV.'));
        }
    } catch (err) {
        modal.classList.remove('activo');
        mostrarError('No pudimos conectar con el servidor. Revisa tu conexión e intenta de nuevo.');
    }
}

function abrirWhatsApp(mensaje) {
    const url = `https://wa.me/${CONFIG.whatsapp.numero}?text=${encodeURIComponent(mensaje)}`;
    window.location.href = url;
}

function irAWhatsAppExito() {
    const msg = `${CONFIG.whatsapp.mensaje_inicial}\n\n- Identificación: ${idEnviada}\n- Nombre: ${v('nombre')}\n- Email: ${v('email')}\n\nQuiero coordinar el pago y recibir mi currículum.`;
    abrirWhatsApp(msg);
}

function irAWhatsAppDuplicado() {
    const msg = `${CONFIG.whatsapp.mensaje_existe}\n\n- Identificación: ${idEnviada}`;
    abrirWhatsApp(msg);
}

/* ============================================
   LOCALSTORAGE (AUTOGUARDADO)
   ============================================ */
const LS_KEY = 'innocr_cv_borrador';

function guardarBorrador() {
    try {
        const datos = recolectarDatos();
        const pasoActual = document.querySelector('.pantalla.activa')?.id || 'pantalla-0';
        localStorage.setItem(LS_KEY, JSON.stringify({ datos, paso: pasoActual, timestamp: Date.now() }));
    } catch (e) { }
}

function limpiarBorrador() {
    localStorage.removeItem(LS_KEY);
}

function limpiarFormulario() {
    ['identificacion', 'nombre', 'email', 'telefono', 'ubicacion', 'linkedin', 'sitio_web'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });

    document.getElementById('fecha_nac_dia').value = '';
    document.getElementById('fecha_nac_mes').value = '';
    document.getElementById('fecha_nac_anio').value = '';
    document.getElementById('telefono_codigo').value = '+506';
    document.getElementById('nacionalidad').value = 'Costa Rica';
    document.getElementById('estado_civil').value = '';
    document.getElementById('resumen').value = '';
    document.getElementById('consentimiento').checked = false;

    ['lista-trabajos', 'lista-estudios', 'lista-proyectos', 'lista-habilidades',
        'lista-idiomas', 'lista-certificaciones', 'lista-licencias', 'lista-referencias']
        .forEach(id => { const c = document.getElementById(id); if (c) c.innerHTML = ''; });

    // Las listas quedan vacías por defecto.

    limpiarBorrador();
}

function volverInicioDesdeExito() {
    limpiarFormulario();
    irAPantalla(0);
}

function restaurarBorrador() {
    try {
        const raw = localStorage.getItem(LS_KEY);
        if (!raw) return false;
        const guardado = JSON.parse(raw);
        if (!guardado.datos) return false;

        const d = guardado.datos;

        if (d.personal) {
            document.getElementById('identificacion').value = d.personal.identificacion || '';
            document.getElementById('nombre').value = d.personal.nombre || '';
            document.getElementById('email').value = d.personal.email || '';
            document.getElementById('nacionalidad').value = d.personal.nacionalidad || 'Costa Rica';
            document.getElementById('estado_civil').value = d.personal.estado_civil || '';
            document.getElementById('linkedin').value = d.personal.linkedin || '';
            document.getElementById('sitio_web').value = d.personal.sitio_web || '';
            document.getElementById('ubicacion').value = d.personal.ciudad || '';

            if (d.personal.telefono) {
                const partes = d.personal.telefono.split(' ');
                if (partes.length >= 2 && partes[0].startsWith('+')) {
                    document.getElementById('telefono_codigo').value = partes[0];
                    document.getElementById('telefono').value = partes.slice(1).join('').replace(/\D/g, '');
                } else {
                    document.getElementById('telefono').value = d.personal.telefono.replace(/\D/g, '');
                }
            }

            if (d.personal.fecha_nacimiento) {
                const [dia, mes, anio] = d.personal.fecha_nacimiento.split('/');
                if (dia) document.getElementById('fecha_nac_dia').value = dia;
                if (mes) document.getElementById('fecha_nac_mes').value = mes;
                if (anio) document.getElementById('fecha_nac_anio').value = anio;
            }
        }

        if (d.resumen) document.getElementById('resumen').value = d.resumen;

        if (d.trabajos && d.trabajos.length) {
            document.getElementById('lista-trabajos').innerHTML = '';
            d.trabajos.forEach(t => {
                agregarTrabajo();
                const b = document.querySelector('#lista-trabajos .bloque:last-child');
                b.querySelector('.t-puesto').value = t.puesto || '';
                b.querySelector('.t-empresa').value = t.empresa || '';
                b.querySelector('.t-ubicacion').value = t.ubicacion || '';
                b.querySelector('.t-descripcion').value = t.descripcion || '';
                b.querySelector('.t-logros').value = t.logros || '';
            });
        }

        if (guardado.paso) {
            const num = guardado.paso.replace('pantalla-', '');
            irAPantalla(num);
        }

        return true;
    } catch (e) {
        return false;
    }
}

function activarAutoguardado() {
    document.addEventListener('input', debounce(guardarBorrador, 600));
    document.addEventListener('change', debounce(guardarBorrador, 600));
}

function debounce(fn, ms) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), ms);
    };
}

/* ============================================
   POBLAR SELECTS E INICIALIZACIÓN
   ============================================ */
function poblarDias() {
    const sel = document.getElementById('fecha_nac_dia');
    for (let d = 1; d <= 31; d++) {
        const val = String(d).padStart(2, '0');
        sel.insertAdjacentHTML('beforeend', `<option value="${val}">${d}</option>`);
    }
}

function poblarAniosNacimiento() {
    const sel = document.getElementById('fecha_nac_anio');
    const actual = new Date().getFullYear();
    for (let y = actual; y >= 1940; y--) {
        sel.insertAdjacentHTML('beforeend', `<option value="${y}">${y}</option>`);
    }
}

function poblarPaises() {
    const selNac = document.getElementById('nacionalidad');
    const PAISES = [
        "Costa Rica", "Argentina", "Belice", "Bolivia", "Brasil", "Canadá", "Chile", "Colombia",
        "Cuba", "Ecuador", "El Salvador", "España", "Estados Unidos", "Guatemala", "Haití",
        "Honduras", "Jamaica", "México", "Nicaragua", "Panamá", "Paraguay", "Perú", "Puerto Rico",
        "República Dominicana", "Uruguay", "Venezuela", "Otro"
    ];
    PAISES.forEach(p => {
        selNac.insertAdjacentHTML('beforeend', `<option value="${p}">${p}</option>`);
    });
    selNac.value = "Costa Rica";
}

function poblarCodigosTel() {
    const sel = document.getElementById('telefono_codigo');
    const CODIGOS_TEL = [
        { code: "+506", name: "Costa Rica" }, { code: "+502", name: "Guatemala" },
        { code: "+503", name: "El Salvador" }, { code: "+504", name: "Honduras" },
        { code: "+505", name: "Nicaragua" }, { code: "+507", name: "Panamá" },
        { code: "+501", name: "Belice" }, { code: "+52", name: "México" },
        { code: "+54", name: "Argentina" }, { code: "+55", name: "Brasil" },
        { code: "+56", name: "Chile" }, { code: "+57", name: "Colombia" },
        { code: "+58", name: "Venezuela" }, { code: "+51", name: "Perú" },
        { code: "+593", name: "Ecuador" }, { code: "+591", name: "Bolivia" },
        { code: "+595", name: "Paraguay" }, { code: "+598", name: "Uruguay" },
        { code: "+53", name: "Cuba" }, { code: "+1809", name: "Rep. Dominicana" },
        { code: "+1787", name: "Puerto Rico" }, { code: "+34", name: "España" },
        { code: "+1", name: "EEUU / Canadá" }, { code: "+44", name: "Reino Unido" },
        { code: "+33", name: "Francia" }, { code: "+49", name: "Alemania" },
        { code: "+39", name: "Italia" }, { code: "+351", name: "Portugal" }
    ];
    CODIGOS_TEL.forEach(c => {
        sel.insertAdjacentHTML('beforeend', `<option value="${c.code}">${c.code} ${c.name}</option>`);
    });
    sel.value = "+506";
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

document.addEventListener('DOMContentLoaded', async () => {
    if (!CONFIG || !CONFIG.backend.url) {
        mostrarAlerta("Error crítico: No se ha cargado data.js o falta la URL del backend.", "Error de Sistema");
        return;
    }

    const esloganEl = document.querySelector('.eslogan');
    if (esloganEl && CONFIG.sitio.eslogan) esloganEl.textContent = CONFIG.sitio.eslogan;

    const precioEl = document.getElementById('precio-bienvenida');
    if (precioEl && CONFIG.servicio.precio) precioEl.textContent = CONFIG.servicio.precio;

    poblarDias();
    poblarAniosNacimiento();
    poblarPaises();
    poblarCodigosTel();
    activarSoloDigitos();

    // EL FORMULARIO INICIA VACÍO (Los bloques se agregan manualmente con el botón)
    const restaurado = restaurarBorrador();
    if (restaurado) {
        console.log('📂 Borrador restaurado desde localStorage');
    }

    activarAutoguardado();
});