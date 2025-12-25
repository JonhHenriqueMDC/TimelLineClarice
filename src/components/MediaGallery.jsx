import { useEffect, useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

export function MediaGallery({ media = [], alt = "" }) {
  const list = useMemo(
    () => (Array.isArray(media) ? media.filter(Boolean) : []),
    [media]
  );

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

  // trava scroll
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = old);
  }, [open]);

  if (list.length === 0) return null;

  return (
    <>
      {/* ===== GALERIA INLINE ===== */}
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
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={alt}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            ) : (
              <div className="relative">
                <video
                  src={item.src}
                  className="w-full h-auto object-contain"
                  muted
                />
                <div className="absolute inset-0 grid place-items-center">
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
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 h-10 w-10 rounded-full grid place-items-center bg-white/10"
          >
            <X />
          </button>

          {hasNav && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 h-10 w-10 rounded-full bg-white/10"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={next}
                className="absolute right-4 h-10 w-10 rounded-full bg-white/10"
              >
                <ChevronRight />
              </button>
            </>
          )}

          <div className="max-w-4xl w-full px-4">
            {list[active].type === "image" ? (
              <img
                src={list[active].src}
                alt={alt}
                className="w-full max-h-[85vh] object-contain"
              />
            ) : (
              <video
                src={list[active].src}
                controls
                autoPlay
                className="w-full max-h-[85vh] object-contain"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
