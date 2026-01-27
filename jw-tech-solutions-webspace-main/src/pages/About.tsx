import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Lightbulb, Award } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const PosterBackground = () => (
  <>
    {/* Base poster tech */}
    <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_20%,hsl(var(--primary)/0.35),transparent_55%),radial-gradient(900px_circle_at_85%_25%,hsl(var(--primary)/0.18),transparent_60%),linear-gradient(135deg,hsl(var(--background))_0%,hsl(0_0%_4%)_58%,hsl(var(--background))_100%)]" />
    {/* Dots texture */}
    <div className="absolute inset-0 opacity-[0.10] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px]" />
    {/* Vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_0%,transparent_35%,rgba(0,0,0,0.65)_100%)]" />
  </>
);

const About = () => {
  const values = [
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      title: "Misión",
      description:
        "Impulsar la transformación digital de las empresas con soluciones innovadoras, eficientes y personalizadas que generen valor real.",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-primary" />,
      title: "Visión",
      description:
        "Ser una empresa líder en soluciones tecnológicas, reconocida por excelencia, creatividad e impacto en el crecimiento de nuestros clientes.",
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Valores",
      description:
        "Excelencia, innovación, compromiso, integridad y enfoque humano en cada proyecto que construimos.",
    },
  ];

  const team = [
    {
      name: "Jamil Williams",
      role: "CEO & Fundador",
      description:
        "Especialista en desarrollo Full-stack, metodologías ágiles y liderazgo tecnológico.",
    },
    {
      name: "Joshua Williams",
      role: "Lead Developer",
      description: "Especialista en desarrollo full-stack y metodologías ágiles.",
    },
    {
      name: "Genesis Diaz",
      role: "Lead Designer",
      description:
        "Lidera identidades visuales sólidas y coherentes que elevan el valor de cada marca.",
    },
    {
      name: "Carlos Miguel",
      role: "Lead Developer",
      description:
        "Experto en arquitectura de software y tecnologías emergentes.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* HERO: Texto + Imagen (igual que Home) */}
      <section className="relative overflow-hidden">
        <PosterBackground />

        <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="max-w-2xl"
            >
              <motion.div
                variants={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-white/80"
              >
                <span className="text-primary font-semibold">{"</>"}</span>
                <span className="tracking-[0.25em] uppercase text-[11px]">
                  JW TECH SOLUTIONS
                </span>
              </motion.div>

              <motion.h1
                variants={item}
                className="mt-5 text-4xl md:text-6xl font-extrabold leading-[1.05] text-white"
              >
                Conoce a JW Tech Solutions 🚀:
              </motion.h1>

              <motion.p
                variants={item}
                className="mt-4 text-base md:text-lg text-white/75 leading-relaxed"
              >
                
              </motion.p>
            </motion.div>

            {/* Card imagen tipo poster/home */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-[28px] bg-primary/25 blur-3xl" />
              <div className="relative rounded-[28px] border border-white/12 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                  <p className="text-xs tracking-[0.22em] uppercase text-white/70">
                    JW TECH SOLUTIONS
                  </p>
                  <p className="text-xs text-white/60">jwtechssolutions.com</p>
                </div>

                <div className="aspect-[16/10] w-full bg-black/20">
                  {/* 👇 Cambia el src por la imagen que usas en el Home */}
                  <img
                    src="/home/poster.jpg"
                    alt="JW Tech Solutions Poster"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-5 py-4 border-t border-white/10">
                  <p className="text-sm text-white/75">
                    YOUTUBE CHANNEL COMING SOON..
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

     {/* HISTORIA (mismo estilo, sin fondo blanco) */}
<section className="relative overflow-hidden py-14 md:py-20">
  <PosterBackground />

  <div className="relative max-w-7xl mx-auto px-6">
    <div className="grid md:grid-cols-2 gap-10 items-center">
      {/* Texto */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.h2
          variants={item}
          className="text-3xl md:text-4xl font-bold text-white"
        >
          El Futuro de la Tecnología:
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-5 text-base md:text-lg text-white/75 leading-relaxed"
        >
         Vivimos en una era donde todo está conectado, donde una empresa puede
          operar de forma autónoma desde la palma de una mano. En este contexto, la
          tecnología no es algo que deba generar miedo ni preocupación, sino una
          herramienta que, bien comprendida, abre un universo infinito de
          oportunidades. 
        </motion.p>

        <motion.p
          variants={item}
          className="mt-5 text-base md:text-lg text-white/75 leading-relaxed"
        >
          En JW TECH cultivamos una cultura basada en la innovación y el aprendizaje
          constante. No nos limitamos al desarrollo de software como un fin en sí
          mismo; aspiramos a ser una de las empresas de soluciones tecnológicas más
          completas del mercado. Nuestro camino nos lleva más allá, hasta la
          creación de modelos de inteligencia artificial plenamente funcionales y
          diseñados a la medida de cada empresa.
        </motion.p>

        <motion.p
          variants={item}
          className="mt-5 text-base md:text-lg text-white/75 leading-relaxed"
        >
          Creamos sistemas personalizados, escalables y seguros que evolucionan con
          tus necesidades. La tecnología no es un lujo: es una inversión
          inteligente.
        </motion.p>
      </motion.div>

      {/* Tarjeta (mismo tamaño tipo Index) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative w-full lg:justify-self-end lg:max-w-[560px]"
      >
        <div className="absolute -inset-6 rounded-[28px] bg-primary/25 blur-3xl" />

        <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-white/5 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
            <p className="text-xs tracking-[0.22em] uppercase text-white/70">
              JW TECH SOLUTIONS
            </p>
            <p className="text-xs text-white/60">jwtechssolutions.com</p>
          </div>

          {/* ratio “tipo laptop card” como el index */}
          <div className="aspect-[16/9] w-full bg-black/20">
            <img
              src="/home/poster2.jpg"
              alt="JW Tech Solutions Poster"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="px-5 py-4 border-t border-white/10">
            <p className="text-sm text-white/75">
              Soluciones digitales listas para escalar.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>


      {/* VALORES (cards premium, no vacías) */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <PosterBackground />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="text-center"
          >
            <motion.h2
              variants={item}
              className="text-3xl md:text-4xl font-bold text-white"
            >
              Nuestros Valores
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-3 text-base md:text-lg text-white/70 max-w-2xl mx-auto"
            >
              Lo que creemos guía lo que creamos.
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10 grid md:grid-cols-3 gap-6"
          >
            {values.map((v) => (
              <motion.div key={v.title} variants={item}>
                <Card className="h-full border border-white/12 bg-white/5 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-7">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 border border-white/10">
                      {v.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{v.title}</h3>
                    <p className="mt-3 text-white/70 leading-relaxed">
                      {v.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* EQUIPO (cards con contenido visible) */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <PosterBackground />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="text-center"
          >
            <motion.h2
              variants={item}
              className="text-3xl md:text-4xl font-bold text-white"
            >
              Nuestro Equipo
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-3 text-base md:text-lg text-white/70 max-w-2xl mx-auto"
            >
              Personas apasionadas, experiencia comprobada y compromiso real con tu
              crecimiento.
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {team.map((m) => (
              <motion.div
                key={m.name}
                variants={item}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                <Card className="h-full border border-white/12 bg-white/5 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-7">
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 border border-white/10">
                      <Users className="h-6 w-6 text-primary" />
                    </div>

                    <h3 className="text-lg font-bold text-white">{m.name}</h3>
                    <p className="mt-1 text-sm text-primary font-semibold">
                      {m.role}
                    </p>
                    <p className="mt-3 text-sm text-white/70 leading-relaxed">
                      {m.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
