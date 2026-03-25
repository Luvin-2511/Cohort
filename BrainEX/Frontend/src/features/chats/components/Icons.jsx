export const Ic = ({ d, size = 15, sw = 1.75, fill = "none", style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    {[].concat(d).map((p, i) => (
      <path key={i} d={p} />
    ))}
  </svg>
);

export const LayoutIc = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3v18" />
  </svg>
);

export const DotsIc = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="2.3" />
    <circle cx="12" cy="12" r="2.3" />
    <circle cx="19" cy="12" r="2.3" />
  </svg>
);

export const SunIc = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

export const MoonIc = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const StarLogo = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 44 44"
    fill="none"
    style={{ color: "var(--accent)" }}
  >
    <polygon
      points="22,3 38,12 38,32 22,41 6,32 6,12"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <text
      x="22"
      y="29"
      textAnchor="middle"
      fontFamily="'DM Sans',sans-serif"
      fontWeight="700"
      fontSize="16"
      fill="currentColor"
    >
      B
    </text>
  </svg>
);

export const StarHero = () => (
  <svg
    width="46"
    height="46"
    viewBox="0 0 44 44"
    fill="none"
    className="asterisk-spin"
    style={{ color: "var(--accent)" }}
  >
    <polygon
      points="22,3 38,12 38,32 22,41 6,32 6,12"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinejoin="round"
    />
    <text
      x="22"
      y="29"
      textAnchor="middle"
      fontFamily="'DM Sans',sans-serif"
      fontWeight="700"
      fontSize="15"
      fill="currentColor"
    >
      B
    </text>
  </svg>
);