import { useNavigate } from "react-router-dom";
import { MobileShell } from "../components/MobileShell";
import { TopBar } from "../components/TopBar";
import { MusicToggle } from "../components/MusicToggle";
import { FabButton } from "../components/FabButton";
import { timeline } from "../data/timelineData";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { ImageGallery } from "../components/ImageGallery";
import { MediaGallery } from "../components/MediaGallery";

import {
  Plane,
  Heart,
  Sparkles,
  Target,
  Rocket,
  Camera,
  Home,
  Music,
  MapPin,
  Volleyball,
  Balloon,
  Hamburger,
  ChefHat,
  PartyPopper,
  Popcorn,
  Cake,
  Users,
} from "lucide-react";

const AXIS_LEFT = "39px";

const ICONS = {
  plane: Plane,
  heart: Heart,
  sparkles: Sparkles,
  target: Target,
  rocket: Rocket,
  camera: Camera,
  home: Home,
  music: Music,
  pin: MapPin,
  fut: Volleyball,
  aniv: Balloon,
  hamburger: Hamburger,
  cozinha: ChefHat,
  comemorar: PartyPopper,
  popcorn: Popcorn,
  cake: Cake,
  grupo: Users,
};

function YearHeader({ year }) {
  return (
    <div className="relative flex items-center justify-center py-8">
      <div aria-hidden="true" className="absolute inset-0 flex items-center">
        <div className="w-full border-t" style={{ borderColor: "rgba(255,255,255,.10)" }} />
      </div>

      <div
        className="relative px-6 py-2 rounded-full border shadow-sm glare"
        style={{
          background: "rgb(var(--bg))",
          borderColor: "rgba(238,43,108,.20)",
        }}
      >
        <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: "rgb(var(--brand))" }}>
          {year}
        </h1>
      </div>
    </div>
  );
}

function TimelineDot({ icon = "sparkles" }) {
  const Icon = ICONS[icon] || Sparkles;

  return (
    <div
      className="absolute top-2 rounded-full z-10 grid place-items-center"
      style={{
        left: AXIS_LEFT,
        transform: "translateX(-50%)",
        width: 22,
        height: 22,
        background: "rgb(var(--bg))",
        border: "2px solid rgb(var(--brand))",
        boxShadow: "0 0 0 4px rgb(var(--bg))",
      }}
    >
      <Icon size={13} strokeWidth={2.2} style={{ color: "rgb(var(--brand))" }} />
    </div>
  );
}

function TimelineItem({ item }) {
  const ref = useRevealOnScroll({ threshold: 0.12 });

  return (
    <div ref={ref} className="reveal relative pl-[72px] group">
      <TimelineDot icon={item.icon} />

      <div className="flex flex-col gap-3">
        <span className="text-sm font-bold uppercase tracking-wider" style={{ color: "rgb(var(--brand))" }}>
          {item.dateLabel}
        </span>

        <h3 className="text-white text-xl font-bold leading-tight">{item.title}</h3>
        {item.desc && (
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,.60)" }}>
            {item.desc}
          </p>
        )}

        <MediaGallery media={item.media || []} alt={item.title} />

        {item.location && (
          <div className="text-xs" style={{ color: "rgba(255,255,255,.70)" }}>
            📍 {item.location}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Timeline() {
  const nav = useNavigate();

  return (
    <MobileShell>
      <TopBar
        left={
          <button
            onClick={() => nav("/")}
            className="flex items-center justify-center p-2 rounded-full"
            style={{
              color: "white",
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.10)",
              backdropFilter: "blur(10px)",
            }}
            type="button"
            aria-label="Voltar"
          >
            ←
          </button>
        }
        title="Linha do Tempo"
        right={
          <>
            <MusicToggle />
            <button
              onClick={() => nav("/ending")}
              className="h-9 px-4 rounded-full text-sm font-semibold active:scale-95 transition"
              style={{ background: "rgb(var(--brand))", color: "white" }}
              type="button"
            >
              Final
            </button>
          </>
        }
      />

      <main className="flex-1 w-full max-w-md mx-auto px-5 py-6 relative" style={{ background: "rgb(var(--bg))" }}>
        <div className="flex flex-col">
          {timeline.map((block) => (
            <section key={block.year}>
              <YearHeader year={block.year} />

              <div className="relative">
                <div
                  className="absolute top-0 bottom-0 w-[2px] rounded-full"
                  style={{ left: AXIS_LEFT, background: "rgba(255,255,255,.10)" }}
                />

                <div className="flex flex-col gap-10">
                  {block.items.map((item, idx) => (
                    <TimelineItem key={`${block.year}-${idx}`} item={item} />
                  ))}
                </div>

                <div className="relative flex items-center justify-center py-6 mt-2">
                  <div className="size-2 rounded-full" style={{ background: "rgba(255,255,255,.20)" }} />
                </div>
              </div>
            </section>
          ))}
        </div>

        <FabButton onClick={() => alert("Depois: abrir modal para adicionar evento")} />
      </main>
    </MobileShell>
  );
}
