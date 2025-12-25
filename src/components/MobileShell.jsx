export function MobileShell({ children, backgroundImage }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-[380px] max-w-full">
        <div
          className="relative overflow-hidden rounded-[28px] border"
          style={{ boxShadow: "var(--shadow)" }}
        >
          {/* background opcional (Home) */}
          {backgroundImage && (
            <>
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/75" />
            </>
          )}

          {/* conteudo */}
          <div
            className="relative min-h-[780px]"
            style={{
              background: backgroundImage ? "transparent" : `rgb(var(--bg))`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
