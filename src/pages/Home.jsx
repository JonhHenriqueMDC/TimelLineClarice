import { useNavigate } from "react-router-dom";
import { MobileShell } from "../components/MobileShell";
import { TopBar } from "../components/TopBar";
import { MusicToggle } from "../components/MusicToggle";

export default function Home() {
  const nav = useNavigate();

  return (
    <MobileShell backgroundImage="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=70">
      <TopBar
        left={
          <div
            className="px-3 py-2 rounded-full border text-white text-sm font-semibold"
            style={{
              background: "rgba(255,255,255,.10)",
              borderColor: "rgba(255,255,255,.12)",
              backdropFilter: "blur(10px)",
            }}
          >
            Nossa linha do tempo
          </div>
        }
        title=""
        right={
          <>
            <MusicToggle />
            <button
              onClick={() => nav("/timeline")}
              className="h-9 px-4 rounded-full text-sm font-semibold active:scale-95 transition"
              style={{ background: `rgb(var(--brand))`, color: "white" }}
              type="button"
            >
              Começar
            </button>
          </>
        }
      />

      <div className="px-7 pt-52 text-center">
        <h1 className="text-white font-extrabold text-[34px] leading-[1.05] drop-shadow">
          ClaCla
        </h1>

        <p className="text-white/80 mt-4 text-[14px] leading-relaxed">
          ( video )
        </p>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => nav("/timeline")}
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl font-semibold active:scale-95 transition"
            style={{ background: `rgb(var(--brand))`, color: "white" }}
            type="button"
          >
            Ver a jornada <span className="text-lg">↓</span>
          </button>
        </div>
      </div>
    </MobileShell>
  );
}
