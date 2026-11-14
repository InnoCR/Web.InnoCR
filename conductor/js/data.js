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

    avisoLegalFooter: "InnoCR es un servicio independiente de información y acompañamiento en trámites. No somos COSEVI ni una institución pública. Los costos oficiales de cada trámite se pagan aparte.",

    productos: [

        // ---------- PAGO DE ENTEROS ----------
        {
            id: 1,
            titulo: "Pago de Enteros",
            descripcion: "Pagamos tu entero de prueba teórica o práctica. Evitá filas y gastar tu tiempo.",
            tag: null,
            icono: "fa-solid fa-money-check-dollar",
            activo: true,
            seleccion: "unica",
            precio: {
                oficial: 5000,
                gestion: 1000,
                feeUnico: true
            },
            campos: [
                {
                    id: 1,
                    clave: "tipoPrueba",
                    tipo: "modal-select",
                    label: "Tipo de prueba",
                    requerido: true,
                    multiple: false,
                    opciones: [
                        { id: 1, nombre: "Teórica Carro" },
                        { id: 2, nombre: "Teórica Moto" },
                        { id: 3, nombre: "Práctica", esPractica: true }
                    ]
                },
                {
                    id: 2,
                    clave: "licencias",
                    tipo: "modal-select",
                    label: "Tipo de licencia",
                    requerido: false,
                    multiple: false,
                    dependeDe: { campo: 1, valor: 3 },
                    opciones: "tiposLicencia"
                },
                {
                    id: 3,
                    clave: "nombre",
                    tipo: "text",
                    label: "Nombre completo",
                    requerido: true,
                    placeholder: "Tu nombre"
                },
                {
                    id: 4,
                    clave: "cedula",
                    tipo: "text",
                    label: "Cédula",
                    requerido: true,
                    placeholder: "000000000"
                },
                {
                    id: 5,
                    clave: "legal",
                    tipo: "checkbox-legal",
                    label: "Entiendo que el costo oficial del entero es ₡5.000 y que InnoCR cobra ₡1.000 por gestión.",
                    requerido: true
                }
            ],
            mensajeWhatsApp: "Hola, quiero pagar entero(s) de prueba {tipoPrueba}{licencias}. Mi nombre es {nombre} y mi cédula es {cedula}. El total según la página es {total}."
        },

        // ---------- MANUALES / RESÚMENES ----------
        {
            id: 2,
            titulo: "Resúmenes de Estudio",
            descripcion: "Resúmenes basados en el manual oficial para preparar tu prueba teórica. Carro, Moto y Turismo.",
            tag: "Para prueba teórica",
            icono: "fa-solid fa-book-open",
            activo: true,
            seleccion: "multiple",
            precio: {
                oficial: 1500,
                gestion: 0,
                feeUnico: false
            },
            campos: [
                {
                    id: 1,
                    clave: "vehiculos",
                    tipo: "checkbox-group",
                    label: "¿Qué resumen querés?",
                    requerido: true,
                    multiple: true,
                    opciones: "tiposVehiculo"
                },
                {
                    id: 2,
                    clave: "legal",
                    tipo: "checkbox-legal",
                    label: "Entiendo que este material es un resumen de estudio basado en el manual oficial y no lo sustituye.",
                    requerido: true
                }
            ],
            mensajeWhatsApp: "Hola, quiero el resumen de estudio para {vehiculos}. El total según la página es {total}."
        },

        // ---------- DICTAMEN MÉDICO ----------
        {
            id: 3,
            titulo: "Dictamen Médico",
            descripcion: "Te coordinamos la cita con el doctor responsable de tu dictamen médico.",
            tag: "Disponible en Cañas, Guanacaste",
            icono: "fa-solid fa-stethoscope",
            activo: true,
            seleccion: "unica",
            precio: {
                oficial: null,
                gestion: 2000,
                feeUnico: true
            },
            campos: [
                {
                    id: 1,
                    clave: "sede",
                    tipo: "modal-select",
                    label: "Sede",
                    requerido: true,
                    multiple: false,
                    opciones: "sedesDictamen"
                },
                {
                    id: 2,
                    clave: "nombre",
                    tipo: "text",
                    label: "Nombre completo",
                    requerido: true,
                    placeholder: "Tu nombre"
                },
                {
                    id: 3,
                    clave: "cedula",
                    tipo: "text",
                    label: "Cédula",
                    requerido: true,
                    placeholder: "000000000"
                },
                {
                    id: 4,
                    clave: "motivo",
                    tipo: "modal-select",
                    label: "Motivo",
                    requerido: true,
                    multiple: false,
                    opciones: [
                        { id: 1, nombre: "Primera vez" },
                        { id: 2, nombre: "Renovación" },
                        { id: 3, nombre: "Otro" }
                    ]
                },
                {
                    id: 5,
                    clave: "legal",
                    tipo: "checkbox-legal",
                    label: "Entiendo que InnoCR coordina la cita con el doctor responsable, quien aplica sus propios criterios médicos.",
                    requerido: true
                }
            ],
            mensajeWhatsApp: "Hola, quiero coordinar mi dictamen médico en {sede}. Mi nombre es {nombre} y mi cédula es {cedula}. Motivo: {motivo}. El total según la página es {total}. Entiendo que la cita la coordina el doctor responsable."
        },

        // ---------- TRASPASO DE VEHÍCULO (MULTI-PASO) ----------
        {
            id: 4,
            titulo: "Traspaso de Vehículo",
            descripcion: "Te coordinamos con un abogado para el traspaso de tu vehículo.",
            tag: "Coordinación con abogado",
            icono: "fa-solid fa-file-signature",
            activo: true,
            seleccion: "unica",
            multipaso: true,
            precio: {
                oficial: null,
                gestion: 2000,
                feeUnico: true
            },
            notaPrecio: "El costo final depende del valor fiscal del vehículo y se confirma por WhatsApp.",
            pasos: [
                {
                    titulo: "Datos del vehículo",
                    campos: [
                        {
                            id: 1,
                            clave: "tipoPlaca",
                            tipo: "modal-select",
                            label: "Tipo de placa",
                            requerido: true,
                            multiple: false,
                            opciones: "tiposPlaca"
                        },
                        {
                            id: 2,
                            clave: "placa",
                            tipo: "text",
                            label: "Placa del vehículo",
                            requerido: true,
                            placeholder: "ABC123"
                        }
                    ]
                },
                {
                    titulo: "Datos del propietario",
                    campos: [
                        {
                            id: 3,
                            clave: "propietarioNombre",
                            tipo: "text",
                            label: "Nombre completo del propietario",
                            requerido: true,
                            placeholder: "Nombre"
                        },
                        {
                            id: 4,
                            clave: "propietarioCedula",
                            tipo: "text",
                            label: "Cédula del propietario",
                            requerido: true,
                            placeholder: "000000000"
                        },
                        {
                            id: 5,
                            clave: "propietarioEstadoCivil",
                            tipo: "modal-select",
                            label: "Estado civil del propietario",
                            requerido: true,
                            multiple: false,
                            opciones: [
                                { id: 1, nombre: "Soltero(a)" },
                                { id: 2, nombre: "Casado(a)" },
                                { id: 3, nombre: "Divorciado(a)" },
                                { id: 4, nombre: "Viudo(a)" },
                                { id: 5, nombre: "Unión libre" }
                            ]
                        },
                        {
                            id: 6,
                            clave: "propietarioProfesion",
                            tipo: "text",
                            label: "Profesión del propietario",
                            requerido: true,
                            placeholder: "Profesión"
                        },
                        {
                            id: 7,
                            clave: "propietarioDireccion",
                            tipo: "text",
                            label: "Dirección del propietario",
                            requerido: true,
                            placeholder: "Dirección"
                        }
                    ]
                },
                {
                    titulo: "Datos del comprador",
                    campos: [
                        {
                            id: 8,
                            clave: "compradorNombre",
                            tipo: "text",
                            label: "Nombre completo del comprador",
                            requerido: true,
                            placeholder: "Nombre"
                        },
                        {
                            id: 9,
                            clave: "compradorCedula",
                            tipo: "text",
                            label: "Cédula del comprador",
                            requerido: true,
                            placeholder: "000000000"
                        },
                        {
                            id: 10,
                            clave: "compradorEstadoCivil",
                            tipo: "modal-select",
                            label: "Estado civil del comprador",
                            requerido: true,
                            multiple: false,
                            opciones: [
                                { id: 1, nombre: "Soltero(a)" },
                                { id: 2, nombre: "Casado(a)" },
                                { id: 3, nombre: "Divorciado(a)" },
                                { id: 4, nombre: "Viudo(a)" },
                                { id: 5, nombre: "Unión libre" }
                            ]
                        },
                        {
                            id: 11,
                            clave: "compradorProfesion",
                            tipo: "text",
                            label: "Profesión del comprador",
                            requerido: true,
                            placeholder: "Profesión"
                        },
                        {
                            id: 12,
                            clave: "compradorDireccion",
                            tipo: "text",
                            label: "Dirección del comprador",
                            requerido: true,
                            placeholder: "Dirección"
                        },
                        {
                            id: 13,
                            clave: "legal",
                            tipo: "checkbox-legal",
                            label: "Entiendo que InnoCR coordina con un abogado, quien aplica sus propios criterios legales y honorarios.",
                            requerido: true
                        }
                    ]
                }
            ],
            mensajeWhatsApp: "Hola, quiero coordinar un traspaso de vehículo. Tipo de placa: {tipoPlaca}. Placa: {placa}. Propietario: {propietarioNombre}, cédula {propietarioCedula}, estado civil {propietarioEstadoCivil}, profesión {propietarioProfesion}, dirección {propietarioDireccion}. Comprador: {compradorNombre}, cédula {compradorCedula}, estado civil {compradorEstadoCivil}, profesión {compradorProfesion}, dirección {compradorDireccion}. Entiendo que el costo se calcula según el valor del vehículo y que la coordinación es con un abogado."
        }

    ],

    tiposLicencia: [
        { id: 1, nombre: "A1", descripcion: "Motocicleta hasta 125 cc (o 11 kW eléctrica)" },
        { id: 2, nombre: "A2", descripcion: "Motocicleta hasta 500 cc (o 35 kW eléctrica)" },
        { id: 3, nombre: "A3", descripcion: "Motocicleta sin límite de cilindrada o potencia" },
        { id: 4, nombre: "B1", descripcion: "Vehículos hasta 4.000 kg. Autoriza UTV y triciclos hasta 550 cc en vías no primarias" },
        { id: 5, nombre: "B2", descripcion: "Vehículos hasta 8.000 kg. Requiere 2 años con licencia B o C y ser mayor de 20 años" },
        { id: 6, nombre: "B3", descripcion: "Vehículos de todo peso excepto articulados. Requiere 3 años con licencia B o C y ser mayor de 22 años" },
        { id: 7, nombre: "B4", descripcion: "Vehículos de todo peso incluyendo articulados. Requiere curso especial" },
        { id: 8, nombre: "C1", descripcion: "Taxis. Requiere licencia B con 3 años y curso de transporte público" },
        { id: 9, nombre: "C2", descripcion: "Autobuses, busetas y microbuses. Requiere licencia B con 3 años y curso de transporte público" },
        { id: 10, nombre: "D1", descripcion: "Tractores de llantas" },
        { id: 11, nombre: "D2", descripcion: "Tractores de oruga" },
        { id: 12, nombre: "D3", descripcion: "Otro equipo especial" },
        { id: 13, nombre: "E1", descripcion: "Vehículos de 2, 3, 4 o más ejes, excepto transporte público" },
        { id: 14, nombre: "E2", descripcion: "Tractores y maquinaria D1/D2/D3, excepto transporte público" }
    ],

    tiposVehiculo: [
        { id: 1, nombre: "Carro", descripcion: "Automóvil particular" },
        { id: 2, nombre: "Moto", descripcion: "Motocicleta" },
        { id: 3, nombre: "Turismo", descripcion: "Vehículo de turismo" }
    ],

    sedesDictamen: [
        {
            id: 1,
            nombre: "Cañas, Guanacaste",
            direccion: "Dirección por confirmar",
            precio: 23000,
            doctora: "Por asignar"
        }
    ],

    sedesTraspaso: [
        {
            id: 1,
            nombre: "Cañas, Guanacaste",
            direccion: "Dirección por confirmar",
            precio: null,
            abogado: "Por asignar"
        }
    ],

    tiposPlaca: [
        { id: 1, nombre: "Particular", descripcion: "Formato ABC-123 o 000000. No puede prestar transporte público" },
        { id: 2, nombre: "Taxi", descripcion: "Inicia con T + provincia. Ej: TSJ-XXX" },
        { id: 3, nombre: "Autobús", descripcion: "Provincia + B. Ej: SJB-XXXX. Incluye transporte estudiantil y servicio especial" },
        { id: 4, nombre: "SEETAXI", descripcion: "Inicia con SE + provincia. Ej: SEA-XXX. Empresas de taxi" },
        { id: 5, nombre: "Motocicleta", descripcion: "Formato numérico de 6 dígitos. Nuevo formato: MOT 123ABC" }
    ],

    enlacesOficiales: [
        {
            id: 1,
            nombre: "Citas Inspección Vehicular",
            entidad: "DEKRA",
            url: "https://www.dekra.com/cr/",
            descripcion: "Agendá tu Revisión Técnica Vehicular obligatoria."
        },
        {
            id: 2,
            nombre: "Consulta de Marchamo",
            entidad: "INS",
            url: "https://www.ins-cr.com/",
            descripcion: "Consultá y pagá el derecho de circulación."
        },
        {
            id: 3,
            nombre: "Mi Usuario COSEVI",
            entidad: "COSEVI",
            url: "https://www.csv.go.cr/",
            descripcion: "Ingresá a tu cuenta para trámites en línea."
        },
        {
            id: 4,
            nombre: "Citas de Licencia",
            entidad: "BCR",
            url: "https://bcrcita.bancobcr.com/citas/Home/",
            descripcion: "Agendá cita para renovación o primera licencia. Gratuito."
        },
        {
            id: 5,
            nombre: "Portal MOPT",
            entidad: "MOPT",
            url: "https://www.mopt.go.cr/",
            descripcion: "Ministerio de Obras Públicas y Transportes."
        }
    ],

    textosLegales: {
        privacidad: "InnoCR es un servicio independiente de información y acompañamiento en trámites relacionados con COSEVI. No somos una institución pública ni representamos al COSEVI ni al MOPT.\n\nLos datos que ingresás en los formularios (nombre, cédula, selecciones) se envían por WhatsApp al número de contacto de InnoCR para coordinar el servicio que solicitás. No almacenamos tus datos en servidores propios; la conversación queda en WhatsApp.\n\nLos costos oficiales de cada trámite se pagan aparte y se te informan antes de cualquier pago. InnoCR cobra únicamente un costo de gestión por el acompañamiento y la facilitación del servicio.\n\nPara consultas sobre tus datos, escribinos al WhatsApp 50670373820.",
        cookies: "Este sitio utiliza cookies únicamente para recordar tu preferencia sobre el banner de cookies (aceptar o rechazar). No usamos cookies de rastreo ni de publicidad de terceros en esta versión.\n\nSi aceptás, se podrían cargar herramientas de análisis (Google Tag Manager) en el futuro para entender cómo se usa el sitio. Si rechazás, no se carga ninguna herramienta de análisis.\n\nPodés cambiar tu preferencia en cualquier momento desde el enlace \"Política de Cookies\" en el pie de página."
    }

};