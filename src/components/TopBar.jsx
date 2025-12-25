export function TopBar({ left, title, right }) {
  return (
    <div className="flex items-center justify-between px-4 pt-4">
      <div className="min-w-[80px]">{left}</div>
      <div className="text-sm font-semibold opacity-90">{title}</div>
      <div className="min-w-[80px] flex justify-end gap-2">{right}</div>
    </div>
  );
}
