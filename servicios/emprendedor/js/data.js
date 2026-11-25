/* ============================================
   Emprendedor InnoCR — data.js
   Datos variables del sitio. Editar aquí sin tocar código.
   ============================================ */

const CONFIG = {

    whatsapp: {
        numero: "50670373820",
        mensajeBase: "Hola, "
    },

    moneda: {
        simbolo: "₡",
        codigo: "CRC",
        locale: "es-CR"
    },

    avisoLegalFooter: "Emprendedor InnoCR es un servicio independiente de asesoría y acompañamiento para emprendedores. No somos una institución pública, no representamos a Hacienda, SICOP ni a ninguna entidad del Estado. Los costos oficiales de cada trámite se pagan aparte.",

    analytics: {
        gtm_id: "GTM-PHGKWSVQ",
        ls_key_consent: "innocr_cookies_consent_v1"
    },

    /* --------------------------------------------
       CATEGORÍAS DEL HUB
       tipo: "productos" | "info" | "enlaces"
       -------------------------------------------- */
    categorias: [

        // ==========================================
        // CATEGORÍA 1: SERVICIOS
        // ==========================================
        {
            id: 1,
            titulo: "Servicios",
            tipo: "productos",
            items: [

                // ---------- FACTURACIÓN ELECTRÓNICA ----------
                {
                    id: 1,
                    titulo: "Facturación Electrónica",
                    descripcion: "Te guiamos para emitir facturas electrónicas con un proveedor aliado autorizado.",
                    tag: "Aliado comercial",
                    icono: "fa-solid fa-file-invoice-dollar",
                    activo: true,
                    modo: "solo-info", // No tiene formulario, solo info + WhatsApp
                    campos: [
                        {
                            id: 1, clave: "legal", tipo: "checkbox-legal",
                            label: "Entiendo que Emprendedor InnoCR es un asesor independiente y que la facturación electrónica la provee un aliado comercial autorizado. No somos Hacienda ni una institución pública.",
                            requerido: true
                        }
                    ],
                    mensajeWhatsApp: "Hola, me interesa la facturación electrónica con su aliado. ¿Ya estoy registrado en Hacienda? [Sí / No / No sé]. Quiero que me guíen en el proceso."
                },

                // ---------- TARJETA DE PRESENTACIÓN WEB ----------
                {
                    id: 2,
                    titulo: "Tarjeta de Presentación Web",
                    descripcion: "Tu negocio en una página web con URL propia y código QR. Incluye ubicación, redes y contacto.",
                    tag: "₡5.000 / año",
                    icono: "fa-solid fa-address-card",
                    activo: true,
                    modo: "formulario",
                    multipaso: true,
                    precio: { oficial: 5000, gestion: 0, feeUnico: true },
                    notaPrecio: "El enlace se activa una vez confirmado el pago. Incluye URL en subdominio InnoCR y código QR.",
                    pasos: [
                        {
                            titulo: "Datos del negocio",
                            campos: [
                                { id: 1, clave: "nombreNegocio", tipo: "text", label: "Nombre del negocio", requerido: true, placeholder: "Ej: Panadería La Esquina" },
                                { id: 2, clave: "eslogan", tipo: "text", label: "Eslogan (opcional)", requerido: false, placeholder: "Ej: El mejor pan de la zona" },
                                { id: 3, clave: "ubicacion", tipo: "text", label: "Ubicación", requerido: true, placeholder: "Ej: Cañas, Guanacaste" },
                                { id: 4, clave: "descripcionNegocio", tipo: "text", label: "Descripción breve", requerido: true, placeholder: "Ej: Panadería artesanal con 10 años de experiencia" }
                            ]
                        },
                        {
                            titulo: "Contacto y redes",
                            campos: [
                                { id: 5, clave: "whatsappNegocio", tipo: "text", label: "Número de WhatsApp", requerido: true, placeholder: "Ej: 50688888888" },
                                { id: 6, clave: "correoNegocio", tipo: "text", label: "Correo electrónico", requerido: true, placeholder: "Ej: contacto@minegocio.com" },
                                { id: 7, clave: "redesSociales", tipo: "text", label: "Redes sociales (separadas por coma)", requerido: false, placeholder: "Ej: facebook.com/minegocio, instagram.com/minegocio" },
                                { id: 8, clave: "sitioWebExistente", tipo: "text", label: "Sitio web existente (opcional)", requerido: false, placeholder: "Ej: www.minegocio.com" }
                            ]
                        },
                        {
                            titulo: "Confirmación",
                            campos: [
                                {
                                    id: 9, clave: "legal", tipo: "checkbox-legal",
                                    label: "Autorizo a Emprendedor InnoCR a usar estos datos para crear mi tarjeta de presentación web y contactarme por WhatsApp. Entiendo que mis datos se guardan en Google Sheets y que el enlace se activa una vez confirmado el pago de ₡5.000.",
                                    requerido: true
                                }
                            ]
                        }
                    ],
                    mensajeWhatsApp: "Hola, quiero mi tarjeta de presentación web. Mi negocio se llama {nombreNegocio}, está en {ubicacion}. Mi WhatsApp es {whatsappNegocio} y mi correo es {correoNegocio}. Entiendo que el costo es ₡5.000 anuales y que el enlace se activa tras confirmar el pago."
                },

                // ---------- SITIO WEB ----------
                {
                    id: 3,
                    titulo: "Sitio Web",
                    descripcion: "Creamos tu landing page o sistema web completo. Paquetes a la medida de tu negocio.",
                    tag: "Cotización personalizada",
                    icono: "fa-solid fa-laptop-code",
                    activo: true,
                    modo: "formulario",
                    multipaso: true,
                    precio: { oficial: null, gestion: 0, feeUnico: true },
                    notaPrecio: "El precio depende del tipo de proyecto, funcionalidades y si querés dominio propio o URL InnoCR.",
                    pasos: [
                        {
                            titulo: "Tipo de proyecto",
                            campos: [
                                {
                                    id: 1, clave: "tipoProyecto", tipo: "modal-select",
                                    label: "¿Qué tipo de sitio necesitás?", requerido: true, multiple: false,
                                    opciones: [
                                        { id: 1, nombre: "Landing Esencial", descripcion: "1 página, formulario de contacto, diseño responsive, URL InnoCR" },
                                        { id: 2, nombre: "Sitio Profesional", descripcion: "Varias secciones, integración con redes, correo corporativo opcional" },
                                        { id: 3, nombre: "Sistema a Medida", descripcion: "Funcionalidades específicas, base de datos, lógica de negocio" }
                                    ]
                                },
                                {
                                    id: 2, clave: "dominio", tipo: "modal-select",
                                    label: "¿Cómo querés tu dirección web?", requerido: true, multiple: false,
                                    opciones: [
                                        { id: 1, nombre: "URL InnoCR", descripcion: "Incluida en el paquete. Ej: minegocio.innocr.cr" },
                                        { id: 2, nombre: "Dominio personalizado", descripcion: "El dominio se compra a tu nombre. Costo aparte." },
                                        { id: 3, nombre: "No estoy seguro", descripcion: "Te asesoramos en la llamada" }
                                    ]
                                }
                            ]
                        },
                        {
                            titulo: "Detalles del proyecto",
                            campos: [
                                { id: 3, clave: "funcionalidades", tipo: "text", label: "¿Qué funcionalidades necesitás?", requerido: true, placeholder: "Ej: catálogo, carrito, blog, reservas, login..." },
                                { id: 4, clave: "presupuesto", tipo: "text", label: "Presupuesto estimado (opcional)", requerido: false, placeholder: "Ej: ₡150.000 - ₡300.000" },
                                { id: 5, clave: "plazo", tipo: "text", label: "Plazo deseado (opcional)", requerido: false, placeholder: "Ej: 1 mes, 2 meses..." }
                            ]
                        },
                        {
                            titulo: "Tus datos",
                            campos: [
                                { id: 6, clave: "nombre", tipo: "text", label: "Nombre completo", requerido: true, placeholder: "Tu nombre" },
                                { id: 7, clave: "whatsapp", tipo: "text", label: "WhatsApp", requerido: true, placeholder: "Ej: 50688888888" },
                                { id: 8, clave: "correo", tipo: "text", label: "Correo electrónico", requerido: true, placeholder: "Ej: tu@correo.com" },
                                {
                                    id: 9, clave: "legal", tipo: "checkbox-legal",
                                    label: "Entiendo que Emprendedor InnoCR es un equipo de ingenieros en TI y que el precio final se cotiza según los detalles de mi proyecto.",
                                    requerido: true
                                }
                            ]
                        }
                    ],
                    mensajeWhatsApp: "Hola, quiero cotizar un sitio web. Tipo de proyecto: {tipoProyecto}. Dominio: {dominio}. Funcionalidades: {funcionalidades}. Presupuesto estimado: {presupuesto}. Plazo: {plazo}. Mi nombre es {nombre}, mi WhatsApp es {whatsapp} y mi correo es {correo}. Entiendo que el precio final se cotiza según los detalles."
                },

                // ---------- SICOP ----------
                {
                    id: 4,
                    titulo: "Asesoría SICOP",
                    descripcion: "Te acompañamos para que tu empresa participe en licitaciones públicas por medio del SICOP.",
                    tag: "Asesoría",
                    icono: "fa-solid fa-gavel",
                    activo: true,
                    modo: "solo-info",
                    campos: [
                        {
                            id: 1, clave: "legal", tipo: "checkbox-legal",
                            label: "Entiendo que Emprendedor InnoCR es un asesor independiente. No gestionamos el registro en SICOP por vos ni garantizamos adjudicaciones; te damos el conocimiento y la guía para que lo hagas con confianza.",
                            requerido: true
                        }
                    ],
                    mensajeWhatsApp: "Hola, quiero asesoría para licitaciones SICOP. ¿Tengo firma digital? [Sí / No]. Mi negocio se dedica a [X] y quiero entender cómo empezar."
                },

                // ---------- CORREO CORPORATIVO ----------
                {
                    id: 5,
                    titulo: "Correo Corporativo",
                    descripcion: "Configuramos correos profesionales con tu dominio para que tu negocio se vea serio.",
                    tag: "Complementario",
                    icono: "fa-solid fa-envelope",
                    activo: true,
                    modo: "solo-info",
                    campos: [
                        {
                            id: 1, clave: "legal", tipo: "checkbox-legal",
                            label: "Entiendo que Emprendedor InnoCR configura el correo corporativo con el proveedor que yo elija y que el costo del proveedor se paga aparte.",
                            requerido: true
                        }
                    ],
                    mensajeWhatsApp: "Hola, quiero correo corporativo para mi negocio. Ya tengo dominio? [Sí / No]. Mi negocio se llama [X] y quiero que me asesoren."
                },

                // ---------- DISEÑO DE LOGO ----------
                {
                    id: 6,
                    titulo: "Diseño de Logo",
                    descripcion: "Creamos la identidad visual de tu marca: logo, colores y tipografía.",
                    tag: "Complementario",
                    icono: "fa-solid fa-palette",
                    activo: true,
                    modo: "solo-info",
                    campos: [
                        {
                            id: 1, clave: "legal", tipo: "checkbox-legal",
                            label: "Entiendo que Emprendedor InnoCR cotiza el diseño de logo según la complejidad de la marca y que el precio final se confirma por WhatsApp.",
                            requerido: true
                        }
                    ],
                    mensajeWhatsApp: "Hola, quiero diseño de logo para mi negocio. Mi negocio se llama [X] y se dedica a [Y]. Quiero que me coticen."
                },

                // ---------- SOFTWARE A MEDIDA ----------
                {
                    id: 7,
                    titulo: "Software a Medida",
                    descripcion: "Desarrollamos sistemas web a la medida de tu operación: inventarios, facturación interna, CRM y más.",
                    tag: "Complementario",
                    icono: "fa-solid fa-code",
                    activo: true,
                    modo: "solo-info",
                    campos: [
                        {
                            id: 1, clave: "legal", tipo: "checkbox-legal",
                            label: "Entiendo que Emprendedor InnoCR es un equipo de ingenieros en TI y que el software a medida se cotiza según los requerimientos de mi negocio.",
                            requerido: true
                        }
                    ],
                    mensajeWhatsApp: "Hola, quiero cotizar software a medida para mi negocio. Mi negocio se llama [X] y necesito [Y]. Quiero que me asesoren."
                }

            ]
        },

        // ==========================================
        // CATEGORÍA 2: INFORMACIÓN (gratuita)
        // ==========================================
        {
            id: 2,
            titulo: "Información",
            tipo: "info",
            items: [
                {
                    id: 1,
                    titulo: "¿Cómo empezar a facturar?",
                    descripcion: "Guía básica: qué necesitás, requisitos y pasos para emitir facturas electrónicas.",
                    tag: "Gratis",
                    icono: "fa-solid fa-circle-info",
                    tipoModal: "guiaFacturacion"
                },
                {
                    id: 2,
                    titulo: "¿Qué es el SICOP?",
                    descripcion: "Conocé el sistema de compras públicas y cómo tu empresa puede participar.",
                    tag: "Gratis",
                    icono: "fa-solid fa-circle-info",
                    tipoModal: "guiaSicop"
                }
            ]
        },

        // ==========================================
        // CATEGORÍA 3: ENLACES ÚTILES
        // ==========================================
        {
            id: 3,
            titulo: "Enlaces útiles",
            tipo: "enlaces",
            items: [
                {
                    id: 1,
                    nombre: "Hacienda / ATV",
                    entidad: "Ministerio de Hacienda",
                    url: "https://www.hacienda.go.cr/",
                    descripcion: "Registrate y gestioná tus obligaciones tributarias."
                },
                {
                    id: 2,
                    nombre: "SICOP",
                    entidad: "Sistema de Compras Públicas",
                    url: "https://www.sicop.go.cr/",
                    descripcion: "Portal oficial de compras públicas de Costa Rica."
                },
                {
                    id: 3,
                    nombre: "Firma Digital",
                    entidad: "Banco Central de Costa Rica",
                    url: "https://www.bccr.fi.cr/firma-digital",
                    descripcion: "Información y solicitud de firma digital móvil."
                }
            ]
        }

    ],

    /* --------------------------------------------
       TEXTOS LEGALES
       -------------------------------------------- */
    textosLegales: {
        privacidad: "Emprendedor InnoCR es un servicio independiente de asesoría y acompañamiento para emprendedores. No somos una institución pública ni representamos a Hacienda, SICOP, MOPT ni a ninguna entidad del Estado.\n\nLos datos que ingresás en los formularios (nombre, cédula, contacto, datos del negocio) se envían por WhatsApp al número de contacto de Emprendedor InnoCR para coordinar el servicio que solicitás. En el caso de la Tarjeta de Presentación Web, los datos se guardan en un Google Sheet privado para gestionar el registro y la renovación. No almacenamos tus datos en servidores propios.\n\nLos costos oficiales de cada trámite se pagan aparte y se te informan antes de cualquier pago. Emprendedor InnoCR cobra únicamente un costo de gestión o asesoría por el acompañamiento.\n\nPara consultas sobre tus datos, escribinos al WhatsApp 50670373820.",
        cookies: "En InnoCR utilizamos cookies y tecnologías similares para analizar cómo navegas en nuestro sitio y mejorar tu experiencia.\n\n1. ¿Qué son las cookies? Son pequeños archivos que se almacenan en tu dispositivo cuando visitas un sitio web. Nos permiten recordar tus preferencias y entender cómo usas el sitio.\n\n2. Tipos de cookies que usamos:\n   • Cookies técnicas necesarias: permiten el funcionamiento básico del sitio y recordar tu decisión sobre este aviso. No requieren consentimiento.\n   • Cookies analíticas: usamos Google Analytics (a través de Google Tag Manager) para medir de forma anónima cuántas personas visitan el sitio, qué páginas ven y cómo navegan. Esta información nos ayuda a mejorar el contenido y la experiencia.\n\n3. Base legal: Tratamos cookies analíticas únicamente con tu consentimiento, conforme a la Ley N.° 8968 de Costa Rica.\n\n4. Control: Puedes aceptar o rechazar las cookies analíticas desde el aviso que aparece al entrar al sitio. Si las rechazas, no cargaremos Google Analytics y no se enviará información a Google. También puedes borrar las cookies desde la configuración de tu navegador en cualquier momento.\n\n5. Cambios: Si actualizamos esta política, lo indicaremos en este mismo sitio.\n\nSi tienes dudas, escríbenos a info@innocr.com.",
        guiaFacturacion: "Para empezar a facturar electrónicamente en Costa Rica necesitás:\n\n1. Estar inscrito en Hacienda (RUC activo).\n2. Contar con firma digital o un proveedor autorizado de facturación electrónica.\n3. Elegir un sistema de facturación (te guiamos con nuestro aliado comercial).\n4. Configurar tus datos y certificados.\n5. Empezar a emitir facturas.\n\nEn Emprendedor InnoCR te acompañamos en todo el proceso. Escribinos por WhatsApp y te guiamos paso a paso.",
        guiaSicop: "El SICOP (Sistema de Compras Públicas) es la plataforma del Estado costarricense para licitaciones públicas.\n\nPara participar necesitás:\n\n1. Estar inscrito como proveedor en SICOP.\n2. Contar con firma digital vigente.\n3. Estar al día con la CCSS y Hacienda.\n4. Conocer los tipos de licitación (bienes, servicios, obras).\n\nEn Emprendedor InnoCR te asesoramos para que tu empresa participe con confianza. No gestionamos el registro por vos ni garantizamos adjudicaciones. Escribinos por WhatsApp y te orientamos."
    },

    /* --------------------------------------------
       MODALES DE INFORMACIÓN (guías)
       -------------------------------------------- */
    modalesInfo: {
        guiaFacturacion: {
            titulo: "¿Cómo empezar a facturar?",
            texto: "Para empezar a facturar electrónicamente en Costa Rica necesitás:\n\n1. Estar inscrito en Hacienda (RUC activo).\n2. Contar con firma digital o un proveedor autorizado de facturación electrónica.\n3. Elegir un sistema de facturación (te guiamos con nuestro aliado comercial).\n4. Configurar tus datos y certificados.\n5. Empezar a emitir facturas.\n\nEn Emprendedor InnoCR te acompañamos en todo el proceso. Escribinos por WhatsApp y te guiamos paso a paso."
        },
        guiaSicop: {
            titulo: "¿Qué es el SICOP?",
            texto: "El SICOP (Sistema de Compras Públicas) es la plataforma del Estado costarricense para licitaciones públicas.\n\nPara participar necesitás:\n\n1. Estar inscrito como proveedor en SICOP.\n2. Contar con firma digital vigente.\n3. Estar al día con la CCSS y Hacienda.\n4. Conocer los tipos de licitación (bienes, servicios, obras).\n\nEn Emprendedor InnoCR te asesoramos para que tu empresa participe con confianza. No gestionamos el registro por vos ni garantizamos adjudicaciones. Escribinos por WhatsApp y te orientamos."
        }
    }

};