export function FabButton({ onClick, label = "+" }) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-6 right-6 h-14 w-14 rounded-full font-bold text-xl active:scale-95 transition"
      style={{
        background: `rgb(var(--brand))`,
        color: "white",
        boxShadow: "var(--shadow)",
      }}
      type="button"
      aria-label="Ação"
    >
      {label}
    </button>
  );
}
