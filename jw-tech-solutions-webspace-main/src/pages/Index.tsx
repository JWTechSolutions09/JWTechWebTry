import { ArrowRight, Code, Smartphone, Globe, Users, Star, CheckCircle,   
  Cloud,
  Server,
  ShieldCheck,
  Wrench,
  AlertTriangle,
  Satellite,
  Repeat,
  Paintbrush,
  Megaphone
  
 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const Index = () => {
  const features = [
    {
    icon: <Globe className="h-12 w-12 text-primary" />,
    title: "Desarrollo Web",
    description: "Creamos sitios web modernos, rápidos y adaptables que elevan tu presencia digital y mejoran la experiencia del usuario."
  },
  {
    icon: <Smartphone className="h-12 w-12 text-accent" />,
    title: "Apps Móviles",
    description: "Desarrollamos aplicaciones móviles nativas que conectan con tus usuarios desde cualquier lugar, en cualquier dispositivo."
  },
  {
    icon: <Code className="h-12 w-12 text-primary" />,
    title: "Software Personalizado",
    description: "Diseñamos soluciones a medida que se adaptan a tus procesos y necesidades específicas, mejorando la productividad de tu empresa."
  },
  {
    icon: <Cloud className="h-12 w-12 text-primary" />,
    title: "Servicios en la Nube",
    description: "Implementamos y gestionamos soluciones en la nube seguras y escalables para facilitar el acceso y la colaboración desde cualquier parte del mundo."
  },
  {
    icon: <Server className="h-12 w-12 text-accent" />,
    title: "Infraestructura IT",
    description: "Optimizamos y gestionamos redes, servidores y sistemas críticos para garantizar la continuidad y el rendimiento de tu negocio."
  },
  {
    icon: <ShieldCheck className="h-12 w-12 text-primary" />,
    title: "Ciberseguridad",
    description: "Protegemos tu información y sistemas con soluciones avanzadas de seguridad digital y monitoreo continuo contra amenazas."
  },
  {
    icon: <Paintbrush className="h-12 w-12 text-primary" />,
    title: "Diseño Gráfico",
    description: "Creamos identidades visuales impactantes y materiales gráficos profesionales que comunican efectivamente el valor de tu marca."
  },
  
  {
    icon: <Wrench className="h-12 w-12 text-primary" />,
    title: "CMMS Implementation & Migration",
    description: "Instalamos, migramos y optimizamos sistemas CMMS para una gestión eficiente del mantenimiento y activos empresariales."
  },
  {
    icon: <AlertTriangle className="h-12 w-12 text-accent" />,
    title: "ECMS Installation & Warning Setup",
    description: "Configuramos sistemas ECMS con alertas inteligentes para monitorear procesos críticos y garantizar operaciones eficientes."
  },
  {
    icon: <Satellite className="h-12 w-12 text-primary" />,
    title: "IoT Device Integration & Tracking",
    description: "Conectamos e integramos dispositivos IoT para el monitoreo y control en tiempo real de tus procesos o activos."
  },
  {
    icon: <Repeat className="h-12 w-12 text-accent" />,
    title: "Automation & Process Optimization",
    description: "Automatizamos tareas repetitivas y optimizamos flujos de trabajo para reducir errores, ahorrar tiempo y aumentar la eficiencia."
  },
  {
    icon: <Users className="h-12 w-12 text-accent" />,
    title: "Manejo de Redes Sociales",
    description: "Gestionamos estratégicamente tus redes sociales para aumentar tu visibilidad, generar engagement y potenciar tu marca en línea."
  },
  {
  icon: <Megaphone className="h-12 w-12 text-primary" />,
  title: "Marketing Digital y Publicidad",
  description: "Diseñamos campañas digitales efectivas para posicionar tu marca, atraer nuevos clientes y aumentar tus conversiones en línea."
}


  ];

  const testimonials = [
    {
      name: "María González",
      company: "Tech Innovators",
      text: "JW Tech Solutions transformó completamente nuestro negocio con una plataforma increíble.",
      rating: 5
    },
    {
      name: "Carlos Rodríguez", 
      company: "StartupXYZ",
      text: "Nos apoyaron en cada paso del camino, desde la idea inicial hasta el lanzamiento final.",
      rating: 5
    },
    {
      name: "Ana Martínez",
      company: "Retail Plus",
      text: "Su expertise técnico y atención al detalle superaron nuestras expectativas.",
      rating: 5
    }
  ];

  const stats = [
    { number: "10+", label: "Proyectos Completados" },
    { number: "98%", label: "Satisfacción Cliente" },
    { number: "24/7", label: "Soporte Técnico" },
    { number: "10+", label: "Tecnicos Profesionales Disponibles" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-hero-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Innovación Digital<br />
              <span className="bg-white bg-clip-text text-transparent">
                Para Tu Empresa
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
            💡Llevamos tu visión al siguiente nivel con tecnología que transforma.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contacto">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 transition-colors text-lg px-8 py-3">
                  Iniciar Proyecto
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/proyectos">
                <Button size="lg" variant="hero" className="text-lg px-8 py-3">
                  Ver Proyectos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Nuestros Servicios:
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tecnología que transforma. Soluciones que impulsan. Resultados que escalan.🚀
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card-gradient border-0 shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-2 group">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Reseñas:
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              La satisfacción de nuestros clientes es nuestra mayor recompensa.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card-gradient border-0 shadow-medium hover:shadow-strong transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-card-gradient p-12 rounded-2xl shadow-strong">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              ¿Listo Para Comenzar Tu Proyecto?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contáctanos hoy y descubre cómo podemos transformar tu idea en una solución digital exitosa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contacto">
                <Button size="lg" className="bg-tech-gradient hover:opacity-90 transition-opacity text-lg px-8 py-3">
                  Empezar Ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/servicios">
                <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                  Ver Servicios
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Por Qué Elegir JW Tech Solutions?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Equipo especializado y certificado",
              "Metodologías ágiles y probadas",
              "Soporte técnico 24/7",
              "Tecnologías de vanguardia",
              "Garantía en todos los proyectos",
              "Precios competitivos y transparentes"
            ].map((item, index) => (
              <div key={index} className="flex items-center p-4 bg-card-gradient rounded-lg shadow-soft">
                <CheckCircle className="h-6 w-6 text-accent mr-4 flex-shrink-0" />
                <span className="text-foreground font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
