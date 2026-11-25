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
            descripcion: "Creamos tu CV listo para entregar en PDF."
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
        texto_politica: "En InnoCR, nos comprometemos a proteger la privacidad de tus datos personales de acuerdo con la Ley N.° 8968 de Costa Rica.\n\n1. Finalidad: Los datos que nos proporcionas serán utilizados exclusivamente para la elaboración de tus documentos (Currículum o Carta) en formato PDF y para contactarte vía WhatsApp para coordinar el pago y la entrega.\n\n2. Derechos ARCO: Como titular de los datos, tienes derecho a Acceder, Rectificar, Cancelar (suprimir) u Oponerse al tratamiento de tu información. Para ejercerlos, escríbenos a info@innocr.com. Atenderemos tu solicitud en un máximo de 5 días hábiles.\n\n3. Seguridad: Tus datos se almacenan en plataformas seguras con acceso restringido y no serán compartidos con terceros.",

        texto_cookies: "En InnoCR utilizamos cookies y tecnologías similares para analizar cómo navegas en nuestro sitio y mejorar tu experiencia.\n\n1. ¿Qué son las cookies? Son pequeños archivos que se almacenan en tu dispositivo cuando visitas un sitio web. Nos permiten recordar tus preferencias y entender cómo usas el sitio.\n\n2. Tipos de cookies que usamos:\n   • Cookies técnicas necesarias: permiten el funcionamiento básico del sitio (por ejemplo, recordar tu decisión sobre este aviso). No requieren consentimiento.\n   • Cookies analíticas: usamos Google Analytics (a través de Google Tag Manager) para medir de forma anónima cuántas personas visitan el sitio, qué páginas ven y cómo navegan. Esta información nos ayuda a mejorar el contenido y la experiencia.\n\n3. Base legal: Tratamos cookies analíticas únicamente con tu consentimiento, conforme a la Ley N.° 8968 de Costa Rica.\n\n4. Control: Puedes aceptar o rechazar las cookies analíticas desde el aviso que aparece al entrar al sitio. Si las rechazas, no cargaremos Google Analytics y no se enviará información a Google. También puedes borrar las cookies desde la configuración de tu navegador en cualquier momento.\n\n5. Cambios: Si actualizamos esta política, lo indicaremos en este mismo sitio.\n\nSi tienes dudas, escríbenos a info@innocr.com."
    },

    // ==========================================
    // 6. GOOGLE TAG MANAGER
    // ==========================================
    analytics: {
        gtm_id: "GTM-PHGKWSVQ",
        ls_key_consent: "innocr_cookies_consent_v1"
    }
};