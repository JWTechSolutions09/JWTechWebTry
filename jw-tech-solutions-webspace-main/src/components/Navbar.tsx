import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = useMemo(
    () => [
      { name: "Inicio", path: "/" },
      { name: "Nosotros", path: "/nosotros" },
      { name: "Servicios", path: "/servicios" },
      { name: "Contacto", path: "/contacto" },
    ],
    []
  );

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // cierra menú al cambiar de ruta
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={[
        "sticky top-0 z-50 w-full",
        "border-b border-white/10",
        "backdrop-blur-xl",
        scrolled
          ? "bg-black/70 shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
          : "bg-black/45",
      ].join(" ")}
    >
      {/* red glow line */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary))]/70 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-[hsl(var(--primary))]/20 blur-xl" />
              <img src="/logo-jw.png" alt="JW Tech Solutions" className="relative h-12 w-auto" />
            </div>

            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-semibold tracking-wide text-white">JW TECH</p>
              <p className="text-xs text-white/60">Solutions</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={[
                  "relative rounded-xl px-4 py-2 text-sm font-medium transition",
                  "text-white/80 hover:text-white hover:bg-white/5",
                  isActive(item.path) ? "text-white" : "",
                ].join(" ")}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute left-4 right-4 -bottom-[2px] h-[2px] rounded-full bg-[hsl(var(--primary))]" />
                )}
              </Link>
            ))}

            <Link to="/contacto" className="ml-2">
              <Button className="group bg-[hsl(var(--primary))] text-white hover:opacity-95 shadow-[0_10px_30px_hsl(var(--primary)/0.25)]">
                Cotizar Proyecto
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen((v) => !v)}
              className="text-white hover:bg-white/10"
              aria-label="Open menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-5">
            <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden">
              <div className="p-3 flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={[
                      "rounded-xl px-4 py-3 text-sm font-medium transition",
                      isActive(item.path)
                        ? "bg-white/10 text-white"
                        : "text-white/80 hover:text-white hover:bg-white/5",
                    ].join(" ")}
                  >
                    {item.name}
                  </Link>
                ))}

                <Link to="/contacto" className="mt-2">
                  <Button className="w-full group bg-[hsl(var(--primary))] text-white hover:opacity-95">
                    Cotizar Proyecto
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
