import { 
  Code, 
  Smartphone, 
  Globe, 
  Database, 
  Shield, 
  Palette,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const Services = () => {
  const services = [
    {
      icon: <Globe className="h-12 w-12 text-primary" />,
      title: "Desarrollo Web",
      description: "Sitios web modernos, rápidos y responsivos usando las últimas tecnologías",
      features: ["React/Next.js", "E-commerce", "CMS", "SEO Optimizado"],
      price: "Desde $1,500"
    },
    {
      icon: <Smartphone className="h-12 w-12 text-accent" />,
      title: "Apps Móviles",
      description: "Aplicaciones nativas e híbridas para iOS y Android",
      features: ["React Native", "Flutter", "Publicación en stores", "Push notifications"],
      price: "Desde $3,000"
    },
    {
      icon: <Code className="h-12 w-12 text-primary" />,
      title: "Software Personalizado",
      description: "Sistemas a medida para automatizar y optimizar procesos empresariales",
      features: ["ERP/CRM", "APIs REST", "Integraciones", "Escalabilidad"],
      price: "Desde $5,000"
    },
    {
      icon: <Database className="h-12 w-12 text-accent" />,
      title: "Base de Datos",
      description: "Diseño, optimización y migración de bases de datos robustas",
      features: ["MySQL/PostgreSQL", "MongoDB", "Cloud databases", "Backup automático"],
      price: "Desde $800"
    },
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Ciberseguridad",
      description: "Protección integral para tu infraestructura digital",
      features: ["Auditorías", "SSL/TLS", "Firewalls", "Pentesting"],
      price: "Desde $1,200"
    },
    {
      icon: <Palette className="h-12 w-12 text-accent" />,
      title: "UI/UX Design",
      description: "Diseños intuitivos y atractivos centrados en el usuario",
      features: ["Wireframes", "Prototipos", "Design systems", "User testing"],
      price: "Desde $900"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Análisis",
      description: "Entendemos tus necesidades y objetivos de negocio"
    },
    {
      step: "02", 
      title: "Propuesta",
      description: "Diseñamos una solución personalizada con presupuesto detallado"
    },
    {
      step: "03",
      title: "Desarrollo",
      description: "Implementamos la solución con metodologías ágiles"
    },
    {
      step: "04",
      title: "Entrega",
      description: "Desplegamos y capacitamos para el uso óptimo"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Hero Section */}
      <section className="relative py-20 bg-hero-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Nuestros Servicios
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Soluciones tecnológicas completas para impulsar tu negocio al siguiente nivel
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-card-gradient border-0 shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-2 group">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground mb-2">
                    {service.title}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t pt-4">
                    <p className="text-lg font-bold text-primary mb-3">{service.price}</p>
                    <Button className="w-full bg-tech-gradient hover:opacity-90 transition-opacity group">
                      Solicitar Cotización
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nuestro Proceso
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Metodología probada para entregar resultados excepcionales
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border -translate-x-8">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-card-gradient p-12 rounded-2xl shadow-strong">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              ¿Listo para transformar tu negocio?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contáctanos hoy y descubre cómo nuestras soluciones tecnológicas pueden llevar tu empresa al siguiente nivel
            </p>
            <Button size="lg" className="bg-tech-gradient hover:opacity-90 transition-opacity text-lg px-8 py-3">
              Iniciar Proyecto
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;