import { useContext } from "react";
import { AudioContext } from "../context/AudioContext.jsx";
import { Play, Pause } from "lucide-react";

export function MusicToggle() {
  const { playing, toggle } = useContext(AudioContext);

  return (
    <button
      onClick={toggle}
      className="h-9 w-9 rounded-full grid place-items-center transition active:scale-95"
      style={{
        background: "rgba(255,255,255,.08)",
        border: "1px solid rgba(255,255,255,.12)",
        backdropFilter: "blur(8px)",
        color: "white",
      }}
      aria-label="Música"
      type="button"
    >
      {playing ? <Pause size={16} strokeWidth={2.2} /> : <Play size={16} strokeWidth={2.2} />}
    </button>
  );
}
