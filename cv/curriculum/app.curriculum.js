/* ============================================
   InnoCR — app.curriculum.js
   Lógica del formulario de Currículum
   Requiere: ../data.js, ../app.js
   ============================================ */

(function () {
    'use strict';

    /* ============================================
       1. CONSTANTES Y ESTADO
       ============================================ */
    const LS_KEY_BORRADOR = 'innocr_curriculum_borrador_v1';
    const LS_KEY_ULTIMO_ENVIO = 'innocr_cv_ultimo_envio';
    const TOTAL_PASOS = 5;

    let idEnviada = '';
    let nombreEnviada = '';
    let emailEnviada = '';

    /* ============================================
       2. DATOS ESTÁTICOS (selects)
       ============================================ */
    const PAISES = [
        "Costa Rica", "Argentina", "Belice", "Bolivia", "Brasil", "Canadá", "Chile", "Colombia",
        "Cuba", "Ecuador", "El Salvador", "España", "Estados Unidos", "Guatemala", "Haití",
        "Honduras", "Jamaica", "México", "Nicaragua", "Panamá", "Paraguay", "Perú", "Puerto Rico",
        "República Dominicana", "Uruguay", "Venezuela", "Otro"
    ];

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

    /* ============================================
       3. NAVEGACIÓN ENTRE PANTALLAS
       ============================================ */
    function irAPantalla(n) {
        document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
        const target = document.getElementById('pantalla-' + n);
        if (target) {
            target.classList.add('activa');
            window.scrollTo(0, 0);
            const err = document.getElementById('mensaje-error');
            if (err) err.style.display = 'none';
            guardarBorrador();
        }
    }

    /* ============================================
       4. VALIDACIONES
       ============================================ */
    function validarYAvanzar(pantalla) {
        if (pantalla === 1) { if (!validarDatosPersonales()) return; irAPantalla(2); }
        else if (pantalla === 2) { if (!validarTrabajos()) return; irAPantalla(3); }
        else if (pantalla === 3) { if (!validarEstudiosYProyectos()) return; irAPantalla(4); }
        else if (pantalla === 4) { if (!validarHabilidadesYMas()) return; irAPantalla(5); }
    }

    function validarDatosPersonales() {
        const id = normalizarIdentificacion(getVal('identificacion'));
        const nombre = getVal('nombre');
        const email = getVal('email');
        const telefono = soloDigitos(getVal('telefono'));

        document.querySelectorAll('#pantalla-1 input, #pantalla-1 select').forEach(i => i.classList.remove('error'));

        if (!id) { marcarError('identificacion'); mostrarAlerta('La identificación es obligatoria.'); return false; }
        if (id.length < 5) { marcarError('identificacion'); mostrarAlerta('La identificación parece inválida.'); return false; }
        if (!nombre) { marcarError('nombre'); mostrarAlerta('El nombre es obligatorio.'); return false; }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { marcarError('email'); mostrarAlerta('El correo no es válido.'); return false; }
        if (!telefono || telefono.length < 7) { marcarError('telefono'); mostrarAlerta('El teléfono es obligatorio.'); return false; }
        return true;
    }

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

    function validarReferencias() {
        for (const b of document.querySelectorAll('#lista-referencias .bloque')) {
            const ident = b.querySelector('.r-identificacion').value.trim();
            const nombre = b.querySelector('.r-nombre').value.trim();
            const tel = b.querySelector('.r-telefono').value.trim();
            const algoLleno = ident || nombre || tel;
            if (algoLleno && (!nombre || !tel)) {
                mostrarAlerta('En cada referencia: Nombre y Teléfono son obligatorios.');
                return false;
            }
        }
        return true;
    }

    /* ============================================
       5. HELPERS DE SELECTS (FECHAS)
       ============================================ */
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

    /* ============================================
   6. CREACIÓN DE BLOQUES DINÁMICOS
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
    window.toggleNivelHabilidad = toggleNivelHabilidad;

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
       7. RECOLECCIÓN DE DATOS
       ============================================ */
    function recolectarDatos() {
        const bloques = sel => [...document.querySelectorAll(sel)];
        const val = (el, cls) => el.querySelector(cls).value.trim();
        const sel = (el, cls) => el.querySelector(cls).value;

        const telCodigo = getVal('telefono_codigo');
        const telNumero = soloDigitos(getVal('telefono'));
        const ubicacionFinal = getVal('ubicacion');

        return {
            personal: {
                identificacion: normalizarIdentificacion(getVal('identificacion')),
                nombre: getVal('nombre'),
                fecha_nacimiento: formatoFechaNac(getVal('fecha_nac_dia'), getVal('fecha_nac_mes'), getVal('fecha_nac_anio')),
                email: getVal('email'),
                telefono: telCodigo ? `${telCodigo} ${telNumero}` : telNumero,
                ciudad: ubicacionFinal,
                pais: "Costa Rica",
                nacionalidad: getVal('nacionalidad'),
                estado_civil: getVal('estado_civil'),
                linkedin: getVal('linkedin'),
                sitio_web: getVal('sitio_web')
            },
            resumen: getVal('resumen'),
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
   8. LOCALSTORAGE — BORRADOR
   ============================================ */
    function guardarBorrador() {
        try {
            const datos = recolectarDatos();
            const pasoActual = document.querySelector('.pantalla.activa')?.id || 'pantalla-1';
            localStorage.setItem(LS_KEY_BORRADOR, JSON.stringify({
                datos,
                paso: pasoActual,
                timestamp: Date.now()
            }));
            if (typeof mostrarToast === 'function') mostrarToast('Borrador guardado ✓');
        } catch (e) {
            console.warn('No se pudo guardar el borrador:', e);
        }
    }

    const guardarBorradorDebounced = debounce(guardarBorrador, 800);

    function limpiarBorrador() {
        localStorage.removeItem(LS_KEY_BORRADOR);
    }

    function limpiarFormulario() {
        ['identificacion', 'nombre', 'email', 'telefono', 'ubicacion', 'linkedin', 'sitio_web'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });

        const fechaDia = document.getElementById('fecha_nac_dia');
        const fechaMes = document.getElementById('fecha_nac_mes');
        const fechaAnio = document.getElementById('fecha_nac_anio');
        if (fechaDia) fechaDia.value = '';
        if (fechaMes) fechaMes.value = '';
        if (fechaAnio) fechaAnio.value = '';

        const telCod = document.getElementById('telefono_codigo');
        if (telCod) telCod.value = '+506';

        const nac = document.getElementById('nacionalidad');
        if (nac) nac.value = 'Costa Rica';

        const civil = document.getElementById('estado_civil');
        if (civil) civil.value = '';

        const resumen = document.getElementById('resumen');
        if (resumen) resumen.value = '';

        const cons = document.getElementById('consentimiento');
        if (cons) cons.checked = false;

        ['lista-trabajos', 'lista-estudios', 'lista-proyectos', 'lista-habilidades',
            'lista-idiomas', 'lista-certificaciones', 'lista-licencias', 'lista-referencias']
            .forEach(id => { const c = document.getElementById(id); if (c) c.innerHTML = ''; });

        limpiarBorrador();
    }

    /* ============================================
       9. RESTAURAR BORRADOR (COMPLETO)
       ============================================ */
    function restaurarBorrador() {
        try {
            const raw = localStorage.getItem(LS_KEY_BORRADOR);
            if (!raw) return false;
            const guardado = JSON.parse(raw);
            if (!guardado.datos) return false;

            const d = guardado.datos;
            const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.value = v || ''; };

            if (d.personal) {
                const p = d.personal;
                setVal('identificacion', p.identificacion);
                setVal('nombre', p.nombre);
                setVal('email', p.email);
                setVal('ubicacion', p.ciudad);
                setVal('linkedin', p.linkedin);
                setVal('sitio_web', p.sitio_web);

                const nac = document.getElementById('nacionalidad');
                if (nac && p.nacionalidad) nac.value = p.nacionalidad;

                const civil = document.getElementById('estado_civil');
                if (civil && p.estado_civil) civil.value = p.estado_civil;

                if (p.telefono) {
                    const partes = p.telefono.split(' ');
                    if (partes.length >= 2 && partes[0].startsWith('+')) {
                        const cod = document.getElementById('telefono_codigo');
                        if (cod) cod.value = partes[0];
                        setVal('telefono', partes.slice(1).join('').replace(/\D/g, ''));
                    } else {
                        setVal('telefono', p.telefono.replace(/\D/g, ''));
                    }
                }

                if (p.fecha_nacimiento) {
                    const [dia, mes, anio] = p.fecha_nacimiento.split('/');
                    setVal('fecha_nac_dia', dia);
                    setVal('fecha_nac_mes', mes);
                    setVal('fecha_nac_anio', anio);
                }
            }

            const resumen = document.getElementById('resumen');
            if (resumen && d.resumen) resumen.value = d.resumen;

            if (Array.isArray(d.trabajos) && d.trabajos.length) {
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

            if (Array.isArray(d.estudios) && d.estudios.length) {
                document.getElementById('lista-estudios').innerHTML = '';
                d.estudios.forEach(e => {
                    agregarEstudio();
                    const b = document.querySelector('#lista-estudios .bloque:last-child');
                    b.querySelector('.e-titulo').value = e.titulo || '';
                    b.querySelector('.e-institucion').value = e.institucion || '';
                    b.querySelector('.e-ubicacion').value = e.ubicacion || '';
                    b.querySelector('.e-estado').value = e.estado || '';
                });
            }

            if (Array.isArray(d.proyectos) && d.proyectos.length) {
                document.getElementById('lista-proyectos').innerHTML = '';
                d.proyectos.forEach(p => {
                    agregarProyecto();
                    const b = document.querySelector('#lista-proyectos .bloque:last-child');
                    b.querySelector('.p-nombre').value = p.nombre || '';
                    b.querySelector('.p-descripcion').value = p.descripcion || '';
                    b.querySelector('.p-tecnologias').value = p.tecnologias || '';
                    b.querySelector('.p-link').value = p.link || '';
                });
            }

            if (Array.isArray(d.habilidades) && d.habilidades.length) {
                document.getElementById('lista-habilidades').innerHTML = '';
                d.habilidades.forEach(h => {
                    agregarHabilidad();
                    const b = document.querySelector('#lista-habilidades .bloque:last-child');
                    b.querySelector('.h-habilidad').value = h.habilidad || '';
                    b.querySelector('.h-tipo').value = h.tipo || '';
                    if (h.tipo === 'Técnica') {
                        b.querySelector('.h-nivel-wrap').style.display = 'block';
                        b.querySelector('.h-nivel').value = h.nivel || '';
                    }
                });
            }

            if (Array.isArray(d.idiomas) && d.idiomas.length) {
                document.getElementById('lista-idiomas').innerHTML = '';
                d.idiomas.forEach(i => {
                    agregarIdioma();
                    const b = document.querySelector('#lista-idiomas .bloque:last-child');
                    b.querySelector('.i-idioma').value = i.idioma || '';
                    b.querySelector('.i-nivel').value = i.nivel || '';
                });
            }

            if (Array.isArray(d.certificaciones) && d.certificaciones.length) {
                document.getElementById('lista-certificaciones').innerHTML = '';
                d.certificaciones.forEach(c => {
                    agregarCertificacion();
                    const b = document.querySelector('#lista-certificaciones .bloque:last-child');
                    b.querySelector('.c-nombre').value = c.nombre || '';
                    b.querySelector('.c-institucion').value = c.institucion || '';
                });
            }

            if (Array.isArray(d.licencias) && d.licencias.length) {
                document.getElementById('lista-licencias').innerHTML = '';
                d.licencias.forEach(l => {
                    agregarLicencia();
                    const b = document.querySelector('#lista-licencias .bloque:last-child');
                    b.querySelector('.l-tipo').value = l.tipo || '';
                });
            }

            if (Array.isArray(d.referencias) && d.referencias.length) {
                document.getElementById('lista-referencias').innerHTML = '';
                d.referencias.forEach(r => {
                    agregarReferencia();
                    const b = document.querySelector('#lista-referencias .bloque:last-child');
                    b.querySelector('.r-identificacion').value = r.identificacion || '';
                    b.querySelector('.r-nombre').value = r.nombre || '';
                    b.querySelector('.r-telefono').value = r.telefono || '';
                    b.querySelector('.r-email').value = r.email || '';
                    b.querySelector('.r-puesto').value = r.puesto || '';
                    b.querySelector('.r-empresa').value = r.empresa || '';
                });
            }

            if (guardado.paso) {
                const num = String(guardado.paso).replace('pantalla-', '');
                if (!isNaN(num)) irAPantalla(parseInt(num, 10));
            }

            return true;
        } catch (e) {
            console.warn('No se pudo restaurar el borrador:', e);
            return false;
        }
    }

    function activarAutoguardado() {
        document.addEventListener('input', guardarBorradorDebounced);
        document.addEventListener('change', guardarBorradorDebounced);
    }

    /* ============================================
       10. POBLAR SELECTS
       ============================================ */
    function poblarDias() {
        const sel = document.getElementById('fecha_nac_dia');
        if (!sel) return;
        for (let d = 1; d <= 31; d++) {
            const val = String(d).padStart(2, '0');
            sel.insertAdjacentHTML('beforeend', `<option value="${val}">${d}</option>`);
        }
    }

    function poblarAniosNacimiento() {
        const sel = document.getElementById('fecha_nac_anio');
        if (!sel) return;
        const actual = new Date().getFullYear();
        for (let y = actual; y >= 1940; y--) {
            sel.insertAdjacentHTML('beforeend', `<option value="${y}">${y}</option>`);
        }
    }

    function poblarPaises() {
        const sel = document.getElementById('nacionalidad');
        if (!sel) return;
        PAISES.forEach(p => {
            sel.insertAdjacentHTML('beforeend', `<option value="${p}">${p}</option>`);
        });
        sel.value = "Costa Rica";
    }

    function poblarCodigosTel() {
        const sel = document.getElementById('telefono_codigo');
        if (!sel) return;
        CODIGOS_TEL.forEach(c => {
            sel.insertAdjacentHTML('beforeend', `<option value="${c.code}">${c.code} ${c.name}</option>`);
        });
        sel.value = "+506";
    }

    /* ============================================
       11. BANNER "BORRADOR RESTAURADO"
       ============================================ */
    function mostrarBannerBorrador() {
        const contenido = document.querySelector('#pantalla-1 .contenido');
        if (!contenido) return;

        const banner = document.createElement('div');
        banner.className = 'banner-borrador';
        banner.innerHTML = `
            <i class="fa-solid fa-clock-rotate-left"></i>
            <span>Recuperamos tu borrador anterior.</span>
            <button type="button" id="btn-vaciar-borrador">Empezar de cero</button>
        `;
        contenido.insertBefore(banner, contenido.firstChild);

        banner.querySelector('#btn-vaciar-borrador').addEventListener('click', () => {
            if (confirm('¿Seguro que quieres borrar el borrador y empezar de cero?')) {
                limpiarFormulario();
                banner.remove();
                mostrarToast('Formulario vaciado');
            }
        });
    }

    /* ============================================
       12. ENVÍO AL BACKEND
       ============================================ */
    async function enviarFormulario() {
        const checkbox = document.getElementById('consentimiento');

        if (!checkbox.checked) {
            const seccion = document.getElementById('seccion-consentimiento');
            if (seccion) seccion.scrollIntoView({ behavior: 'smooth', block: 'center' });

            const label = document.getElementById('label-consentimiento');
            if (label) {
                label.style.borderColor = 'var(--error)';
                label.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                setTimeout(() => {
                    label.style.borderColor = 'var(--borde)';
                    label.style.backgroundColor = 'var(--fondo-suave)';
                }, 2000);
            }

            mostrarAlerta('Debes aceptar la Política de Privacidad para continuar.');
            return;
        }

        if (!validarReferencias()) return;

        const modal = document.getElementById('modal-espera');
        if (modal) modal.classList.add('activo');

        const btn = document.getElementById('btn-enviar');
        if (btn) {
            btn.classList.add('cargando');
            btn.disabled = true;
        }

        const datos = recolectarDatos();
        idEnviada = datos.personal.identificacion;
        nombreEnviada = datos.personal.nombre;
        emailEnviada = datos.personal.email;

        try {
            const res = await fetch(CONFIG.backend.url, {
                method: 'POST',
                body: JSON.stringify(datos),
                headers: { 'Content-Type': 'text/plain;charset=utf-8' }
            });

            let json = null;
            try { json = await res.json(); } catch (_) { json = null; }

            if (modal) modal.classList.remove('activo');
            if (btn) {
                btn.classList.remove('cargando');
                btn.disabled = false;
            }

            if (json && json.existe) {
                document.getElementById('resumen-id-dup').textContent = idEnviada;
                irAPantalla('duplicado');
            } else if (json && json.ok) {
                document.getElementById('resumen-id-exito').textContent = idEnviada;

                try {
                    localStorage.setItem(LS_KEY_ULTIMO_ENVIO, JSON.stringify({
                        personal: datos.personal,
                        timestamp: Date.now()
                    }));
                } catch (e) { }

                limpiarBorrador();
                irAPantalla('exito');

                setTimeout(() => {
                    abrirModalUpsell();
                }, 800);
            } else {
                const msg = (json && json.error) ? json.error : 'No se pudo guardar el CV. Intenta de nuevo.';
                mostrarError(msg);
            }
        } catch (err) {
            console.error(err);
            if (modal) modal.classList.remove('activo');
            if (btn) {
                btn.classList.remove('cargando');
                btn.disabled = false;
            }
            mostrarError('No pudimos conectar con el servidor. Revisa tu conexión e intenta de nuevo.');
        }
    }

    function mostrarError(msg) {
        const el = document.getElementById('mensaje-error');
        if (el) {
            el.textContent = msg;
            el.style.display = 'block';
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    /* ============================================
       13. WHATSAPP Y UPSELL
       ============================================ */
    function irAWhatsAppExito() {
        const base = CONFIG.whatsapp.mensajes_cv.inicial;
        const msg = `${base}\n\n- Identificación: ${idEnviada}\n- Nombre: ${nombreEnviada}\n- Email: ${emailEnviada}\n\nVi que también ofrecen cartas de recomendación, ¿me cuentan más?`;
        abrirWhatsApp(msg);
    }

    function irAWhatsAppDuplicado() {
        const base = CONFIG.whatsapp.mensajes_cv.existe;
        const msg = `${base}\n\n- Identificación: ${idEnviada}`;
        abrirWhatsApp(msg);
    }

    function abrirModalUpsell() {
        const modal = document.getElementById('modal-upsell');
        if (!modal) return;

        const precioEl = document.getElementById('upsell-precio');
        if (precioEl && CONFIG && CONFIG.servicios && CONFIG.servicios.carta) {
            precioEl.textContent = CONFIG.servicios.carta.precio_texto;
        }

        modal.classList.add('activo');
    }

    function cerrarModalUpsell() {
        const modal = document.getElementById('modal-upsell');
        if (modal) modal.classList.remove('activo');
    }

    function irACrearCartas() {
        cerrarModalUpsell();
        window.location.href = '../recomendacion/index.html?from=cv';
    }

    function irAWhatsAppDesdeUpsell() {
        cerrarModalUpsell();
        irAWhatsAppExito();
    }

    function volverInicioDesdeExito() {
        limpiarFormulario();
        window.location.href = '../index.html';
    }

    /* ============================================
       14. INICIALIZACIÓN
       ============================================ */
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof CONFIG === 'undefined' || !CONFIG.backend || !CONFIG.backend.url) {
            mostrarAlerta("Error crítico: No se ha cargado data.js o falta la URL del backend.", "Error de Sistema");
            return;
        }

        // Poblar selects estáticos
        poblarDias();
        poblarAniosNacimiento();
        poblarPaises();
        poblarCodigosTel();

        // Registrar callbacks en app.js
        if (typeof registrarCallbackGuardado === 'function') {
            registrarCallbackGuardado(guardarBorrador);
        }

        // Restaurar borrador (si existe)
        const restaurado = restaurarBorrador();
        if (restaurado) {
            setTimeout(mostrarBannerBorrador, 100);
        }

        // Activar autoguardado
        activarAutoguardado();

        // Exponer funciones usadas por onclick inline del HTML
        window.irAPantalla = irAPantalla;
        window.validarYAvanzar = validarYAvanzar;
        window.agregarTrabajo = agregarTrabajo;
        window.agregarEstudio = agregarEstudio;
        window.agregarProyecto = agregarProyecto;
        window.agregarHabilidad = agregarHabilidad;
        window.agregarIdioma = agregarIdioma;
        window.agregarCertificacion = agregarCertificacion;
        window.agregarLicencia = agregarLicencia;
        window.agregarReferencia = agregarReferencia;
        window.enviarFormulario = enviarFormulario;
        window.irAWhatsAppExito = irAWhatsAppExito;
        window.irAWhatsAppDuplicado = irAWhatsAppDuplicado;
        window.volverInicioDesdeExito = volverInicioDesdeExito;
        window.irACrearCartas = irACrearCartas;
        window.irAWhatsAppDesdeUpsell = irAWhatsAppDesdeUpsell;
    });

})();