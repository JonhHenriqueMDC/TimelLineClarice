import { useEffect, useRef } from "react";

export function GlassGlare({ className = "", children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    function onMove(e) {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--gx", `${(x * 100).toFixed(2)}%`);
      el.style.setProperty("--gy", `${(y * 100).toFixed(2)}%`);
    }

    if (!prefersReduced) window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} className={`glass-glare ${className}`}>
      {children}
    </div>
  );
}
