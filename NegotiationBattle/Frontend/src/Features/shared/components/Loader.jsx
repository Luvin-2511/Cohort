import "../styles/loader.css";

// ── Constants ─────────────────────────────────────────────────────────────────
const BLOB_COUNT = 6;

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left:     `${10 + Math.random() * 80}%`,
  bottom:   `${5  + Math.random() * 30}%`,
  duration: `${1.5 + Math.random() * 3}s`,
  delay:    `${Math.random() * 2}s`,
  size:     `${1.5 + Math.random() * 2.5}px`,
  opacity:  0.4 + Math.random() * 0.6,
}));

function GooFilter() {
  return (
    <svg
      className="goo-svg"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      aria-hidden="true"
    >
      <defs>
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
  );
}

// ── Blobs ─────────────────────────────────────────────────────────────────────
function Blobs() {
  return (
    <div className="goo-wrapper">
      <div className="goo-stage">
        {Array.from({ length: BLOB_COUNT }, (_, i) => (
          <div key={i} className={`blob blob-${i}`} />
        ))}
        <div className="blob-reflection" />
      </div>
    </div>
  );
}

// ── Floating ambient particles ────────────────────────────────────────────────
function AmbientParticles() {
  return (
    <>
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left:             p.left,
            bottom:           p.bottom,
            width:            p.size,
            height:           p.size,
            animationDuration: p.duration,
            animationDelay:    p.delay,
            opacity:           p.opacity,
          }}
        />
      ))}
    </>
  );
}

// ── Loading label with animated dots ─────────────────────────────────────────
function LoadingLabel() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <span className="loader-label">Loading</span>
      <span className="loader-dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </span>
    </div>
  );
}

// ── Loader (default export) ───────────────────────────────────────────────────
export default function Loader() {
  return (
    <div className="loader-root">
      {/* Hidden SVG that defines the gooey filter */}
      <GooFilter />

      {/* Orbiting decorative rings */}
      <div className="orbit-ring" />
      <div className="orbit-ring orbit-ring-2" />

      {/* Rising ambient particles */}
      <AmbientParticles />

      {/* The gooey blobs */}
      <Blobs />

      {/* Label */}
      <LoadingLabel />
    </div>
  );
}