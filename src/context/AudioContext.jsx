import { createContext, useEffect, useMemo, useRef, useState } from "react";

// ✅ Esse é o export que o MusicToggle precisa
export const AudioContext = createContext({
  playing: false,
  toggle: () => {},
  setTrack: () => {},
  track: null,
});

export function AudioProvider({ children }) {
  const audioRef = useRef(null);

  const [track, setTrack] = useState("/music/theme.mp3"); // 👈 troque pelo seu arquivo
  const [playing, setPlaying] = useState(false);

  // cria o Audio uma vez
  useEffect(() => {
    audioRef.current = new Audio(track);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.6;

    return () => {
      try {
        audioRef.current?.pause();
      } catch {}
      audioRef.current = null;
    };
  }, []);

  // se trocar a track, troca a src
  useEffect(() => {
    if (!audioRef.current) return;

    const wasPlaying = playing;

    audioRef.current.pause();
    audioRef.current.src = track;
    audioRef.current.load();

    if (wasPlaying) {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  const toggle = async () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch {
      // navegador bloqueou autoplay: só toca se tiver interação
      setPlaying(false);
    }
  };

  const value = useMemo(
    () => ({
      playing,
      toggle,
      track,
      setTrack,
    }),
    [playing, track]
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}
