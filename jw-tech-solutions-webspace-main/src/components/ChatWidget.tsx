import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageCircle,
    X,
    Send,
    Sparkles,
    Volume2,
    VolumeX,
    Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

type Msg = { role: "user" | "assistant"; content: string };

function TypingDots() {
    return (
        <div className="flex items-center gap-1 px-3 py-2">
            <span className="sr-only">Escribiendo</span>
            <motion.span
                className="h-1.5 w-1.5 rounded-full bg-foreground/60"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.9, repeat: Infinity }}
            />
            <motion.span
                className="h-1.5 w-1.5 rounded-full bg-foreground/60"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: 0.15 }}
            />
            <motion.span
                className="h-1.5 w-1.5 rounded-full bg-foreground/60"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: 0.3 }}
            />
        </div>
    );
}

const LS_KEY = "jw_chat_messages_v1";
const LS_SOUND = "jw_chat_sound_v1";

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [typing, setTyping] = useState(false);
    const [soundOn, setSoundOn] = useState(true);

    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<Msg[]>([
        {
            role: "assistant",
            content:
                "Hola 👋 Soy Jowi, el asistente virtual de JW Tech Solutions. ¡Qué bueno tenerte por aquí! 🤖✨ Soy una IA desarrollada por el equipo de JW Tech, creada para ayudarte a conocer nuestros servicios y responder tus preguntas. ¿En qué te puedo ayudar?",
        },
    ]);

    // ---- SFX (opcional) ----
    const play = (src: string) => {
        if (!soundOn) return;
        try {
            const a = new Audio(src);
            a.volume = 0.35;
            a.play().catch(() => { });
        } catch { }
    };

    // ---- Cargar historial guardado ----
    useEffect(() => {
        try {
            const saved = localStorage.getItem(LS_KEY);
            if (saved) {
                const parsed = JSON.parse(saved) as Msg[];
                if (Array.isArray(parsed) && parsed.length) setMessages(parsed);
            }
            const s = localStorage.getItem(LS_SOUND);
            if (s === "0") setSoundOn(false);
        } catch { }
    }, []);

    // ---- Guardar historial ----
    useEffect(() => {
        try {
            localStorage.setItem(LS_KEY, JSON.stringify(messages));
        } catch { }
    }, [messages]);

    // ---- Guardar sound setting ----
    useEffect(() => {
        try {
            localStorage.setItem(LS_SOUND, soundOn ? "1" : "0");
        } catch { }
    }, [soundOn]);

    // ---- Auto focus ----
    useEffect(() => {
        if (!open) return;
        const t = setTimeout(() => inputRef.current?.focus(), 120);
        return () => clearTimeout(t);
    }, [open]);

    // ---- Auto scroll ----
    useEffect(() => {
        if (!open) return;
        const el = scrollRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }, [messages, open, loading, typing]);

    const historyForApi = useMemo(
        () => messages.map((m) => ({ role: m.role, content: m.content })),
        [messages]
    );

    // ---- Typewriter effect ----
    const typeAssistant = async (fullText: string) => {
        setTyping(true);
        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        let i = 0;
        const speed = 10;

        await new Promise<void>((resolve) => {
            const tick = () => {
                i++;
                setMessages((prev) => {
                    const copy = [...prev];
                    const last = copy[copy.length - 1];
                    if (!last || last.role !== "assistant") return prev;
                    copy[copy.length - 1] = { ...last, content: fullText.slice(0, i) };
                    return copy;
                });

                if (i >= fullText.length) return resolve();
                setTimeout(tick, speed);
            };
            tick();
        });

        setTyping(false);
    };

    const clearChat = () => {
        const base: Msg[] = [
            {
                role: "assistant",
                content: "Hola 👋 Soy Jowi, el asistente virtual de JW Tech Solutions. ¡Qué bueno tenerte por aquí! 🤖✨ Soy una IA desarrollada por el equipo de JW Tech, creada para ayudarte a conocer nuestros servicios y responder tus preguntas. ¿En qué te puedo ayudar?",
            },
        ];
        setMessages(base);
        setText("");
    };

    const send = async (preset?: string) => {
        const msg = (preset ?? text).trim();
        if (!msg || loading || typing) return;

        play("/sfx-send.mp3");

        const newMessages: Msg[] = [...messages, { role: "user", content: msg }];
        setMessages(newMessages);
        setText("");
        setLoading(true);

        try {
            const r = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: msg,
                    history: historyForApi,
                }),
            });

            const data = await r.json();
            const reply = data?.reply ?? "No pude responder ahora mismo.";

            setLoading(false);
            play("/sfx-receive.mp3");

            await typeAssistant(reply);
        } catch {
            setLoading(false);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Error de conexión. Intenta de nuevo." },
            ]);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-[9999]">
            {/* Floating button (Avatar JOWI + mini chat bubble) */}
            <AnimatePresence>
                {!open && (
                    <motion.div
                        initial={{ scale: 0.92, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.92, opacity: 0, y: 10 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        className="relative"
                    >
                        {/* Glow breathing */}
                        <motion.div
                            className="absolute -inset-3 rounded-full blur-2xl opacity-50 bg-gradient-to-r from-primary/40 via-fuchsia-500/25 to-cyan-400/25"
                            animate={{ opacity: [0.25, 0.65, 0.25], scale: [1, 1.06, 1] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Main avatar button */}
                        <motion.button
                            type="button"
                            onClick={() => {
                                setOpen(true);
                                play("/sfx-open.mp3");
                            }}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative h-16 w-16 rounded-full overflow-hidden border border-white/10 shadow-2xl bg-background/70 backdrop-blur outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            aria-label="Abrir chat con Jowi"
                        >
                            {/* subtle shine */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-60" />

                            {/* avatar */}
                            <img
                                src="/jowi.png"
                                alt="Jowi"
                                className="h-full w-full object-cover"
                                draggable={false}
                            />

                            {/* Online + ping */}
                            <span className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
                            <span className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full bg-emerald-500/40 animate-ping" />
                        </motion.button>

                        {/* Mini chat bubble */}
                        <motion.button
                            type="button"
                            onClick={() => {
                                setOpen(true);
                                play("/sfx-open.mp3");
                            }}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.96 }}
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full grid place-items-center border border-white/10 bg-primary text-primary-foreground shadow-xl"
                            aria-label="Abrir chat"
                            title="Chat"
                        >
                            <MessageCircle className="h-4 w-4" />
                        </motion.button>

                        {/* Label */}
                        <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="absolute -top-3 left-1/2 -translate-x-1/2"
                        >
                            <span className="inline-flex items-center gap-1 rounded-full bg-background/70 backdrop-blur border border-white/10 px-2 py-1 text-[10px] shadow">
                                <Sparkles className="h-3 w-3" />
                                Jowi
                            </span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                        className="w-[360px] sm:w-[400px]"
                    >
                        <Card className="overflow-hidden border border-white/10 bg-background/70 backdrop-blur-xl shadow-2xl">
                            {/* Header */}
                            <div className="relative p-4">
                                <div className="absolute inset-0 opacity-70 bg-gradient-to-r from-primary/20 via-fuchsia-500/10 to-cyan-400/10" />
                                <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:22px_22px]" />

                                <div className="relative flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/50 to-cyan-400/40 blur-md opacity-60" />
                                            <img
                                                src="/jowi.png"
                                                alt="Jowi"
                                                className="relative h-10 w-10 rounded-full object-cover border border-white/10"
                                            />
                                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
                                        </div>

                                        <div className="leading-tight">
                                            <div className="font-semibold tracking-wide">
                                                JOWI • JW TECH ASSISTANT
                                            </div>
                                            <div className="text-xs opacity-70">
                                                Online • Respuesta rápida • Soporte inteligente
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setSoundOn((v) => !v)}
                                            aria-label="Sonido"
                                            className="hover:bg-white/5"
                                            title="Sonido"
                                        >
                                            {soundOn ? (
                                                <Volume2 className="h-4 w-4" />
                                            ) : (
                                                <VolumeX className="h-4 w-4" />
                                            )}
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={clearChat}
                                            aria-label="Limpiar chat"
                                            className="hover:bg-white/5"
                                            title="Limpiar chat"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setOpen(false)}
                                            aria-label="Cerrar chat"
                                            className="hover:bg-white/5"
                                            title="Cerrar"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <CardContent className="p-4 pt-0">
                                {/* Quick chips */}
                                <div className="flex flex-wrap gap-2 py-3">
                                    {["Servicios", "Web & Apps", "Ciberseguridad", "IA & Automatización"].map(
                                        (c) => (
                                            <motion.button
                                                key={c}
                                                whileHover={{ y: -1 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => send(`Quiero información sobre: ${c}`)}
                                                className="text-xs rounded-full px-3 py-1 border border-white/10 bg-white/5 hover:bg-white/10 transition"
                                            >
                                                {c}
                                            </motion.button>
                                        )
                                    )}
                                </div>

                                {/* Messages */}
                                <div
                                    ref={scrollRef}
                                    className="h-[380px] overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-3 space-y-2"
                                >
                                    {messages.map((m, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.18 }}
                                            className={m.role === "user" ? "text-right" : "text-left"}
                                        >
                                            <div
                                                className={
                                                    "inline-block max-w-[86%] rounded-2xl px-3 py-2 text-sm whitespace-pre-line " +
                                                    (m.role === "user"
                                                        ? "bg-primary text-primary-foreground shadow"
                                                        : "bg-background/70 border border-white/10")
                                                }
                                            >
                                                {m.content}
                                            </div>
                                        </motion.div>
                                    ))}

                                    {(loading || typing) && (
                                        <div className="text-left">
                                            <div className="inline-block max-w-[86%] rounded-2xl border border-white/10 bg-background/70">
                                                <TypingDots />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Input */}
                                <div className="mt-3 flex gap-2">
                                    <Input
                                        ref={inputRef}
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && send()}
                                        placeholder="Escribe tu pregunta..."
                                        className="bg-background/70 border-white/10"
                                        disabled={loading || typing}
                                    />
                                    <Button
                                        onClick={() => send()}
                                        disabled={loading || typing}
                                        className="min-w-12"
                                        aria-label="Enviar"
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="mt-2 text-[11px] opacity-60">
                                    Tip: pregunta por servicios, precios, tiempo de entrega o soporte.
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
