import { useEffect, useMemo, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

export function MediaGallery({ media = [], alt = "" }) {
  const list = useMemo(
    () => (Array.isArray(media) ? media.filter(Boolean) : []),
    [media]
  );

  // resolve caminho no GitHub Pages / Discloud
  const asset = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}`;

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const hasNav = list.length > 1;

  const openAt = (i) => {
    setActive(i);
    setOpen(true);
  };

  const close = () => setOpen(false);
  const prev = () => setActive((v) => (v - 1 + list.length) % list.length);
  const next = () => setActive((v) => (v + 1) % list.length);

  // ✅ trava o background sem matar gestos no mobile (padrão modal)
  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY || window.pageYOffset || 0;
    const body = document.body;

    const oldPosition = body.style.position;
    const oldTop = body.style.top;
    const oldLeft = body.style.left;
    const oldRight = body.style.right;
    const oldWidth = body.style.width;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      body.style.position = oldPosition;
      body.style.top = oldTop;
      body.style.left = oldLeft;
      body.style.right = oldRight;
      body.style.width = oldWidth;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // ✅ swipe down para fechar (mobile)
  const startYRef = useRef(null);
  const lastYRef = useRef(null);

  const onTouchStart = (e) => {
    const y = e.touches?.[0]?.clientY;
    startYRef.current = y ?? null;
    lastYRef.current = y ?? null;
  };

  const onTouchMove = (e) => {
    const y = e.touches?.[0]?.clientY;
    if (typeof y === "number") lastYRef.current = y;
  };

  const onTouchEnd = () => {
    const startY = startYRef.current;
    const lastY = lastYRef.current;
    startYRef.current = null;
    lastYRef.current = null;

    if (typeof startY !== "number" || typeof lastY !== "number") return;

    const delta = lastY - startY;
    // arrastou pra baixo o suficiente => fecha
    if (delta > 80) close();
  };

  // ✅ ESC fecha (desktop)
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (list.length === 0) return null;

  return (
    <>
      {/* ===== GALERIA INLINE (CARROSSEL) ===== */}
      <div className="mt-2 flex gap-3 overflow-x-auto pb-2">
        {list.map((item, idx) => (
          <button
            key={idx}
            onClick={() => openAt(idx)}
            className="relative rounded-xl border overflow-hidden shrink-0"
            style={{
              width: 240,
              background: "rgba(255,255,255,.04)",
              borderColor: "rgba(255,255,255,.10)",
            }}
            type="button"
          >
            {item.type === "image" ? (
              <img
                src={asset(item.src)}
                alt={alt}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            ) : (
              <div className="relative">
                {/* preview do vídeo */}
                <video
                  src={asset(item.src)}
                  className="w-full h-auto object-contain"
                  playsInline
                  muted
                  loop
                  autoPlay
                  preload="metadata"
                  disablePictureInPicture
                />
                <div className="absolute inset-0 grid place-items-center pointer-events-none">
                  <Play size={32} />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* ===== FULLSCREEN ===== */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center"
          onClick={(e) => e.target === e.currentTarget && close()}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            // ✅ evita “prender” gesto e impede bounce estranho
            touchAction: "pan-y",
            overscrollBehavior: "contain",
          }}
        >
          {/* ✅ fechar (sempre acima do vídeo) */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full grid place-items-center bg-white/10"
            type="button"
          >
            <X />
          </button>

          {/* ✅ navegação (sempre acima do vídeo) */}
          {hasNav && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 z-50 h-10 w-10 rounded-full bg-white/10 grid place-items-center"
                type="button"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={next}
                className="absolute right-4 z-50 h-10 w-10 rounded-full bg-white/10 grid place-items-center"
                type="button"
              >
                <ChevronRight />
              </button>
            </>
          )}

          {/* mídia ativa */}
          <div className="max-w-4xl w-full px-4">
            {list[active].type === "image" ? (
              <img
                src={asset(list[active].src)}
                alt={alt}
                className="w-full max-h-[85vh] object-contain"
              />
            ) : (
              <video
                src={asset(list[active].src)}
                controls
                autoPlay
                playsInline
                preload="auto"
                // ✅ garante que não “zooma” e respeita a área visível no mobile
                className="w-full max-h-[85vh] object-contain"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
