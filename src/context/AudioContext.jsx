import { createContext, useEffect, useMemo, useRef, useState } from "react";

export const AudioContext = createContext({
  playing: false,
  toggle: async () => {},
  play: async () => {},
  pause: () => {},
  setTrack: () => {},
  track: "",
});

export function AudioProvider({ children }) {
  const audioRef = useRef(null);

  // ✅ resolve GitHub Pages /TimelLineClarice/
  const defaultTrack = `${import.meta.env.BASE_URL}music/theme.mp3`;

  const [track, setTrack] = useState(defaultTrack);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = new Audio(track);
    a.loop = true;
    a.volume = 0.6;

    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);

    a.addEventListener("pause", onPause);
    a.addEventListener("play", onPlay);

    audioRef.current = a;

    return () => {
      try {
        a.pause();
      } catch {}
      a.removeEventListener("pause", onPause);
      a.removeEventListener("play", onPlay);
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const wasPlaying = playing;

    a.pause();
    a.src = track;
    a.load();

    if (wasPlaying) {
      a.play().catch(() => setPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  const play = async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      await a.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const pause = () => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    setPlaying(false);
  };

  const toggle = async () => {
    if (playing) pause();
    else await play();
  };

  const value = useMemo(
    () => ({ playing, toggle, play, pause, track, setTrack }),
    [playing, track]
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}
