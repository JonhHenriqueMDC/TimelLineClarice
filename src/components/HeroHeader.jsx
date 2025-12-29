export function HeroHeader({
  brand = "TimeLine",
  subtitle = "Coloca uma musiquina que fica melhor.",


  bigText = "Momentos",
  bigTop = "Colecionando",

  videoSrc = "/TimelLineClarice/img/header.gif",

  // 👇 coloque o link NORMAL da playlist aqui
  spotifyUrl = "https://open.spotify.com/playlist/3nocSv5bvoGQ479iTvzPHJ?si=d6f1d0ba5b8e4ef5",

  marqueeText =
    "AQUI VAI FICAR O TEXTO QUE VOU MANDAR PRA ELA ENTAO IGNORA ESSE TEXTO POR ENQUANDO",
  marqueeSpeed = 1,
}) {
  const base = import.meta.env.BASE_URL || "/";

  const gifSrc = videoSrc.startsWith(base)
    ? videoSrc
    : videoSrc.startsWith("/")
    ? `${base}${videoSrc.slice(1)}`
    : `${base}${videoSrc}`;

  const spotifyEmbed = spotifyUrl
    ? spotifyUrl.replace("open.spotify.com/", "open.spotify.com/embed/")
    : "";

  return (
    <header
      className="relative w-full overflow-hidden"
      style={{
        backgroundImage: `url(${gifSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* película */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,.65)_100%)]" />
      </div>

      {/* conteúdo */}
      <div className="relative z-10 mx-auto w-full max-w-md px-5 pt-10 pb-6">
        <h1 className="text-center font-extrabold tracking-tight leading-none">
          <span className="brand-anim text-4xl sm:text-5xl">{brand}</span>
        </h1>

        <p className="mt-3 text-center text-sm sm:text-base text-white/70">
          {subtitle}
        </p>

        {/* ✅ SPOTIFY (NO LUGAR DA IMAGEM CENTRAL) */}
        <div className="mt-7 flex justify-center">
          <div
            className="relative w-full max-w-[420px] overflow-hidden rounded-[26px] border border-white/10 shadow-2xl"
            style={{
              background: "rgba(10,10,12,.55)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 20px 70px rgba(0,0,0,.55)",
            }}
          >
            <span className="pointer-events-none absolute inset-0 glare-sweep opacity-70" />

            <iframe
              title="Spotify Playlist"
              src={`${spotifyEmbed}?utm_source=generator&theme=0`}
              width="100%"
              height="392"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ display: "block" }}
            />
          </div>
        </div>

        {/* texto chamativo */}
        <div className="mt-7 text-center">

          <h2 className="mt-2 leading-none font-extrabold text-white">
            <span className="block text-3xl sm:text-4xl">{bigTop}</span>
            <span
              className="block text-5xl sm:text-6xl"
              style={{ textShadow: "0 0 28px rgba(var(--brand), .35)" }}
            >
              {bigText}
            </span>
          </h2>
        </div>
      </div>

      <div className="relative z-10">
        <MarqueeStrip text={marqueeText} speed={marqueeSpeed} />
      </div>
    </header>
  );
}

function MarqueeStrip({ text, speed = 16 }) {
  return (
    <div className="relative w-full overflow-hidden marquee-bg">
      <div
        className="relative w-full overflow-hidden border-t border-white/10"
        style={{
          background: "rgba(0,0,0,.35)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div className="marquee py-2" style={{ ["--marquee-dur"]: `${speed}s` }}>
          <div className="marquee__track">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="mx-6 text-xs font-semibold uppercase tracking-[0.22em] text-white/90"
              >
                {text}
              </span>
            ))}
          </div>
        </div>

        <div className="h-[3px] w-full marquee-line" />
      </div>
    </div>
  );
}
