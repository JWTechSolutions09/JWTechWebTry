import { useState } from "react";
import { ExternalLink, Calendar, Users, Code, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = ["Todos", "Web", "Móvil", "E-commerce", "Empresarial"];

  const projects = [
    {
      id: 1,
      title: "E-commerce TechStore",
      description: "Plataforma de comercio electrónico completa con gestión de inventario, pagos y analytics en tiempo real.",
      category: "E-commerce",
      // image eliminada por referencia a 'lovable-uploads'
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      client: "TechStore Corp",
      year: "2024",
      status: "Completado",
      features: ["Carrito de compras", "Pagos seguros", "Panel administrativo", "Analytics"],
      link: "#"
    },
    {
      id: 2,
      title: "App Delivery Express",
      description: "Aplicación móvil para delivery de comida con tracking en tiempo real y sistema de calificaciones.",
      category: "Móvil",
      // image eliminada por referencia a 'lovable-uploads'
      technologies: ["React Native", "Firebase", "Google Maps", "Push Notifications"],
      client: "Delivery Express",
      year: "2024",
      status: "En desarrollo",
      features: ["Tracking GPS", "Notificaciones", "Calificaciones", "Chat"],
      link: "#"
    },
    {
      id: 3,
      title: "Sistema ERP Industrial",
      description: "Sistema empresarial para gestión de recursos, inventario, ventas y reportes analíticos.",
      category: "Empresarial",
      // image eliminada por referencia a 'lovable-uploads'
      technologies: ["Vue.js", "Laravel", "MySQL", "Docker"],
      client: "Industrias ABC",
      year: "2023",
      status: "Completado",
      features: ["Gestión inventario", "CRM", "Reportes", "Facturación"],
      link: "#"
    },
    {
      id: 4,
      title: "Portal Educativo Online",
      description: "Plataforma de educación virtual con cursos, evaluaciones y seguimiento de progreso estudiantil.",
      category: "Web",
      // image eliminada por referencia a 'lovable-uploads'
      technologies: ["Next.js", "Prisma", "AWS", "WebRTC"],
      client: "EduTech Solutions",
      year: "2023",
      status: "Completado",
      features: ["Videoconferencias", "Evaluaciones", "Certificados", "Dashboard"],
      link: "#"
    },
    {
      id: 5,
      title: "App Fintech Banking",
      description: "Aplicación bancaria móvil con transferencias, inversiones y análisis financiero personal.",
      category: "Móvil",
      // image eliminada por referencia a 'lovable-uploads'
      technologies: ["Flutter", "Blockchain", "AI/ML", "Biometric Auth"],
      client: "NeoBank",
      year: "2024",
      status: "En desarrollo",
      features: ["Transferencias", "Inversiones", "Analytics", "Seguridad"],
      link: "#"
    },
    {
      id: 6,
      title: "Marketplace B2B",
      description: "Plataforma B2B para conectar proveedores con empresas, con sistema de cotizaciones y contratos.",
      category: "Web",
      // image eliminada por referencia a 'lovable-uploads'
      technologies: ["React", "GraphQL", "MongoDB", "Microservices"],
      client: "B2B Connect",
      year: "2023",
      status: "Completado",
      features: ["Cotizaciones", "Contratos", "Marketplace", "Ratings"],
      link: "#"
    }
  ];

  const filteredProjects = selectedCategory === "Todos"
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completado":
        return "bg-accent";
      case "En desarrollo":
        return "bg-primary";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Hero Section */}
      <section className="relative py-20 bg-hero-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Nuestros Proyectos
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Descubre los proyectos exitosos que hemos desarrollado para nuestros clientes
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Filter className="h-5 w-5 text-muted-foreground" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-primary" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="bg-card-gradient border-0 shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-2 group overflow-hidden">
                <div className="relative h-48 bg-muted">
                  <div className="absolute inset-0 bg-tech-gradient opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Code className="h-16 w-16 text-primary" />
                  </div>
                  <Badge
                    className={`absolute top-4 right-4 ${getStatusColor(project.status)} text-white`}
                  >
                    {project.status}
                  </Badge>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Client & Year */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        {project.client}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {project.year}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Tecnologías:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Características:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {project.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                        {project.features.length > 3 && (
                          <li className="text-primary">+{project.features.length - 3} más...</li>
                        )}
                      </ul>
                    </div>

                    <Button
                      className="w-full bg-tech-gradient hover:opacity-90 transition-opacity group mt-4"
                      onClick={() => window.open(project.link, '_blank')}
                    >
                      Ver Proyecto
                      <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
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
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Proyectos Completados</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">98%</div>
              <div className="text-muted-foreground">Satisfacción Cliente</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Soporte Técnico</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">4+</div>
              <div className="text-muted-foreground">Años Experiencia</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;