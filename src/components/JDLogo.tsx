// Monogramme "JD" vectoriel avec masque luminescent (gradient + glow).
// Path data partagé avec l'intro (morphing).
export const JD_PATHS = {
  jStem: "M42 16 L42 104",
  jFinal: "M42 16 L42 82 Q42 104 27 104 Q14 104 13 86",
  dStem: "M58 16 L58 104",
  dFinal: "M58 16 L58 104 L74 104 Q98 104 98 60 Q98 16 74 16 Z",
};

export default function JDLogo({
  size = 40,
  className = "",
  idSuffix = "",
}: {
  size?: number;
  className?: string;
  idSuffix?: string;
}) {
  const gid = `jd-grad${idSuffix}`;
  const fid = `jd-glow${idSuffix}`;
  return (
    <svg
      width={size}
      height={size * 0.72}
      viewBox="0 0 110 120"
      fill="none"
      className={className}
      aria-label="Jonathan Davy"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d8c08a" />
          <stop offset="55%" stopColor="#bfa06a" />
          <stop offset="100%" stopColor="#9a7b3f" />
        </linearGradient>
        <filter id={fid} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g
        stroke={`url(#${gid})`}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${fid})`}
      >
        <path d={JD_PATHS.dFinal} />
        <path d={JD_PATHS.jFinal} />
      </g>
    </svg>
  );
}
