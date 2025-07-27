import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import emailjs from '@emailjs/browser';



const Contact = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: ""
  });

  useEffect(() => {
    const servicioDesdeURL = searchParams.get("servicio");
    if (servicioDesdeURL) {
      setFormData(prev => ({
        ...prev,
        service: servicioDesdeURL,
        message: `Hola, estoy interesado en el servicio de ${servicioDesdeURL}. Me gustaría recibir más información.`
      }));
    }
  }, [searchParams]);

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      value: "jwtechdr@gmail.com",
      subtitle: "Respuesta en menos de 24 horas"
    },
    {
      icon: <Phone className="h-6 w-6 text-accent" />,
      title: "Teléfono",
      value: "+1 (849)-381-9937",
      subtitle: "Lun - Vie 9:00 - 18:00"
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Oficina",
      value: "Santo Domingo, RD",
      subtitle: "Citas disponibles"
    },
    {
      icon: <Clock className="h-6 w-6 text-accent" />,
      title: "Horarios",
      value: "Lun - Vie: 8:00 AM - 18:00 PM",
      subtitle: "Sáb: 10:00 - 14:00"
    }
  ];

  const services = [
    "Desarrollo Web",
    "Aplicaciones Móviles",
    "Software Personalizado",
    "Consultoría Técnica",
    "E-commerce",
    "Otro"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      service: formData.service,
      message: formData.message
    };

    try {
      await emailjs.send(
        "service_fd9i4il",      // Service ID 
        "template_60v84au",     // Template ID 
        templateParams,
        "MBKs0bSMC6hGCJ4Xi"       // Clave pública
      );

      toast({
        title: "¡Mensaje enviado exitosamente!",
        description: "Nos pondremos en contacto contigo pronto.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: ""
      });

    } catch (error) {
      toast({
        title: "Ocurrió un error",
        description: "Intenta de nuevo más tarde o usa otro medio de contacto.",
      });
      console.error("EmailJS error:", error);
    } finally {
      setIsSubmitting(false);
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
            📲Contáctanos:
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            ¿Tienes un proyecto en mente?  Hablemos y hagámoslo realidad con soluciones tecnológicas a tu medida.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-card-gradient border-0 shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-2 text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {info.icon}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">
                    {info.title}
                  </h3>
                  <p className="text-foreground font-medium mb-1">
                    {info.value}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {info.subtitle}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form & Map Section */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-card-gradient border-0 shadow-strong">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Envíanos un mensaje.
                </CardTitle>
                <p className="text-muted-foreground">
                  Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo: *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email: *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono:</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (849)-381-9937"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa:</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Empresa/Grupo/Personal:"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Servicio de interés</Label>

                    {searchParams.get("servicio") ? (
                      // Si vino desde una tarjeta (URL)
                      <Input
                        id="service"
                        name="service"
                        value={formData.service}
                        readOnly
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-not-allowed"
                      />
                    ) : (
                      // Nota :Si no vino desde una tarjeta, muestra el select normal
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      >
                        <option value="">Selecciona un servicio</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje: *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      placeholder="Cuéntanos sobre tu proyecto... Incluye detalles como objetivos y cualquier información relevante."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-tech-gradient hover:opacity-90 transition-opacity"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        Enviar mensaje
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Mapa de ubicación */}
              <Card className="bg-card-gradient border-0 shadow-medium">
                <CardContent className="p-0">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.572875069226!2d-69.98568795247235!3d18.457692433788925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea56178c719da17%3A0xcb4de30651a6d873!2sPlaza%20Paseo%2027!5e0!3m2!1ses-419!2sdo!4v1753515472942!5m2!1ses-419!2sdo"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full rounded-lg"
                  ></iframe>
                </CardContent>
              </Card>

              {/* Why Choose Us */}
              <Card className="bg-card-gradient border-0 shadow-medium">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground">
                    ¿Por qué elegirnos?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Respuesta rápida en menos de 24 horas.",
                      "Presupuestos sin compromiso.",
                      "Equipo especializado y certificado.",
                      "Soporte técnico 24/7.",
                      "Garantía en todos nuestros proyectos."
                    ].map((item, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-accent mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            ¿Prefieres una llamada directa?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Agenda una consulta gratuita de 30 minutos para discutir tu proyecto.
          </p>

          {/* Calendly button */}
          <a
            href="https://calendly.com/jwtechdr/30min"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-tech-gradient hover:opacity-90 transition-opacity">
              <Phone className="mr-2 h-5 w-5" />
              Agendar Llamada
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;