import React from "react";

export function MediaGallery({ media = [], alt = "" }) {
  const asset = (p) => `${import.meta.env.BASE_URL}${p}`;
  if (!media?.length) return null;

  const isCarousel = media.length > 1;

  const MediaCard = ({ m, index }) => {
    const src = asset(m.src);

    const baseClass =
      "w-full h-full object-cover rounded-xl block bg-black/20";

    if (m.type === "image") {
      return (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={baseClass}
          draggable={false}
        />
      );
    }

    if (m.type === "video") {
      // IMPORTANTE: poster evita “transparente”/preview preto no mobile
      // Se você não tiver poster, coloca um genérico ou usa a 1ª imagem do item como poster.
      const poster = m.poster ? asset(m.poster) : undefined;

      return (
        <video
          src={src}
          poster={poster}
          className={baseClass}
          controls
          playsInline
          preload="metadata"
          controlsList="nodownload"
        />
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

  // 1 mídia => normal
  if (!isCarousel) {
    return (
      <div className="mt-3 overflow-hidden rounded-xl">
        <div className="aspect-video w-full">
          <MediaCard m={media[0]} index={0} />
        </div>
      </div>
    );
  }

  // 2+ mídias => carrossel horizontal
  return (
    <div className="mt-3">
      <div
        className="
          flex gap-3 overflow-x-auto pb-2
          snap-x snap-mandatory
          [-ms-overflow-style:none] [scrollbar-width:none]
        "
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* esconder scrollbar no Chrome */}
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>

        {media.map((m, i) => (
          <div
            key={i}
            className="
              hide-scrollbar
              snap-center shrink-0
              w-[85%] sm:w-[60%]
            "
          >
            <div className="aspect-video w-full overflow-hidden rounded-xl">
              <MediaCard m={m} index={i} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
