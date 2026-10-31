const CONFIG = {
    // ==========================================
    // 1. CONFIGURACIÓN GENERAL DEL SITIO
    // ==========================================
    sitio: {
        nombre: "InnoCR",
        eslogan: "Te ayudamos a dar el siguiente paso profesional"
    },

    // ==========================================
    // 2. SERVICIOS Y PRECIOS
    // ==========================================
    servicios: {
        curriculum: {
            nombre: "Currículum Profesional",
            precio: "₡1,900",
            descripcion: "Creamos tu CV con formato profesional listo para entregar en formato PDF."
        },
        carta: {
            nombre: "Carta de Recomendación",
            precio: "₡1,000",
            descripcion: "Te ayudamos a crear las cartas de las personas que te recomiendan para acompañar tu CV."
        }
    },

    // ==========================================
    // 3. WHATSAPP (Mensajes dinámicos)
    // ==========================================
    whatsapp: {
        numero: "50670373820",
        // Mensajes para Currículum
        mensajes_cv: {
            inicial: "Hola, acabo de llenar el formulario de mi Currículum. Quiero coordinar el pago y la entrega.",
            ya_lleno: "Hola, ya llené el formulario de mi Currículum anteriormente. Quiero coordinar el pago.",
            existe: "Hola, ya tengo un Currículum registrado con esta identificación. Quiero hacer una modificación."
        },
        // Mensajes para Carta de Presentación (Los usaremos luego)
        mensajes_carta: {
            inicial: "Hola, acabo de llenar el formulario de mi Carta de Presentación. Quiero coordinar el pago y la entrega.",
            ya_lleno: "Hola, ya llené el formulario de mi Carta de Presentación. Quiero coordinar el pago.",
            existe: "Hola, ya tengo una Carta registrada con esta identificación. Quiero hacer una modificación."
        }
    },

    // ==========================================
    // 4. BACKEND (URLs de los Apps Scripts)
    // ==========================================
    backend: {
        // La URL del Web App que ya tienes creada para el CV
        url_cv: "PEGA_AQUI_TU_URL_DEL_WEB_APP_DE_CV",

        // Cuando creemos la lógica de la carta, pondrás su URL aquí
        url_carta: "PEGA_AQUI_TU_URL_DEL_WEB_APP_DE_CARTA"
    },

    // ==========================================
    // 5. DATOS LEGALES (Ley 8968)
    // ==========================================
    legal: {
        correo_privacidad: "info@innocr.com",
        texto_politica: "En InnoCR, nos comprometemos a proteger la privacidad de tus datos personales de acuerdo con la Ley N.° 8968 de Costa Rica.\n\n1. Finalidad: Los datos que nos proporcionas (nombre, cédula, correo, teléfono, dirección, experiencia y educación) serán utilizados exclusivamente para la elaboración de tus documentos (Currículum o Carta) en formato PDF y para contactarte vía WhatsApp para coordinar el pago y la entrega.\n\n2. Derechos ARCO: Como titular de los datos, tienes derecho a Acceder, Rectificar, Cancelar (suprimir) u Oponerse al tratamiento de tu información. Para ejercerlos, escríbenos a info@innocr.com. Atenderemos tu solicitud en un máximo de 5 días hábiles.\n\n3. Seguridad: Tus datos se almacenan en plataformas seguras con acceso restringido y no serán compartidos con terceros."
    }
};