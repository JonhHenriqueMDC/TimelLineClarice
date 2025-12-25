export function YearSeparator({ year }) {
  return (
    <div className="year-separator">
      <div className="year-row">
        <span /> {/* espaço do eixo */}
        <span className="year-line" />
        <div className="glass-glare year-chip">{year}</div>
        <span className="year-line" />
      </div>
    </div>
  );
}
