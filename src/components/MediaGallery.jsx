export function MediaGallery({ media = [], alt = "" }) {
  const asset = (p) => `${import.meta.env.BASE_URL}${p}`;

  return (
    <div className="mt-2 flex flex-col gap-3">
      {media.map((m, i) => {
        const src = asset(m.src);

        if (m.type === "image") {
          return (
            <img
              key={i}
              src={src}
              alt={alt}
              className="w-full rounded-xl"
              loading="lazy"
            />
          );
        }

        if (m.type === "video") {
          return (
            <video
              key={i}
              src={src}
              controls
              className="w-full rounded-xl"
              playsInline
            />
          );
        }

        if (m.type === "audio") {
          return <audio key={i} src={src} controls className="w-full" />;
        }

        return null;
      })}
    </div>
  );
}
