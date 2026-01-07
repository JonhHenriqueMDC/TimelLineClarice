import { useNavigate } from "react-router-dom";
import { TopBar } from "../components/TopBar";
import { MusicToggle } from "../components/MusicToggle";
import { FabButton } from "../components/FabButton";
import { timeline } from "../data/timelineData";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { MediaGallery } from "../components/MediaGallery";
import { HeroHeader } from "../components/HeroHeader";

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
  Beef,
  Shrimp,
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
  beef: Beef,
  camarao: Shrimp,

};

function YearHeader({ year }) {
  return (
    <div className="relative flex items-center justify-center py-9">
      <div aria-hidden="true" className="absolute inset-0 flex items-center">
        <div
          className="w-full"
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.10), rgba(255,255,255,0))",
          }}
        />
      </div>

      <div
        className="relative px-7 py-2.5 rounded-full border shadow-sm overflow-hidden"
        style={{
          background: "rgba(255,255,255,.04)",
          borderColor: "rgba(238,43,108,.22)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <span className="pointer-events-none absolute inset-0 glare-sweep" />
        <h1
          className="relative text-3xl font-extrabold tracking-tight"
          style={{ color: "rgb(var(--brand))" }}
        >
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
      className="absolute top-1.5 z-10 grid place-items-center rounded-full"
      style={{
        left: AXIS_LEFT,
        transform: "translateX(-50%)",
        width: 52,
        height: 52,
        background: "rgba(255,255,255,.04)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(238,43,108,.50)",
        boxShadow: "0 0 26px rgba(238,43,108,.40)",
      }}
    >
      <Icon size={24} strokeWidth={2.3} style={{ color: "rgb(var(--brand))" }} />
    </div>
  );
}

function TimelineItem({ item }) {
  const ref = useRevealOnScroll({ threshold: 0.12 });

  return (
    <div ref={ref} className="reveal relative pl-[92px] group">
      <TimelineDot icon={item.icon} />

      <div className="flex flex-col gap-3">
        <span
          className="text-sm font-bold uppercase tracking-wider"
          style={{ color: "rgb(var(--brand))" }}
        >
          {item.dateLabel}
        </span>

        <h3 className="text-white text-xl font-bold leading-tight">
          {item.title}
        </h3>

        {item.desc && (
          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,.65)" }}
          >
            {item.desc}
          </p>
        )}

        {(item.media?.length ?? 0) > 0 && (
          <div
            className="relative mt-1 rounded-2xl overflow-hidden border shadow-xl"
            style={{
              background: "rgba(255,255,255,.04)",
              borderColor: "rgba(255,255,255,.10)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow:
                "0 18px 55px rgba(0,0,0,.35), 0 0 0 1px rgba(255,255,255,.03) inset",
            }}
          >
            <span className="pointer-events-none absolute inset-0 glare-sweep" />
            <div className="p-3">
              <div className="rounded-xl overflow-hidden">
                <MediaGallery media={item.media || []} alt={item.title} />
              </div>
            </div>
          </div>
        )}

        {item.location && (
          <div className="text-xs" style={{ color: "rgba(255,255,255,.72)" }}>
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
    <div className="min-h-screen w-full" style={{ background: "rgb(var(--bg))" }}>
      <HeroHeader />

      <main className="w-full px-5 py-6 relative">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col">
            {timeline.map((block) => (
              <section key={block.year}>
                <YearHeader year={block.year} />

                <div className="relative">
                  <div
                    className="absolute top-0 bottom-0 w-[2px] rounded-full"
                    style={{
                      left: AXIS_LEFT,
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.10), rgba(255,255,255,.07))",
                    }}
                  />

                  <div className="flex flex-col gap-11">
                    {block.items.map((item, idx) => (
                      <TimelineItem key={`${block.year}-${idx}`} item={item} />
                    ))}
                  </div>

                  <div className="relative flex items-center justify-center py-7 mt-2">
                    <div
                      className="size-2 rounded-full"
                      style={{ background: "rgba(255,255,255,.20)" }}
                    />
                  </div>
                </div>
              </section>
            ))}
          </div>

          <FabButton onClick={() => alert("Depois: abrir modal para adicionar evento")} />
        </div>
      </main>
    </div>
  );
}
