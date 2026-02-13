import { motion } from "framer-motion";
import { siteContent } from "@/config/siteContent";
import Reveal from "@/components/Reveal";
import { Building2 } from "lucide-react";

export default function ClientLogos() {
  const clients = siteContent.clients;

  // Duplicamos los clientes para crear un loop infinito suave
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-background" />
      
      {/* Efecto de grid sutil */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />
      
      {/* Glow decorativo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[hsl(var(--primary))]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 mb-4">
              <Building2 className="h-5 w-5 text-[hsl(var(--primary))]" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[hsl(var(--primary))]">
                Portafolio de Clientes
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight">
              Empresas que Confían en Nosotros
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
              Nos enorgullece colaborar con organizaciones líderes que han elegido nuestras soluciones tecnológicas para impulsar su crecimiento digital. 
              A continuación, presentamos una selección de nuestros clientes más destacados.
            </p>
          </div>
        </Reveal>

        {/* Container con overflow hidden para el efecto de fade */}
        <div className="relative py-8">
          {/* Fade gradients en los bordes - mejorados */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

          {/* Contenedor de animación infinita */}
          <div className="overflow-hidden">
            <div className="flex gap-10 md:gap-16 animate-scroll-infinite w-max">
              {duplicatedClients.map((client, index) => (
                <motion.a
                  key={`${client.name}-${index}`}
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 group"
                  whileHover={{ scale: 1.08, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-3xl border border-white/15 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-md p-8 flex items-center justify-center overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.2)] hover:border-white/25 transition-all duration-500">
                    {/* Glow effect on hover - mejorado */}
                    <div className="absolute inset-0 bg-[hsl(var(--primary))]/0 group-hover:bg-[hsl(var(--primary))]/15 transition-all duration-500 rounded-3xl blur-xl" />
                    
                    {/* Borde interno sutil */}
                    <div className="absolute inset-[1px] rounded-3xl border border-white/5" />
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-3xl" />
                    
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="relative z-10 w-full h-full object-contain filter grayscale-[0.4] group-hover:grayscale-0 transition-all duration-500 brightness-95 group-hover:brightness-110"
                    />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Botón de contacto - mejorado */}
        <Reveal delay={0.2}>
          <div className="mt-16 text-center">
            <motion.a
              href="/contacto"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-foreground font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Iniciar Proyecto</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
