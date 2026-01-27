export const siteContent = {
  home: {
    tagline: "JW TECH SOLUTIONS",
    title: "Innovación Digital Para Tu Empresa",
    subtitle:
      "Desarrollo web, apps móviles, eCommerce y automatización con un enfoque moderno, seguro y escalable.",
    primaryCta: { label: "Cotizar Proyecto", href: "/contact" },
    secondaryCta: { label: "Ver Servicios", href: "/servicios" },

    // ✅ Cambias imágenes aquí y ya
    heroImages: ["/home/hero-1.png", "/home/hero-2.png", "/home/hero-3.jpeg"],

    bullets: [
      "Diseño moderno y optimizado",
      "Integración con redes sociales y herramientas",
      "Analítica y crecimiento",
      "Automatización y seguridad",
    ],
  },

  services: [
    {
      title: "Páginas Web",
      desc: "Webs modernas, rápidas y listas para vender.",
      image: "/services/web.png",
      tags: ["Vite/React", "SEO", "Performance"],
    },
    {
      title: "Apps Móviles",
      desc: "iOS/Android con UI premium y experiencia fluida.",
      image: "/services/mobile.png",
      tags: ["UX", "Notificaciones", "Escalable"],
    },
    {
      title: "eCommerce",
      desc: "Tu tienda online desde cero y automatizada.",
      image: "/services/ecommerce.png",
      tags: ["Pagos", "Inventario", "Automatización"],
    },
    {
      title: "Ciberseguridad",
      desc: "Capas de seguridad y buenas prácticas reales.",
      image: "/services/security.png",
      tags: ["Hardening", "Auditoría", "Protección"],
    },
  ],
  servicesPage: {
    badge: "JW TECH SOLUTIONS",
    title: "Servicios que se sienten modernos",
    subtitle:
      "Tecnología, estrategia y diseño unidos para acelerar tu crecimiento. Construimos experiencias premium: rápidas, seguras y listas para convertir.",
    primaryCta: { label: "Cotizar Proyecto", href: "/contacto" },
    secondaryCta: { label: "Ver Proyectos", href: "/proyectos" },

    filterTitle: "Explora por categoría",
    filterSubtitle: "Elige un enfoque o revisa todo el catálogo.",

    processTitle: "Nuestro Proceso",
    processSubtitle: "Un flujo claro para garantizar calidad, velocidad y resultados.",

    ctaTitle: "¿Listo para transformar tu negocio?",
    ctaSubtitle:
      "Cuéntanos tu idea y te proponemos una solución moderna, escalable y con estética premium.",
    ctaPrimary: { label: "Iniciar Proyecto", href: "/contacto" },
    ctaSecondary: { label: "Ver trabajos", href: "/proyectos" },

    // categorías visibles en el filtro
    categories: ["Todos", "Web", "Mobile", "Software", "Database", "Security", "Design"] as const,
  },

  servicesCatalog: [
    {
      category: "Web",
      title: "Desarrollo Web",
      description: "Sitios web modernos, rápidos y responsivos usando las últimas tecnologías.",
      features: ["React/Next.js", "Landing pages", "CMS", "SEO + Performance"],
      price: "Cotización personalizada",
      image: "/services/web.png",
    },
    {
      category: "Mobile",
      title: "Apps Móviles",
      description: "Aplicaciones nativas e híbridas para iOS y Android con UX premium.",
      features: ["React Native", "Flutter", "Publicación en stores", "Push notifications"],
      price: "Cotización personalizada",
      image: "/services/mobile.png",
    },
    {
      category: "Software",
      title: "Software Personalizado",
      description: "Sistemas a medida para automatizar y optimizar procesos empresariales.",
      features: ["ERP/CRM", "APIs REST", "Integraciones", "Arquitectura escalable"],
      price: "Cotización personalizada",
      image: "/services/software.png",
    },
    {
      category: "Database",
      title: "Base de Datos",
      description: "Diseño, optimización y migración de bases de datos robustas y seguras.",
      features: ["MySQL/PostgreSQL", "MongoDB", "Cloud DB", "Backups + monitoreo"],
      price: "Cotización personalizada",
      image: "/services/database.png",
    },
    {
      category: "Security",
      title: "Ciberseguridad",
      description: "Protección integral para tu infraestructura digital y reputación.",
      features: ["Auditorías", "SSL/TLS", "Hardening", "Pentesting básico"],
      price: "Cotización personalizada",
      image: "/services/security.png",
    },
    {
      category: "Design",
      title: "UI/UX Design",
      description: "Diseños intuitivos, atractivos y centrados en conversión.",
      features: ["Wireframes", "Prototipos", "Design systems", "User testing"],
      price: "Cotización personalizada",
      image: "/services/design.png",
    },
  ],

  servicesProcess: [
    {
      step: "01",
      title: "Análisis",
      description:
        "Evaluamos necesidades, metas y entorno para definir el enfoque ideal y el alcance correcto.",
    },
    {
      step: "02",
      title: "Propuesta",
      description:
        "Diseñamos una solución a medida con entregables, tiempos y presupuesto claros desde el inicio.",
    },
    {
      step: "03",
      title: "Desarrollo",
      description:
        "Iteramos con metodología ágil, validando avances y cuidando calidad, rendimiento y seguridad.",
    },
    {
      step: "04",
      title: "Entrega",
      description:
        "Desplegamos, capacitamos y damos soporte para una adopción fluida y mejoras continuas.",
    },
  ],
};
