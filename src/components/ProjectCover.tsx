// Visuel de couverture thématique par projet : fond sombre encre + motif or.
// Pas de photo externe — illustration vectorielle adaptée au sujet, lisible sur le clair.

type Motif = "scan" | "network" | "browser" | "grid";

const MOTIF_BY_SLUG: Record<string, Motif> = {
  "controle-acces-facial": "scan",
  "parc-it-hospitalier": "network",
  "portfolio-immersif": "browser",
  "ui-toolkit-glass": "grid",
};

function MotifSvg({ motif }: { motif: Motif }) {
  const stroke = "#cdb98a";
  const common = { fill: "none", stroke, strokeWidth: 1.4, strokeLinecap: "round" as const };
  if (motif === "scan") {
    return (
      <g opacity="0.85">
        {/* cadre de scan */}
        <path d="M40 70 V40 H70" {...common} />
        <path d="M300 70 V40 H270" {...common} />
        <path d="M40 170 V200 H70" {...common} />
        <path d="M300 170 V200 H270" {...common} />
        {/* visage stylisé */}
        <circle cx="170" cy="105" r="46" {...common} />
        <circle cx="152" cy="98" r="4" fill={stroke} stroke="none" />
        <circle cx="188" cy="98" r="4" fill={stroke} stroke="none" />
        <path d="M152 124 Q170 136 188 124" {...common} />
        {/* ligne de scan */}
        <line x1="40" y1="120" x2="300" y2="120" stroke={stroke} strokeWidth="1" opacity="0.5" />
      </g>
    );
  }
  if (motif === "network") {
    const nodes = [
      [70, 70], [170, 50], [270, 80], [110, 140], [220, 150], [170, 200],
    ];
    const edges = [[0, 1], [1, 2], [0, 3], [3, 5], [1, 4], [4, 2], [4, 5], [3, 4]];
    return (
      <g opacity="0.85">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={stroke} strokeWidth="1" opacity="0.5" />
        ))}
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 1 ? 9 : 6} fill={stroke} opacity={i === 1 ? 1 : 0.8} />
        ))}
      </g>
    );
  }
  if (motif === "browser") {
    return (
      <g opacity="0.85">
        <rect x="55" y="50" width="230" height="150" rx="10" fill="none" stroke={stroke} strokeWidth="1.4" />
        <line x1="55" y1="78" x2="285" y2="78" stroke={stroke} strokeWidth="1.4" />
        <circle cx="70" cy="64" r="3.5" fill={stroke} />
        <circle cx="84" cy="64" r="3.5" fill={stroke} />
        <circle cx="98" cy="64" r="3.5" fill={stroke} />
        <line x1="75" y1="100" x2="180" y2="100" stroke={stroke} strokeWidth="2" />
        <line x1="75" y1="120" x2="240" y2="120" stroke={stroke} strokeWidth="1" opacity="0.6" />
        <line x1="75" y1="135" x2="210" y2="135" stroke={stroke} strokeWidth="1" opacity="0.6" />
        {/* curseur */}
        <path d="M205 150 l22 9 l-9 3 l-3 9 z" fill={stroke} />
      </g>
    );
  }
  // grid / bento
  return (
    <g opacity="0.85">
      <rect x="55" y="55" width="120" height="90" rx="8" fill="none" stroke={stroke} strokeWidth="1.4" />
      <rect x="185" y="55" width="100" height="42" rx="8" fill="none" stroke={stroke} strokeWidth="1.4" />
      <rect x="185" y="105" width="100" height="40" rx="8" fill="none" stroke={stroke} strokeWidth="1.4" />
      <rect x="55" y="155" width="230" height="44" rx="8" fill="none" stroke={stroke} strokeWidth="1.4" />
    </g>
  );
}

export default function ProjectCover({
  slug,
  index,
  category,
  className = "",
}: {
  slug: string;
  index: number;
  category?: string;
  className?: string;
}) {
  const motif = MOTIF_BY_SLUG[slug] ?? "grid";
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-[linear-gradient(135deg,#211d16_0%,#1b1813_55%,#272015_100%)] ${className}`}
    >
      {/* halo or */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_28%,rgba(191,160,106,0.28),transparent_60%)]" />
      <svg viewBox="0 0 340 240" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <MotifSvg motif={motif} />
      </svg>
      <span className="absolute left-6 top-5 font-mono text-6xl font-bold text-[#cdb98a]/25">
        {String(index).padStart(2, "0")}
      </span>
      {category && (
        <span className="absolute right-5 top-5 rounded-full border border-[#cdb98a]/30 bg-black/20 px-3 py-1 text-[11px] font-medium text-[#e6d7b8] backdrop-blur-sm">
          {category}
        </span>
      )}
    </div>
  );
}
