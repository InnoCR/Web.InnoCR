/* ============================================
   InnoCR — data.js (GLOBAL)
   Fuente de verdad para landing, curriculum y recomendación
   ============================================ */

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
            precio_texto: "₡1,900",
            precio_numero: 1900,
            descripcion: "Creamos tu CV con formato profesional listo para entregar en formato PDF."
        },
        carta: {
            nombre: "Carta de Recomendación",
            precio_texto: "₡1,000",
            precio_numero: 1000,
            descripcion: "Te ayudamos a crear las cartas de las personas que te recomiendan para acompañar tu CV."
        }
    },

    // ==========================================
    // 3. WHATSAPP (Mensajes por defecto)
    // ==========================================
    whatsapp: {
        numero: "50670373820",
        mensajes_generales: {
            consulta: "Hola, tengo una consulta sobre los servicios de Currículum y Cartas de Recomendación."
        },
        mensajes_cv: {
            inicial: "Hola, acabo de llenar el formulario de mi Currículum. Quiero coordinar el pago y la entrega.",
            ya_lleno: "Hola, ya llené el formulario de mi Currículum anteriormente. Quiero coordinar el pago.",
            existe: "Hola, ya tengo un Currículum registrado con esta identificación. Quiero hacer una modificación."
        },
        mensajes_carta: {
            inicial: "Hola, acabo de llenar el formulario de mi Carta de Recomendación. Quiero coordinar el pago y la entrega.",
            ya_lleno: "Hola, ya llené el formulario de mi Carta de Recomendación. Quiero coordinar el pago.",
            existe: "Hola, ya tengo una Carta registrada con esta identificación. Quiero hacer una modificación."
        }
    },

    // ==========================================
    // 4. BACKEND
    // ==========================================
    backend: {
        url: "https://script.google.com/macros/s/AKfycbyXXjetmYzBA0JUAwc5fLcEFwSqxw5Pt15wyz5nUCvhVwl4JZ4OckOCTFTjAUJCLY2K0w/exec"
    },

    // ==========================================
    // 5. DATOS LEGALES (Ley 8968)
    // ==========================================
    legal: {
        correo_privacidad: "info@innocr.com",
        texto_politica: "En InnoCR, nos comprometemos a proteger la privacidad de tus datos personales de acuerdo con la Ley N.° 8968 de Costa Rica.\n\n1. Finalidad: Los datos que nos proporcionas serán utilizados exclusivamente para la elaboración de tus documentos (Currículum o Carta) en formato PDF y para contactarte vía WhatsApp para coordinar el pago y la entrega.\n\n2. Derechos ARCO: Como titular de los datos, tienes derecho a Acceder, Rectificar, Cancelar (suprimir) u Oponerse al tratamiento de tu información. Para ejercerlos, escríbenos a info@innocr.com. Atenderemos tu solicitud en un máximo de 5 días hábiles.\n\n3. Seguridad: Tus datos se almacenan en plataformas seguras con acceso restringido y no serán compartidos con terceros."
    }
};