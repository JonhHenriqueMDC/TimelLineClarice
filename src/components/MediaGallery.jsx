import { useEffect, useMemo, useRef, useState } from "react";

export function MediaGallery({ media = [], alt = "" }) {
  const asset = (p) => `${import.meta.env.BASE_URL}${p}`;
  const items = useMemo(() => (media || []).filter(Boolean), [media]);
  const scrollerRef = useRef(null);
  const [index, setIndex] = useState(0);

  const isCarousel = items.length > 1;

  useEffect(() => {
    if (!isCarousel) return;
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const children = Array.from(el.children);
      if (!children.length) return;

      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;

      children.forEach((child, i) => {
        const childCenter = child.offsetLeft + child.clientWidth / 2;
        const d = Math.abs(childCenter - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });

      setIndex(best);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [isCarousel, items.length]);

  const scrollTo = (i) => {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children[i];
    if (!child) return;
    child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const prev = () => scrollTo(Math.max(0, index - 1));
  const next = () => scrollTo(Math.min(items.length - 1, index + 1));

  const Card = ({ m }) => {
    const src = asset(m.src);

    // Altura fixa para não cortar: a mídia se encaixa inteira dentro.
    const wrap =
      "w-full overflow-hidden rounded-xl bg-black " +
      "h-[280px] sm:h-[360px] lg:h-[420px]";

    const contain = "w-full h-full object-contain block";

    if (m.type === "image") {
      return (
        <div className={wrap}>
          <img src={src} alt={alt} loading="lazy" className={contain} draggable={false} />
        </div>
      );
    }

    if (m.type === "video") {
      return (
        <div className={wrap}>
          <video
            src={src}
            className={contain}
            playsInline
            muted
            loop
            autoPlay
            preload="auto"
            controls
          />
        </div>
      );
    }

    if (m.type === "audio") {
      return (
        <div className="w-full rounded-xl bg-white/5 p-3">
          <audio src={src} controls preload="metadata" className="w-full" />
        </div>
      );
    }

    return null;
  };

  if (!items.length) return null;

  // 1 item: sem carrossel, só mostra inteiro
  if (!isCarousel) {
    return (
      <div className="mt-3">
        <Card m={items[0]} />
      </div>
    );
  }

  return (
    <div className="mt-3">
      {/* SETAS (desktop) */}
      <div className="hidden sm:flex items-center justify-between mb-2">
        <button
          onClick={prev}
          className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20"
          type="button"
        >
          ◀
        </button>

        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-2 w-2 rounded-full ${i === index ? "bg-white" : "bg-white/30"}`}
              type="button"
              aria-label={`Ir para mídia ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20"
          type="button"
        >
          ▶
        </button>
      </div>

      {/* CARROSSEL */}
      <div
        ref={scrollerRef}
        className="
          flex gap-3 overflow-x-auto pb-2
          snap-x snap-mandatory
          [scrollbar-width:none] [-ms-overflow-style:none]
        "
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>

        {items.map((m, i) => (
          <div
            key={i}
            className="hide-scrollbar snap-center shrink-0 w-[90%] sm:w-[65%] lg:w-[55%]"
          >
            <Card m={m} />
          </div>
        ))}
      </div>
    </div>
  );
}
