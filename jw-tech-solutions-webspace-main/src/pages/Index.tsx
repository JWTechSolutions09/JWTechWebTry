import { useEffect, useMemo, useState } from "react";
import { siteContent } from "@/config/siteContent";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Code, Zap,ArrowRight, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const ease = [0.2, 0.8, 0.2, 1] as const;

export default function Index() {
  const { home } = siteContent;
  const images = useMemo(() => home.heroImages?.filter(Boolean) ?? [], [home.heroImages]);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setI((x) => (x + 1) % images.length), 4500);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      {/* HERO (Poster Tech) */}
      <section className="relative overflow-hidden">
        {/* Base background (dark) */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--background))_0%,hsl(0_0%_3%)_55%,hsl(var(--background))_100%)]" />

        {/* Red glows */}
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[hsl(var(--primary))]/30 blur-3xl" />
        <div className="absolute top-10 -right-40 h-[520px] w-[520px] rounded-full bg-[hsl(var(--primary))]/20 blur-3xl" />

        {/* Grid / dots texture */}
        <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:26px_26px]" />

        {/* Noise overlay (CSS only) */}
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')]" />

        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* LEFT: Copy */}
            <div className="max-w-xl">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/75">
                  <Code className="h-4 w-4 text-primary" />
                  <span className="tracking-[0.22em] uppercase">{home.tagline}</span>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="mt-5 text-4xl md:text-6xl lg:text-7xl font-black leading-[0.98] tracking-tight text-white">
                  {home.title}
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-5 text-base md:text-lg text-white/75 leading-relaxed">
                  {home.subtitle}
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="group bg-[hsl(var(--primary))] text-white hover:opacity-95 shadow-[0_14px_45px_hsl(var(--primary)/0.22)]"
                  >
                    <Link to={home.primaryCta.href}>
                      {home.primaryCta.label}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>

                  <Button
  asChild
  variant="outline"
  className="border-white/25 text-white bg-white/5 hover:bg-white/10 hover:text-white"
>
  <a href={home.secondaryCta.href}>{home.secondaryCta.label}</a>
</Button>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <ul className="mt-8 grid gap-3">
                  {home.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-white/80">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10">
                        <Check className="h-4 w-4 text-primary" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* RIGHT: Poster visual */}
            <div className="relative">
              {/* glow frame */}
              <div className="absolute -inset-6 rounded-[32px] bg-[hsl(var(--primary))]/18 blur-3xl" />

              <motion.div
                className="relative overflow-hidden rounded-[32px] border border-white/12 bg-white/5 shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease }}
                whileHover={{ y: -8 }}
              >
                {/* top bar like a “poster” */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                  <p className="text-xs text-white/70 tracking-[0.18em] uppercase">JW Tech Solutions</p>
                  <p className="text-xs text-white/60">jwtechssolutions.com</p>
                </div>

                <div className="relative aspect-[4/3] w-full">
                  {/* tint overlay to keep all images aligned to brand */}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--primary))/0.28,transparent_55%)]" />

                  <AnimatePresence mode="wait">
                    <motion.img
                      key={images[i] ?? "fallback"}
                      src={images[i] ?? "/home/hero-1.png"}
                      alt="JW Tech Hero"
                      className="h-full w-full object-cover"
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease }}
                    />
                  </AnimatePresence>

                  {/* subtle vignette */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_10%,transparent_0%,rgba(0,0,0,0.35)_65%,rgba(0,0,0,0.6)_100%)]" />
                </div>

                {/* dots */}
                <div className="flex items-center justify-between px-5 py-4 border-t border-white/10">
                  <div className="flex gap-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setI(idx)}
                        className={`h-2.5 w-2.5 rounded-full transition ${
                          idx === i ? "bg-[hsl(var(--primary))]" : "bg-white/20 hover:bg-white/30"
                        }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <span className="text-xs text-white/60">
                    {images.length ? `${i + 1}/${images.length}` : "1/1"}
                  </span>
                </div>
              </motion.div>

             
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES TEASER (más premium) */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold">Servicios</h2>
              <p className="mt-2 text-muted-foreground">
                Soluciones modernas con estética premium, animaciones y rendimiento real.
              </p>
            </div>

            <Button asChild variant="outline" className="border-border">
              <Link to="/servicios">Ver todos</Link>
            </Button>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {siteContent.services.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.06, ease }}
              whileHover={{ y: -10 }}
              className="group rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--primary))/0.25,transparent_60%)]" />
              </div>

              <div className="p-5">
                <p className="text-white font-semibold">{s.title}</p>
                <p className="mt-1 text-sm text-white/70">{s.desc}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {s.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-xs rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-white/75"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5">
                  <Button asChild className="w-full bg-[hsl(var(--primary))] text-white hover:opacity-95">
                    <Link to="/contacto">
                      Cotizar <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
