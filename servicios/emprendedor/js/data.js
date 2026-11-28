/* ============================================
   InnoCR — data.js
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

    avisoLegalFooter: "InnoCR es un servicio independiente de asesoría y acompañamiento para emprendedores. No somos una institución pública, no representamos a Hacienda, SICOP ni a ninguna entidad del Estado. Los costos oficiales de cada trámite se pagan aparte.",

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

                // ---------- ASESORÍA CONTABLE ----------
                {
                    id: 1,
                    titulo: "Asesoría Contable",
                    descripcion: "Te orientamos con la contabilidad, obligaciones tributarias y la administración financiera de tu nuevo negocio.",
                    tag: "Lo que no se mide, no se mejora",
                    icono: "fa-solid fa-calculator",
                    activo: true,
                    modo: "formulario",
                    precio: { oficial: null, gestion: 0, feeUnico: true },
                    notaPrecio: "El costo mensual se cotiza según el volumen de operaciones, documentos y obligaciones de tu negocio.",
                    campos: [
                        {
                            id: 1, clave: "situacionContable", tipo: "modal-select",
                            label: "¿En qué situación está tu negocio?", requerido: true, multiple: false,
                            opciones: [
                                { id: 1, nombre: "Aún no tengo negocio", descripcion: "Necesito orientación para empezar y cumplir con Hacienda" },
                                { id: 2, nombre: "Ya tengo RUC", descripcion: "Tengo registro tributario y necesito contabilidad o asesoría" },
                                { id: 3, nombre: "Ya estoy operando", descripcion: "Necesito apoyo contable periódico y ordenamiento de documentos" }
                            ]
                        },
                        {
                            id: 2, clave: "tipoServicio", tipo: "modal-select",
                            label: "¿Qué tipo de servicio necesitás?", requerido: true, multiple: false,
                            opciones: [
                                { id: 1, nombre: "Asesoría mensual", descripcion: "Consultas recurrentes y seguimiento de obligaciones" },
                                { id: 2, nombre: "Contabilidad completa", descripcion: "Registro de movimientos, cierres y reportes" },
                                { id: 3, nombre: "Ordenamiento inicial", descripcion: "Puesta al día de facturas y documentos" }
                            ]
                        },
                        { id: 3, clave: "nombre", tipo: "text", label: "Nombre completo", requerido: true, placeholder: "Tu nombre" },
                        {
                            id: 4, clave: "legal", tipo: "checkbox-legal",
                            label: "Entiendo que el servicio contable se cotiza según las necesidades y operaciones de mi negocio y que los costos oficiales se pagan aparte.",
                            requerido: true
                        }
                    ],
                    mensajeWhatsApp: "¡Hola! Me llamo {nombre} y quiero consultar por el servicio de Asesoría Contable.\n\nLa situación actual de mi negocio es: {situacionContable}\nServicio que me interesa: {tipoServicio}\n\n¿Me podrían indicar el costo mensual y cómo podríamos empezar?"
                },

                // ---------- DISEÑO DE MARCA ----------
                {
                    id: 2,
                    titulo: "Diseño de Marca",
                    descripcion: "Creamos la identidad visual de tu marca: logo, colores y tipografía.",
                    tag: "El logo es el rostro de tú negocio",
                    icono: "fa-solid fa-palette",
                    activo: true,
                    modo: "formulario",
                    campos: [
                        {
                            id: 1, clave: "nombreNegocio", tipo: "text",
                            label: "Nombre del negocio o proyecto",
                            requerido: true,
                            placeholder: "Ej: Panadería La Esquina"
                        },
                        {
                            id: 2, clave: "descripcionNegocio", tipo: "text",
                            label: "¿Qué hace tu negocio?",
                            requerido: true,
                            placeholder: "Ej: Vendemos pan artesanal y productos horneados"
                        },
                        {
                            id: 3, clave: "necesidadMarca", tipo: "text",
                            label: "¿Qué necesitás para tu marca?",
                            requerido: true,
                            placeholder: "Ej: Logo, colores, tipografía, manual de marca..."
                        },
                        {
                            id: 4, clave: "detallesMarca", tipo: "text",
                            label: "Detalles adicionales (opcional)",
                            requerido: false,
                            placeholder: "Ej: estilo moderno, colores preferidos, referencias..."
                        },
                        {
                            id: 5, clave: "legal", tipo: "checkbox-legal",
                            label: "Entiendo que InnoCR cotiza el diseño de marca según la complejidad de la marca y que el precio final se confirma por WhatsApp.",
                            requerido: true
                        }
                    ],
                    mensajeWhatsApp: "¡Hola! Quiero solicitar una cotización para Diseño de Marca.\n\nNegocio o proyecto: {nombreNegocio}\nDescripción del negocio: {descripcionNegocio}\nLo que necesito: {necesidadMarca}\nDetalles adicionales: {detallesMarca}\n\n¿Me pueden ayudar a cotizar el paquete que mejor se adapte?"
                },

                // ---------- TARJETA DE PRESENTACIÓN WEB ----------
                {
                    id: 3,
                    titulo: "Tarjeta de Presentación Web",
                    descripcion: "Presenta la información de contacto para tu negocio por medio de un código QR y una pagina web.",
                    tag: "Costo anual",
                    icono: "fa-solid fa-address-card",
                    activo: true,
                    modo: "formulario",
                    multipaso: true,
                    precio: { oficial: 9000, gestion: 0, feeUnico: true },
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
                                { id: 5, clave: "correoNegocio", tipo: "text", label: "Correo electrónico", requerido: true, placeholder: "Ej: contacto@minegocio.com" },
                                { id: 6, clave: "redesSociales", tipo: "text", label: "Redes sociales (separadas por coma)", requerido: false, placeholder: "Ej: facebook.com/minegocio, instagram.com/minegocio" },
                                { id: 7, clave: "sitioWebExistente", tipo: "text", label: "Sitio web existente (opcional)", requerido: false, placeholder: "Ej: www.minegocio.com" }
                            ]
                        },
                        {
                            titulo: "Confirmación",
                            campos: [
                                {
                                    id: 8, clave: "legal", tipo: "checkbox-legal",
                                    label: "Autorizo a InnoCR a usar estos datos para crear mi tarjeta de presentación web y contactarme por WhatsApp.",
                                    requerido: true
                                }
                            ]
                        }
                    ],
                    mensajeWhatsApp: "¡Hola! Quiero solicitar la Tarjeta de Presentación Web anual.\n\nDatos del negocio:\n• Nombre: {nombreNegocio}\n• Eslogan: {eslogan}\n• Ubicación: {ubicacion}\n• Descripción: {descripcionNegocio}\n\nContacto y redes:\n• Correo electrónico: {correoNegocio}\n• Redes sociales: {redesSociales}\n• Sitio web existente: {sitioWebExistente}\n\nMe gustaría confirmar estos datos y continuar con el pago de ₡9.000."
                },

                // ---------- SITIO WEB ----------
                {
                    id: 4,
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
                                { id: 7, clave: "correo", tipo: "text", label: "Correo electrónico", requerido: true, placeholder: "Ej: tu@correo.com" },
                                {
                                    id: 8, clave: "legal", tipo: "checkbox-legal",
                                    label: "Entiendo que InnoCR es un equipo de ingenieros en TI y que el precio final se cotiza según los detalles de mi proyecto.",
                                    requerido: true
                                }
                            ]
                        }
                    ],
                    mensajeWhatsApp: "¡Hola! Me llamo {nombre} y quiero cotizar un sitio web.\n\nTipo de proyecto: {tipoProyecto}\nDirección web: {dominio}\nFuncionalidades: {funcionalidades}\nPresupuesto estimado: {presupuesto}\nPlazo deseado: {plazo}\nCorreo: {correo}\n\n¿Podrían enviarme una cotización según estos detalles?"
                },

                // ---------- CORREO CORPORATIVO ----------
                {
                    id: 5,
                    titulo: "Correo Corporativo",
                    descripcion: "Configuramos correos profesionales con tu dominio para que tu negocio se vea formal.",
                    tag: "Complementario",
                    icono: "fa-solid fa-envelope",
                    activo: true,
                    modo: "formulario",
                    campos: [
                        {
                            id: 1, clave: "tamanoEmpresa", tipo: "modal-select",
                            label: "¿Cuál es el tamaño de tu empresa?", requerido: true, multiple: false,
                            opciones: [
                                { id: 1, nombre: "Solo yo", descripcion: "Negocio unipersonal sin empleados" },
                                { id: 2, nombre: "Microempresa", descripcion: "De 2 a 5 personas" },
                                { id: 3, nombre: "Empresa pequeña", descripcion: "De 6 a 30 personas" },
                                { id: 4, nombre: "Empresa mediana o grande", descripcion: "Más de 30 personas" }
                            ]
                        },
                        {
                            id: 2, clave: "cantidadCorreos", tipo: "modal-select",
                            label: "¿Cuántos correos corporativos necesitas como mínimo?", requerido: true, multiple: false,
                            opciones: [
                                { id: 1, nombre: "1 correo", descripcion: "Solo necesito una cuenta" },
                                { id: 2, nombre: "2 a 5 correos", descripcion: "Para el negocio y el equipo principal" },
                                { id: 3, nombre: "6 a 10 correos", descripcion: "Para varios roles o departamentos" },
                                { id: 4, nombre: "Más de 10 correos", descripcion: "Necesito revisar un volumen mayor" }
                            ]
                        },
                        {
                            id: 3, clave: "dominioCorreo", tipo: "modal-select",
                            label: "¿Ya tienes un dominio para tus correos?", requerido: true, multiple: false,
                            opciones: [
                                { id: 1, nombre: "Sí, ya tengo dominio", descripcion: "Quiero configurar los correos con mi dominio" },
                                { id: 2, nombre: "No tengo dominio", descripcion: "Necesito ayuda para registrarlo" },
                                { id: 3, nombre: "Estoy indeciso", descripcion: "Quiero comparar las opciones disponibles" }
                            ]
                        },
                        {
                            id: 4, clave: "legal", tipo: "checkbox-legal",
                            label: "Entiendo que InnoCR configura el correo corporativo con el proveedor que yo elija y que el costo del proveedor se paga aparte.",
                            requerido: true
                        }
                    ],
                    mensajeWhatsApp: "¡Hola! Quiero cotizar el servicio de Correo Corporativo.\n\nTamaño de la empresa: {tamanoEmpresa}\nCorreos corporativos mínimos: {cantidadCorreos}\nSituación del dominio: {dominioCorreo}\n\n¿Me pueden ayudar a elegir el proveedor y el paquete adecuado?"
                },

                // ---------- ASESORÍA FIRMA DIGITAL ----------
                {
                    id: 6,
                    titulo: "Asesoría en Firma Digital",
                    descripcion: "Te guiamos para obtener y usar tu firma digital móvil o física según tu situación.",
                    tag: "Asesoría",
                    icono: "fa-solid fa-signature",
                    activo: true,
                    modo: "formulario",
                    precio: { oficial: null, gestion: 0, feeUnico: true },
                    notaPrecio: "El costo y los requisitos oficiales pueden variar. Te confirmamos el monto antes de continuar.",
                    campos: [
                        {
                            id: 1, clave: "tieneFirma", tipo: "modal-select",
                            label: "¿Ya tenés firma digital?", requerido: true, multiple: false,
                            opciones: [
                                { id: 1, nombre: "Sí", descripcion: "Ya tengo firma digital y quiero asesoría para usarla" },
                                { id: 2, nombre: "No", descripcion: "No tengo firma digital y necesito solicitarla" },
                                { id: 3, nombre: "No sé", descripcion: "No sé si tengo firma digital o cómo consultarlo" }
                            ]
                        },
                        {
                            id: 2, clave: "tipoFirma", tipo: "text",
                            label: "Tipo de firma que necesitás (opcional)",
                            requerido: false,
                            placeholder: "Ej: firma móvil, firma en tarjeta criptográfica..."
                        },
                        {
                            id: 3, clave: "nombre", tipo: "text",
                            label: "Nombre completo", requerido: true, placeholder: "Tu nombre"
                        },
                        {
                            id: 4, clave: "legal", tipo: "checkbox-legal",
                            label: "Entiendo que InnoCR brinda asesoría independiente y que los costos oficiales de Firma Digital se pagan aparte.",
                            requerido: true
                        }
                    ],
                    mensajeWhatsApp: "¡Hola! Me llamo {nombre} y necesito asesoría en Firma Digital.\n\n¿Ya tengo firma digital?: {tieneFirma}\nTipo de firma de interés: {tipoFirma}\n\n¿Me pueden orientar con los requisitos y el proceso?"
                },

                // ---------- FACTURACIÓN ELECTRÓNICA ----------
                {
                    id: 7,
                    titulo: "Facturación Electrónica",
                    descripcion: "Te guiamos para emitir facturas electrónicas con un proveedor aliado autorizado.",
                    tag: "Aliado comercial",
                    icono: "fa-solid fa-file-invoice-dollar",
                    activo: true,
                    modo: "formulario",
                    campos: [
                        {
                            id: 1, clave: "tipoPersona", tipo: "modal-select",
                            label: "¿Cómo realizás tus operaciones?", requerido: true, multiple: false,
                            opciones: [
                                { id: 1, nombre: "Persona física", descripcion: "Trabajo con mi cédula personal" },
                                { id: 2, nombre: "Persona jurídica", descripcion: "Opero por medio de una sociedad o empresa" },
                                { id: 3, nombre: "Aún no estoy registrado", descripcion: "Todavía no tengo un RUC o registro activo" }
                            ]
                        },
                        {
                            id: 2, clave: "registroHacienda", tipo: "modal-select",
                            label: "¿Cuál es tu estado en Hacienda?", requerido: true, multiple: false,
                            opciones: [
                                { id: 1, nombre: "Sí, estoy registrado", descripcion: "Tengo RUC activo y acceso a ATV" },
                                { id: 2, nombre: "No estoy registrado", descripcion: "Necesito orientación para registrarme" },
                                { id: 3, nombre: "No estoy seguro", descripcion: "No sé si mi RUC está activo o cómo comprobarlo" }
                            ]
                        },
                        {
                            id: 3, clave: "firmaDigital", tipo: "modal-select",
                            label: "¿Tenés firma digital vigente?", requerido: true, multiple: false,
                            opciones: [
                                { id: 1, nombre: "Sí, tengo firma vigente", descripcion: "Ya puedo utilizarla" },
                                { id: 2, nombre: "No tengo firma digital", descripcion: "Necesito tramitarla" },
                                { id: 3, nombre: "No sé si está vigente", descripcion: "Necesito verificar su estado" }
                            ]
                        },
                        {
                            id: 4, clave: "tipoFacturacion", tipo: "modal-select",
                            label: "¿Qué necesitás?", requerido: true, multiple: false,
                            opciones: [
                                { id: 1, nombre: "Quiero empezar desde cero", descripcion: "Necesito orientación en registro, firma y proveedor" },
                                { id: 2, nombre: "Ya tengo sistema", descripcion: "Necesito asesoría para configurar o migrar" },
                                { id: 3, nombre: "Solo quiero cotizar el servicio", descripcion: "Busco conocer opciones y costos" }
                            ]
                        },
                        {
                            id: 5, clave: "legal", tipo: "checkbox-legal",
                            label: "Entiendo que InnoCR es un asesor independiente y que la facturación electrónica la provee un aliado comercial autorizado. No somos Hacienda ni una institución pública.",
                            requerido: true
                        }
                    ],
                    mensajeWhatsApp: "¡Hola! Quiero recibir asesoría sobre Facturación Electrónica.\n\nTipo de operación: {tipoPersona}\nEstado en Hacienda: {registroHacienda}\nFirma digital: {firmaDigital}\nNecesidad principal: {tipoFacturacion}\n\n¿Me pueden indicar cómo empezar o qué debo completar antes?"
                },

                // ---------- SICOP ----------
                {
                    id: 8,
                    titulo: "Asesoría SICOP",
                    descripcion: "Te acompañamos para que tu empresa participe en licitaciones públicas por medio del SICOP.",
                    tag: "Asesoría",
                    icono: "fa-solid fa-gavel",
                    activo: true,
                    modo: "formulario",
                    campos: [
                        {
                            id: 1, clave: "tipoPersonaSicop", tipo: "modal-select",
                            label: "¿Cómo participará tu empresa en SICOP?", requerido: true, multiple: false,
                            opciones: [
                                { id: 1, nombre: "Persona física", descripcion: "Participaré con mi cédula personal" },
                                { id: 2, nombre: "Persona jurídica", descripcion: "Representaré a una sociedad o empresa" },
                                { id: 3, nombre: "Aún no estoy seguro", descripcion: "Necesito orientación sobre la estructura adecuada" }
                            ]
                        },
                        {
                            id: 2, clave: "registroSicop", tipo: "modal-select",
                            label: "¿Ya estás registrado como proveedor en SICOP?", requerido: true, multiple: false,
                            opciones: [
                                { id: 1, nombre: "Sí, estoy registrado", descripcion: "Ya tengo acceso como proveedor" },
                                { id: 2, nombre: "No estoy registrado", descripcion: "Necesito orientación para el registro" },
                                { id: 3, nombre: "No sé si estoy registrado", descripcion: "Necesito verificar mi estado" }
                            ]
                        },
                        {
                            id: 3, clave: "firmaSicop", tipo: "modal-select",
                            label: "¿Tenés firma digital vigente?", requerido: true, multiple: false,
                            opciones: [
                                { id: 1, nombre: "Sí, tengo firma vigente", descripcion: "Puedo utilizarla en SICOP" },
                                { id: 2, nombre: "No tengo firma digital", descripcion: "Necesito tramitarla" },
                                { id: 3, nombre: "No sé si está vigente", descripcion: "Necesito verificar su estado" }
                            ]
                        },
                        {
                            id: 4, clave: "estadoHaciendaCcss", tipo: "modal-select",
                            label: "¿Estás al día con Hacienda y la CCSS?", requerido: true, multiple: false,
                            opciones: [
                                { id: 1, nombre: "Sí, estoy al día", descripcion: "Tengo mis obligaciones principales actualizadas" },
                                { id: 2, nombre: "No estoy al día", descripcion: "Necesito regularizar obligaciones" },
                                { id: 3, nombre: "No estoy seguro", descripcion: "Necesito verificar mi estado" }
                            ]
                        },
                        {
                            id: 5, clave: "objetivoSicop", tipo: "modal-select",
                            label: "¿Qué necesitas respecto a SICOP?", requerido: true, multiple: false,
                            opciones: [
                                { id: 1, nombre: "Aprender a participar", descripcion: "Quiero comprender licitaciones y procesos" },
                                { id: 2, nombre: "Completar el registro", descripcion: "Necesito apoyo con requisitos y proveedores" },
                                { id: 3, nombre: "Prepararme para licitar", descripcion: "Ya puedo participar y quiero asesoría práctica" }
                            ]
                        },
                        {
                            id: 6, clave: "legal", tipo: "checkbox-legal",
                            label: "Entiendo que InnoCR es un asesor independiente. No gestionamos el registro en SICOP por vos ni garantizamos adjudicaciones; te damos el conocimiento y la guía para que lo hagas con confianza.",
                            requerido: true
                        }
                    ],
                    mensajeWhatsApp: "¡Hola! Quiero asesoría para participar en SICOP.\n\nTipo de persona: {tipoPersonaSicop}\nEstado del registro en SICOP: {registroSicop}\nFirma digital: {firmaSicop}\nEstado con Hacienda y CCSS: {estadoHaciendaCcss}\nObjetivo: {objetivoSicop}\n\n¿Me pueden orientar sobre los requisitos que me faltan?"
                },

                // ---------- PUBLICIDAD EN REDES SOCIALES ----------
                {
                    id: 9,
                    titulo: "Publicidad en Redes Sociales",
                    descripcion: "Administramos y promovemos tu negocio en redes sociales con servicios mensuales y publicidad pagada según tus objetivos.",
                    tag: "Costo mensual base por cotizar",
                    icono: "fa-solid fa-bullhorn",
                    activo: true,
                    modo: "formulario",
                    precio: { oficial: null, gestion: 0, feeUnico: true },
                    notaPrecio: "La gestión mensual base se cotiza según alcance y cantidad de redes. Los costos adicionales son: publicación promocional ₡15.000; campaña pagada ₡25.000; gestión de contenido ₡35.000.",
                    campos: [
                        {
                            id: 1, clave: "tipoPublicidad", tipo: "checkbox-group",
                            label: "¿Qué tipo de publicidad necesitás?", requerido: true,
                            opciones: [
                                { id: 1, nombre: "Publicación promocional", descripcion: "₡15.000 adicionales" },
                                { id: 2, nombre: "Campaña pagada", descripcion: "₡25.000 adicionales" },
                                { id: 3, nombre: "Gestión de contenido", descripcion: "₡35.000 adicionales" }
                            ]
                        },
                        {
                            id: 2, clave: "objetivo", tipo: "text",
                            label: "Objetivo de publicidad", requerido: true,
                            placeholder: "Ej: atraer clientes, vender un producto, promocionar un evento..."
                        },
                        {
                            id: 3, clave: "redes", tipo: "text",
                            label: "Redes sociales", requerido: true,
                            placeholder: "Ej: Facebook, Instagram..."
                        },
                        {
                            id: 4, clave: "nombre", tipo: "text",
                            label: "Nombre completo", requerido: true, placeholder: "Tu nombre"
                        },
                        {
                            id: 5, clave: "legal", tipo: "checkbox-legal",
                            label: "Entiendo que el costo mensual base y los costos adicionales se confirman por WhatsApp según el alcance del servicio.",
                            requerido: true
                        }
                    ],
                    mensajeWhatsApp: "¡Hola! Me llamo {nombre} y quiero cotizar Publicidad en Redes Sociales.\n\nServicios de interés: {tipoPublicidad}\nObjetivo: {objetivo}\nRedes: {redes}\n\n¿Podrían indicarme el costo mensual base y los costos adicionales correspondientes?"
                },

                // ---------- SOFTWARE A MEDIDA ----------
                {
                    id: 10,
                    titulo: "Software a Medida",
                    descripcion: "Desarrollamos sistemas web a la medida de tu operación: inventarios, facturación interna, CRM y más.",
                    tag: "Complementario",
                    icono: "fa-solid fa-code",
                    activo: true,
                    modo: "formulario",
                    campos: [
                        {
                            id: 1, clave: "tipoSoftware", tipo: "modal-select",
                            label: "¿Qué tipo de solución necesitás?", requerido: true, multiple: false,
                            opciones: [
                                { id: 1, nombre: "Sitio web o sistema web", descripcion: "Landing, portal, plataforma o sistema accesible desde navegador" },
                                { id: 2, nombre: "Programa de computadora", descripcion: "Aplicación para Windows, macOS o equipo de escritorio" },
                                { id: 3, nombre: "Aplicación móvil", descripcion: "Aplicación para Android e iOS" },
                                { id: 4, nombre: "Necesito orientación", descripcion: "Aún no sé qué tipo de solución se adapta mejor" }
                            ]
                        },
                        {
                            id: 2, clave: "plataformasMoviles", tipo: "checkbox-group",
                            label: "¿En qué plataformas debe funcionar?", requerido: false,
                            opciones: [
                                { id: 1, nombre: "Android" },
                                { id: 2, nombre: "iOS" },
                                { id: 3, nombre: "Windows" },
                                { id: 4, nombre: "macOS" },
                                { id: 5, nombre: "Navegador web" }
                            ]
                        },
                        {
                            id: 3, clave: "usuariosSoftware", tipo: "text",
                            label: "¿Quiénes utilizarán el programa?",
                            requerido: true,
                            placeholder: "Ej: empleados, clientes, vendedores, administradores..."
                        },
                        {
                            id: 4, clave: "funcionalidadesSoftware", tipo: "text",
                            label: "¿Qué debe permitir hacer el programa?",
                            requerido: true,
                            placeholder: "Ej: registrar ventas, controlar inventario, generar reportes..."
                        },
                        {
                            id: 5, clave: "integracionesSoftware", tipo: "text",
                            label: "¿Debe conectarse con algún sistema? (opcional)",
                            requerido: false,
                            placeholder: "Ej: facturación electrónica, WhatsApp, correo, Google Sheets..."
                        },
                        {
                            id: 6, clave: "plazoSoftware", tipo: "text",
                            label: "Plazo deseado (opcional)",
                            requerido: false,
                            placeholder: "Ej: 1 mes, 3 meses..."
                        },
                        {
                            id: 7, clave: "legal", tipo: "checkbox-legal",
                            label: "Entiendo que InnoCR es un equipo de ingenieros en TI y que el software a medida se cotiza según los requerimientos de mi negocio.",
                            requerido: true
                        }
                    ],
                    mensajeWhatsApp: "¡Hola! Tengo un proyecto de software a medida y quiero solicitar una cotización.\n\nTipo de solución: {tipoSoftware}\nPlataformas: {plataformasMoviles}\nUsuarios: {usuariosSoftware}\nFunciones que necesita: {funcionalidadesSoftware}\nIntegraciones: {integracionesSoftware}\nPlazo deseado: {plazoSoftware}\n\n¿Me pueden orientarme sobre el alcance y el costo del proyecto?"
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
                    titulo: "¿Cómo crear un negocio desde cero?",
                    descripcion: "Conocé los pasos básicos: tipo de negocio, registro jurídico, Hacienda, seguridad social y permisos.",
                    tag: "Gratis",
                    icono: "fa-solid fa-circle-info",
                    tipoModal: "guiaEmprendimiento"
                },
                {
                    id: 2,
                    titulo: "¿Qué es la firma digital?",
                    descripcion: "Entendé para qué sirve, cuándo la necesitás y cómo tramitarla.",
                    tag: "Gratis",
                    icono: "fa-solid fa-circle-info",
                    tipoModal: "guiaFirmaDigital"
                },
                {
                    id: 3,
                    titulo: "¿Cómo empezar a facturar?",
                    descripcion: "Guía básica: qué necesitás, requisitos y pasos para emitir facturas electrónicas.",
                    tag: "Gratis",
                    icono: "fa-solid fa-circle-info",
                    tipoModal: "guiaFacturacion"
                },
                {
                    id: 4,
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
                    nombre: "Tribunal Supremo de Elecciones",
                    entidad: "Persona jurídica",
                    url: "https://www.tse.go.cr/",
                    descripcion: "Información sobre constitución y registro de personas jurídicas."
                },
                {
                    id: 2,
                    nombre: "Hacienda / ATV",
                    entidad: "Ministerio de Hacienda",
                    url: "https://atv.hacienda.go.cr/ATV/Login.aspx",
                    descripcion: "Creá tu usuario, obtené tu RUC y gestioná tus obligaciones tributarias."
                },
                {
                    id: 3,
                    nombre: "Firma Digital",
                    entidad: "Banco Central de Costa Rica",
                    url: "https://www.bccr.fi.cr/cr/es/firma-digital.html",
                    descripcion: "Información oficial sobre qué es la firma digital y cómo obtenerla."
                },
                {
                    id: 4,
                    nombre: "CCSS",
                    entidad: "Caja Costarricense de Seguro Social",
                    url: "https://www.ccss.sa.cr/patronos",
                    descripcion: "Servicios para patronos, inscripción y obligaciones de seguridad social."
                },
                {
                    id: 5,
                    nombre: "MEIC - Pymes",
                    entidad: "Ministerio de Economía, Industria y Comercio",
                    url: "https://www.pyme.go.cr/",
                    descripcion: "Recursos, programas y apoyo para emprendimientos y pequeñas empresas."
                },
                {
                    id: 6,
                    nombre: "SICOP",
                    entidad: "Sistema de Compras Públicas",
                    url: "https://www.sicop.go.cr/",
                    descripcion: "Portal oficial de compras públicas de Costa Rica."
                }
            ]
        }

    ],

    /* --------------------------------------------
       TEXTOS LEGALES
       -------------------------------------------- */
    textosLegales: {
        privacidad: "InnoCR es un servicio independiente de asesoría y acompañamiento para emprendedores. No somos una institución pública ni representamos a Hacienda, SICOP, MOPT ni a ninguna entidad del Estado.\n\nLos datos que ingresás en los formularios (nombre, cédula, contacto, datos del negocio) se envían por WhatsApp al número de contacto de InnoCR para coordinar el servicio que solicitás. En el caso de la Tarjeta de Presentación Web, los datos se guardan en un Google Sheet privado para gestionar el registro y la renovación. No almacenamos tus datos en servidores propios.\n\nLos costos oficiales de cada trámite se pagan aparte y se te informan antes de cualquier pago. InnoCR cobra únicamente un costo de gestión o asesoría por el acompañamiento.\n\nPara consultas sobre tus datos, escribinos al WhatsApp 50670373820.",
        cookies: "En InnoCR utilizamos cookies y tecnologías similares para analizar cómo navegas en nuestro sitio y mejorar tu experiencia.\n\n1. ¿Qué son las cookies? Son pequeños archivos que se almacenan en tu dispositivo cuando visitas un sitio web. Nos permiten recordar tus preferencias y entender cómo usas el sitio.\n\n2. Tipos de cookies que usamos:\n   • Cookies técnicas necesarias: permiten el funcionamiento básico del sitio y recordar tu decisión sobre este aviso. No requieren consentimiento.\n   • Cookies analíticas: usamos Google Analytics (a través de Google Tag Manager) para medir de forma anónima cuántas personas visitan el sitio, qué páginas ven y cómo navegan. Esta información nos ayuda a mejorar el contenido y la experiencia.\n\n3. Base legal: Tratamos cookies analíticas únicamente con tu consentimiento, conforme a la Ley N.° 8968 de Costa Rica.\n\n4. Control: Puedes aceptar o rechazar las cookies analíticas desde el aviso que aparece al entrar al sitio. Si las rechazas, no cargaremos Google Analytics y no se enviará información a Google. También puedes borrar las cookies desde la configuración de tu navegador en cualquier momento.\n\n5. Cambios: Si actualizamos esta política, lo indicaremos en este mismo sitio.\n\nSi tienes dudas, escríbenos a info@innocr.com.",
        guiaEmprendimiento: "Para iniciar un negocio desde cero en Costa Rica:\n\n1. Definí tu idea, actividad, clientes y presupuesto.\n2. Elegí si operarás como persona física o constituirás una persona jurídica.\n3. Registrá la empresa o sociedad ante el órgano correspondiente si aplica.\n4. Creá tu cuenta y RUC en el ATV de Hacienda.\n5. Gestioná la firma digital si la necesitás para trámites y facturación.\n6. Registrá tus obligaciones laborales y patronales ante la CCSS cuando corresponda.\n7. Consultá permisos municipales y requisitos específicos de tu actividad.\n8. Elegí un sistema de facturación y empezá a operar formalmente.\n\nLos pasos y requisitos pueden variar según el tipo de negocio. InnoCR te orienta para organizarlos.",
        guiaFirmaDigital: "La firma digital permite identificar a una persona o empresa y garantizar la integridad de documentos electrónicos.\n\nAntes de solicitarla:\n\n1. Revisá si ya tenés una firma vigente.\n2. Confirmá si la necesitás para Hacienda, SICOP, contratos u otros trámites.\n3. Consultá los requisitos, costos y puntos de atención autorizados.\n4. Prepará tu identificación y la documentación según tu situación.\n5. Instalá y configurá el software necesario después de obtenerla.\n\nPara trámites tributarios, SICOP y representación empresarial pueden requerirse tipos de firma distintos.",
        guiaFacturacion: "Para empezar a facturar electrónicamente en Costa Rica necesitás:\n\n1. Estar inscrito en Hacienda (RUC activo).\n2. Contar con firma digital o un proveedor autorizado de facturación electrónica.\n3. Elegir un sistema de facturación (te guiamos con nuestro aliado comercial).\n4. Configurar tus datos y certificados.\n5. Empezar a emitir facturas.\n\nEn InnoCR te acompañamos en todo el proceso. Escribinos por WhatsApp y te guiamos paso a paso.",
        guiaSicop: "El SICOP (Sistema de Compras Públicas) es la plataforma del Estado costarricense para licitaciones públicas.\n\nPara participar necesitás:\n\n1. Estar inscrito como proveedor en SICOP.\n2. Contar con firma digital vigente.\n3. Estar al día con la CCSS y Hacienda.\n4. Conocer los tipos de licitación (bienes, servicios, obras).\n\nEn InnoCR te asesoramos para que tu empresa participe con confianza. No gestionamos el registro por vos ni garantizamos adjudicaciones. Escribinos por WhatsApp y te orientamos."
    },

    /* --------------------------------------------
       MODALES DE INFORMACIÓN (guías)
       -------------------------------------------- */
    modalesInfo: {
        guiaEmprendimiento: {
            titulo: "¿Cómo crear un negocio desde cero?",
            texto: "Para iniciar un negocio desde cero en Costa Rica:\n\n1. Definí tu idea, actividad, clientes y presupuesto.\n2. Elegí si operarás como persona física o constituirás una persona jurídica.\n3. Registrá la empresa o sociedad ante el órgano correspondiente si aplica.\n4. Creá tu cuenta y RUC en el ATV de Hacienda.\n5. Gestioná la firma digital si la necesitás para trámites y facturación.\n6. Registrá tus obligaciones laborales y patronales ante la CCSS cuando corresponda.\n7. Consultá permisos municipales y requisitos específicos de tu actividad.\n8. Elegí un sistema de facturación y empezá a operar formalmente.\n\nLos pasos y requisitos pueden variar según el tipo de negocio. InnoCR te orienta para organizarlos."
        },
        guiaFirmaDigital: {
            titulo: "¿Qué es la firma digital?",
            texto: "La firma digital permite identificar a una persona o empresa y garantizar la integridad de documentos electrónicos.\n\nAntes de solicitarla:\n\n1. Revisá si ya tenés una firma vigente.\n2. Confirmá si la necesitás para Hacienda, SICOP, contratos u otros trámites.\n3. Consultá los requisitos, costos y puntos de atención autorizados.\n4. Prepará tu identificación y la documentación según tu situación.\n5. Instalá y configurá el software necesario después de obtenerla.\n\nPara trámites tributarios, SICOP y representación empresarial pueden requerirse tipos de firma distintos."
        },
        guiaFacturacion: {
            titulo: "¿Cómo empezar a facturar?",
            texto: "Para empezar a facturar electrónicamente en Costa Rica necesitás:\n\n1. Estar inscrito en Hacienda (RUC activo).\n2. Contar con firma digital o un proveedor autorizado de facturación electrónica.\n3. Elegir un sistema de facturación (te guiamos con nuestro aliado comercial).\n4. Configurar tus datos y certificados.\n5. Empezar a emitir facturas.\n\nEn InnoCR te acompañamos en todo el proceso. Escribinos por WhatsApp y te guiamos paso a paso."
        },
        guiaSicop: {
            titulo: "¿Qué es el SICOP?",
            texto: "El SICOP (Sistema de Compras Públicas) es la plataforma del Estado costarricense para licitaciones públicas.\n\nPara participar necesitás:\n\n1. Estar inscrito como proveedor en SICOP.\n2. Contar con firma digital vigente.\n3. Estar al día con la CCSS y Hacienda.\n4. Conocer los tipos de licitación (bienes, servicios, obras).\n\nEn InnoCR te asesoramos para que tu empresa participe con confianza. No gestionamos el registro por vos ni garantizamos adjudicaciones. Escribinos por WhatsApp y te orientamos."
        }
    }

};