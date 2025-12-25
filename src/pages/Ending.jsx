import { useNavigate } from "react-router-dom";
import { MobileShell } from "../components/MobileShell";
import { TopBar } from "../components/TopBar";
import { MusicToggle } from "../components/MusicToggle";

export default function Ending() {
  const nav = useNavigate();

  return (
    <MobileShell>
      <TopBar
        left={
          <button
            onClick={() => nav("/timeline")}
            className="h-9 w-9 rounded-full border grid place-items-center"
            style={{
              background: "rgba(0,0,0,.35)",
              borderColor: "rgba(255,255,255,.10)",
              color: "white",
              backdropFilter: "blur(10px)",
            }}
            type="button"
          >
            ←
          </button>
        }
        title="Nossa Jornada"
        right={<MusicToggle />}
      />

      <div className="px-7 pt-40 text-center">
        <div className="text-5xl mb-4">⏳</div>
        <h2 className="font-extrabold text-3xl">Ainda tem coisa pra acontecer.</h2>
        <p className="mt-3 text-sm" style={{ color: `rgb(var(--muted))` }}> 
        </p>

        <div className="mt-10">
          <button
            onClick={() => nav("/timeline")}
            className="h-12 px-6 rounded-2xl font-semibold active:scale-95 transition"
            style={{ background: `rgb(var(--brand))`, color: "white" }}
            type="button"
          >
            Voltar ao topo ↑
          </button>
        </div>
      </div>
    </MobileShell>
  );
}
