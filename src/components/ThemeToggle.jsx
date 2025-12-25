import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { cycleTheme } = useTheme();

  return (
    <button
      onClick={cycleTheme}
      className="h-9 w-9 grid place-items-center rounded-full border"
      style={{
        background: "rgba(255,255,255,.10)",
        borderColor: "rgba(255,255,255,.12)",
      }}
      title="Tema"
      type="button"
    >
      ☀️
    </button>
  );
}
