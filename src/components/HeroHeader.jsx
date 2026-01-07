import { useEffect, useRef, useState } from "react";

export function HeroHeader({
  brand = "TimeLine",
  subtitle = "Coloca uma musiquinha que fica melhor. 😊",

  bigText = "Momentos",
  bigTop = "Colecionando",

  videoSrc = "/TimelLineClarice/img/header.gif",

  spotifyUrl = "https://open.spotify.com/playlist/2ITVGgUWwuij5jKXX2g8Lk",

  marqueeText =
    "CLARICE, VOCÊ É UMA PESSOA EXTREMAMENTE INCRÍVEL, QUE REALMENTE FAZ DIFERENÇA POR ONDE PASSA. SEM SOMBRA DE DÚVIDAS, A APROXIMAÇÃO QUE EU TIVE COM VOCÊ NESSE FINAL DE ANO FOI, DISPARADO, UMA DAS MELHORES COISAS QUE ACONTECERAM COMIGO NESTE ANO (SE NÃO A MELHOR). E QUANDO EU FALO QUE VOCÊ É UMA PESSOA INCRÍVEL, NÃO É APENAS PELAS INÚMERAS QUALIDADES QUE VOCÊ TEM, MAS PRINCIPALMENTE PORQUE VOCÊ DESPERTA O MELHOR NAS PESSOAS. ESTAR PERTO DE VOCÊ INCENTIVA E MOTIVA A TAMBÉM TENTAR SER UMA PESSOA MELHOR! E É PROVA DISSO QUE, MESMO COM ESSE POUCO TEMPO QUE PASSAMOS JUNTOS, VOCÊ JÁ CONSEGUIU DESPERTAR O MELHOR DE MIM, E ISSO ME MUDOU MUITO PRA MELHOR. VOCÊ ME FEZ ME ESFORÇAR MAIS, QUERER SAIR MAIS DE CASA, PARAR DE PROCRASTINAR NAS MINHAS RESPONSABILIDADES E, COM ISSO, PASSAR A LEVÁ-LAS MAIS A SÉRIO. NÃO APENAS ISSO, COMO MINHA SAÚDE TAMBÉM MELHOROU: COMECEI A FOCAR MAIS NA ACADEMIA, MELHORAR A ALIMENTAÇÃO, ENTRE OUTRAS COISAS. COM ISSO, VOCÊ SEMPRE PUXA MINHA ORELHA QUANDO NECESSÁRIO E TAMBÉM SEMPRE ME OFERECE APOIO (PODE NÃO QUERER DEMONSTRAR, MAS VOCÊ APOIA SIM KKKKK). ENFIM, SOU MUITO GRATO POR TER VOCÊ POR PERTO, POR TER TE CONHECIDO E POR TER A OPORTUNIDADE DE ME APROXIMAR DE UMA PESSOA INCRÍVEL COMO VOCÊ.",
  marqueeSpeed = 30, // ✅ 15–25 ideal no celular (MENOR = MAIS LENTO)
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

        {/* Spotify */}
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
            />
          </div>
        </div>

        {/* texto grande */}
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

      {/* marquee corrigido */}
      <div className="relative z-10">
        <MarqueeStrip text={marqueeText} speed={marqueeSpeed} />
      </div>
    </header>
  );
}

/* ========================================================= */
/* ================= MARQUEE (FIX DEFINITIVO) =============== */
/* ========================================================= */

function MarqueeStrip({ text, speed = 30 }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const [dur, setDur] = useState(30);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const calc = () => {
      const wrapW = wrap.getBoundingClientRect().width || 1;
      const trackW = track.scrollWidth || 1;

      // distância = metade do track (porque duplicamos 2x)
      const distance = Math.max(trackW / 2, wrapW);

      // ✅ aqui speed é “quanto lento/rápido”: menor = mais lento
      // converte pra px/s com limite seguro
      const pxPerSec = Math.min(80, Math.max(10, Number(speed) || 18));

      // duração = distância / pxPorSegundo
      const seconds = distance / pxPerSec;

      // ✅ clamp pra nunca ficar ilegível nem parado
      setDur(Math.min(180, Math.max(40, seconds))); // mínimo 40s (texto grande fica legível)
    };

    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(wrap);
    ro.observe(track);
    return () => ro.disconnect();
  }, [text, speed]);

  return (
    <div ref={wrapRef} className="relative w-full overflow-hidden marquee-bg">
      <div
        className="relative w-full overflow-hidden border-t border-white/10"
        style={{
          background: "rgba(0,0,0,.35)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div className="marquee py-2">
          {/* ✅ FORÇA a duração aqui (inline) — não depende do seu CSS */}
          <div
            ref={trackRef}
            className="marquee__track"
            style={{
              animationDuration: `${dur}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }}
          >
            <span className="mx-6 text-xs font-semibold uppercase tracking-[0.22em] text-white/90">
              {text}
            </span>
            <span className="mx-6 text-xs font-semibold uppercase tracking-[0.22em] text-white/90">
              {text}
            </span>
          </div>
        </div>

        <div className="h-[3px] w-full marquee-line" />
      </div>
    </div>
  );
}
