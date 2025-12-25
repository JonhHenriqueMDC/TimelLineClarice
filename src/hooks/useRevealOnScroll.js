import { useEffect, useRef } from "react";

export function useRevealOnScroll(options = { threshold: 0.15 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.classList.add("is-visible");
    }, options);

    io.observe(el);
    return () => io.disconnect();
  }, [options]);

  return ref;
}
