import { Users, Target, Lightbulb, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

const About = () => {
  const values = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Misión",
      description: "Impulsar la transformación digital de las empresas mediante soluciones tecnológicas innovadoras y personalizadas."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-accent" />,
      title: "Visión",
      description: "Ser líderes en desarrollo tecnológico, creando el futuro digital de nuestros clientes con excelencia e innovación."
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Valores",
      description: "Excelencia, innovación, compromiso y transparencia en cada proyecto que desarrollamos."
    }
  ];

  const team = [
    {
      name: "Jamil Williams",
      role: "CEO & Fundador",
      description: "10+ años en desarrollo de software y liderazgo tecnológico"
    },
    {
      name: "LA ROSALIA",
      role: "CTO",
      description: "Experta en arquitectura de software y tecnologías emergentes"
    },
    {
      name: "JOSHUA WILLIAMS",
      role: "Lead Developer",
      description: "Especialista en desarrollo full-stack y metodologías ágiles"
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
            Conoce a JW Tech Solutions
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Somos un equipo apasionado por la tecnología, dedicado a crear soluciones digitales que transforman negocios
          </p>
        </div>
      </section>

      {/* Historia Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Nuestra Historia
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Fundada en 2020, JW Tech Solutions nació de la visión de democratizar el acceso a tecnología de vanguardia. 
                Comenzamos como un pequeño equipo de desarrolladores apasionados y hemos crecido hasta convertirnos en una 
                empresa reconocida por nuestra innovación y calidad.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hoy, servimos a clientes desde startups hasta grandes corporaciones, siempre manteniendo nuestro 
                compromiso con la excelencia técnica y el servicio personalizado.
              </p>
            </div>
            <div className="bg-card-gradient p-8 rounded-2xl shadow-medium">
              <div className="flex items-center justify-center h-64 bg-primary/10 rounded-xl">
                <Users className="h-32 w-32 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nuestros Valores
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Los principios que guían cada decisión y proyecto en JW Tech Solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-card-gradient border-0 shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Profesionales experimentados comprometidos con tu éxito
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-card-gradient border-0 shadow-medium hover:shadow-strong transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;