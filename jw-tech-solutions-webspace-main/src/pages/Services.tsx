import { useMemo, useState } from "react";
import { siteContent } from "@/config/siteContent";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Filter,
  Sparkles,
  Globe,
  Smartphone,
  Code,
  Database,
  Shield,
  Palette,
} from "lucide-react";

type Category = (typeof siteContent.servicesPage.categories)[number];

const ease = [0.2, 0.8, 0.2, 1] as const;

function iconByCategory(category: string) {
  switch (category) {
    case "Web":
      return <Globe className="h-7 w-7 text-primary" />;
    case "Mobile":
      return <Smartphone className="h-7 w-7 text-primary" />;
    case "Software":
      return <Code className="h-7 w-7 text-primary" />;
    case "Database":
      return <Database className="h-7 w-7 text-primary" />;
    case "Security":
      return <Shield className="h-7 w-7 text-primary" />;
    case "Design":
      return <Palette className="h-7 w-7 text-primary" />;
    default:
      return <Sparkles className="h-7 w-7 text-primary" />;
  }
}

export default function Services() {
  const { servicesPage } = siteContent;
  const catalog = siteContent.servicesCatalog ?? [];
  const process = siteContent.servicesProcess ?? [];

  const [active, setActive] = useState<Category>("Todos");

  const filtered = useMemo(() => {
    if (active === "Todos") return catalog;
    return catalog.filter((s) => s.category === active);
  }, [active, catalog]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO (Poster Tech) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--background))_0%,hsl(0_0%_3%)_55%,hsl(var(--background))_100%)]" />
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[hsl(var(--primary))]/30 blur-3xl" />
        <div className="absolute top-10 -right-40 h-[520px] w-[520px] rounded-full bg-[hsl(var(--primary))]/20 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/75">
            <Shield className="h-4 w-4 text-primary" />
            <span className="tracking-[0.22em] uppercase">{servicesPage.badge}</span>
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-black leading-[0.98] tracking-tight text-white">
            {servicesPage.title}
          </h1>

          <p className="mt-4 text-base md:text-lg text-white/75 max-w-3xl mx-auto">
            {servicesPage.subtitle}
          </p>

          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <Button
              asChild
              className="group bg-[hsl(var(--primary))] text-white hover:opacity-95 shadow-[0_14px_45px_hsl(var(--primary)/0.22)]"
            >
              <Link to={servicesPage.primaryCta.href}>
                {servicesPage.primaryCta.label}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>

             <Button
  asChild
  variant="outline"
  className="border-white/25 text-white bg-white/5 hover:bg-white/10 hover:text-white"
>
  <a href={servicesPage.secondaryCta.href}>{servicesPage.secondaryCta.label}</a>
</Button>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="mx-auto max-w-7xl px-6 pt-12">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
              {servicesPage.filterTitle}
            </h2>
            <p className="mt-2 text-muted-foreground">{servicesPage.filterSubtitle}</p>
          </div>

          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>Filtrar</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {servicesPage.categories.map((c) => {
            const is = c === active;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  "border",
                  is
                    ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]"
                    : "bg-transparent text-foreground border-border hover:bg-muted/30",
                ].join(" ")}
              >
                {c}
              </button>
            );
          })}
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.06, ease }}
              whileHover={{ y: -10 }}
              className="group rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--primary))/0.25,transparent_60%)]" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/50 px-3 py-2">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                    {iconByCategory(service.category)}
                  </span>
                  <span className="text-xs text-white/70 tracking-[0.18em] uppercase">{service.category}</span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-white text-lg font-semibold">{service.title}</p>
                <p className="mt-1 text-sm text-white/70">{service.description}</p>

                <ul className="mt-4 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-white/75">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <p className="text-sm text-white/70">{service.price}</p>
                  <Button asChild className="group bg-[hsl(var(--primary))] text-white hover:opacity-95">
                    <Link to={`/contacto?servicio=${encodeURIComponent(service.title)}`}>
                      Solicitar
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.35),transparent_55%)]" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-[hsl(var(--primary))]/14 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              {servicesPage.processTitle}
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              {servicesPage.processSubtitle}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: idx * 0.06, ease }}
                className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur-xl p-6 shadow-[0_18px_60px_rgba(0,0,0,0.25)]"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-[hsl(var(--primary))] text-white flex items-center justify-center font-black">
                    {item.step}
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-[hsl(var(--primary))]/60 to-transparent" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/35 backdrop-blur-xl p-10 md:p-14 shadow-[0_25px_90px_rgba(0,0,0,0.45)]">
          <div className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-[hsl(var(--primary))]/18 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.10] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px]" />

          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-black text-white">{servicesPage.ctaTitle}</h2>
            <p className="mt-3 text-white/75 max-w-2xl">{servicesPage.ctaSubtitle}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="group bg-[hsl(var(--primary))] text-white hover:opacity-95 shadow-[0_14px_45px_hsl(var(--primary)/0.22)]"
              >
                <Link to={servicesPage.ctaPrimary.href}>
                  {servicesPage.ctaPrimary.label}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>

              <Button
  asChild
  variant="outline"
  className="border-white/25 text-white bg-white/5 hover:bg-white/10 hover:text-white"
>
  <a href={servicesPage.secondaryCta.href}>{servicesPage.secondaryCta.label}</a>
</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
