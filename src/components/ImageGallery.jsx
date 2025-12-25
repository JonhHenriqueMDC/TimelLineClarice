import { useEffect, useMemo, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export function ImageGallery({ images = [], alt = "" }) {
  const list = useMemo(() => (Array.isArray(images) ? images.filter(Boolean) : []), [images]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const canNav = list.length > 1;

  const openAt = (idx) => {
    setActive(clamp(idx, 0, list.length - 1));
    setOpen(true);
  };

  const close = () => setOpen(false);

  const prev = () => setActive((v) => (v - 1 + list.length) % list.length);
  const next = () => setActive((v) => (v + 1) % list.length);

  // teclado no fullscreen
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (!canNav) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, canNav, list.length]);

  // trava scroll do body quando abre fullscreen
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (list.length === 0) return null;

  return (
    <>
      {/* ======= Galeria horizontal (quando > 1) ======= */}
      {list.length > 1 ? (
        <div className="mt-2">
          <div
            className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {list.map((src, idx) => (
              <button
                key={`${src}-${idx}`}
                type="button"
                onClick={() => openAt(idx)}
                className="relative rounded-xl overflow-hidden border shrink-0 active:scale-[0.99] transition"
                style={{
                  width: 220,
                  background: "rgba(255,255,255,.04)",
                  borderColor: "rgba(255,255,255,.10)",
                  scrollSnapAlign: "start",
                }}
              >
                {/* zoom suave ao tocar */}
                <div className="relative overflow-hidden">
                  <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    className="w-full h-[150px] object-contain bg-black/10 transition-transform duration-300 ease-out"
                    style={{ transform: "scale(1)" }}
                  />
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition" />
                </div>

                {/* badge contador */}
                <div
                  className="absolute top-2 right-2 text-[11px] px-2 py-1 rounded-full"
                  style={{
                    background: "rgba(0,0,0,.35)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,.15)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {idx + 1}/{list.length}
                </div>
              </button>
            ))}
          </div>

          {/* Indicador simples (bolinhas) */}
          <div className="mt-1 flex justify-center gap-1.5">
            {list.map((_, idx) => (
              <span
                key={idx}
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: idx === 0 ? "rgba(255,255,255,.45)" : "rgba(255,255,255,.18)",
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        /* ======= Imagem única ======= */
        <button
          type="button"
          onClick={() => openAt(0)}
          className="mt-2 rounded-xl overflow-hidden border block w-full active:scale-[0.995] transition"
          style={{
            borderColor: "rgba(255,255,255,.10)",
            background: "rgba(255,255,255,.04)",
          }}
        >
          <img
            src={list[0]}
            alt={alt}
            loading="lazy"
            className="w-full h-auto object-contain bg-black/10 transition-transform duration-300 ease-out"
          />
        </button>
      )}

      {/* ======= Fullscreen Modal ======= */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,.75)" }}
          onMouseDown={(e) => {
            // fechar clicando fora
            if (e.target === e.currentTarget) close();
          }}
        >
          {/* topo */}
          <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-4">
            <div
              className="text-xs px-3 py-2 rounded-full"
              style={{
                background: "rgba(255,255,255,.10)",
                color: "white",
                border: "1px solid rgba(255,255,255,.12)",
                backdropFilter: "blur(10px)",
              }}
            >
              {active + 1} / {list.length}
            </div>

            <button
              type="button"
              onClick={close}
              className="h-10 w-10 rounded-full grid place-items-center active:scale-95 transition"
              style={{
                background: "rgba(255,255,255,.10)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "white",
                backdropFilter: "blur(10px)",
              }}
              aria-label="Fechar"
            >
              <X size={18} />
            </button>
          </div>

          {/* imagem central */}
          <div className="relative w-full max-w-3xl px-4">
            <div
              className="rounded-2xl overflow-hidden border"
              style={{
                borderColor: "rgba(255,255,255,.12)",
                background: "rgba(0,0,0,.30)",
              }}
            >
              <img
                src={list[active]}
                alt={alt}
                className="w-full max-h-[82vh] object-contain"
                draggable={false}
              />
            </div>

            {/* navegação */}
            {canNav && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full grid place-items-center active:scale-95 transition"
                  style={{
                    background: "rgba(255,255,255,.10)",
                    border: "1px solid rgba(255,255,255,.12)",
                    color: "white",
                    backdropFilter: "blur(10px)",
                  }}
                  aria-label="Anterior"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  type="button"
                  onClick={next}
                  className="absolute right-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full grid place-items-center active:scale-95 transition"
                  style={{
                    background: "rgba(255,255,255,.10)",
                    border: "1px solid rgba(255,255,255,.12)",
                    color: "white",
                    backdropFilter: "blur(10px)",
                  }}
                  aria-label="Próxima"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
