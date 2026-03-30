import { useEffect, useRef, useState } from "react";

const glitchChars = "!@#$%^&*<>?/\\|{}[]~`";

function useGlitch(text, active) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    let iter = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split("").map((c, i) =>
          i < iter ? c : glitchChars[Math.floor(Math.random() * glitchChars.length)]
        ).join("")
      );
      iter += 0.4;
      if (iter >= text.length) { setDisplay(text); clearInterval(interval); }
    }, 40);
    return () => clearInterval(interval);
  }, [active, text]);
  return display;
}

function Particle({ style }) {
  return <div style={style} />;
}

export default function NotFound() {
  const canvasRef = useRef(null);
  const [glitching, setGlitching] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const subtitle = useGlitch("PAGE NOT FOUND", glitching);
  const particles = useRef([]);

  useEffect(() => {
    const t = setTimeout(() => setGlitching(true), 600);
    const loop = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 800);
    }, 4000);
    return () => { clearTimeout(t); clearInterval(loop); };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let w, h;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    particles.current = Array.from({ length: 60 }, () => ({
      x: Math.random() * 1000,
      y: Math.random() * 600,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(146, 115, 255, ${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  const styles = {
    root: {
      minHeight: "100vh",
      background: "#0b0b10",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'DM Sans', sans-serif",
      cursor: "default",
    },
    canvas: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
    },
    scanlines: {
      position: "absolute",
      inset: 0,
      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)",
      pointerEvents: "none",
      zIndex: 2,
    },
    vignette: {
      position: "absolute",
      inset: 0,
      background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)",
      pointerEvents: "none",
      zIndex: 3,
    },
    glow: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "600px",
      height: "300px",
      background: "radial-gradient(ellipse, rgba(124,92,252,0.12) 0%, transparent 70%)",
      pointerEvents: "none",
      zIndex: 1,
    },
    content: {
      position: "relative",
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0px",
    },
    errorCode: {
      fontSize: "clamp(120px, 22vw, 220px)",
      fontWeight: 900,
      letterSpacing: "-0.04em",
      lineHeight: 1,
      fontFamily: "'DM Sans', sans-serif",
      color: "transparent",
      WebkitTextStroke: "2px rgba(146,115,255,0.25)",
      position: "relative",
      userSelect: "none",
    },
    errorCodeGlitch: {
      position: "absolute",
      inset: 0,
      fontSize: "clamp(120px, 22vw, 220px)",
      fontWeight: 900,
      letterSpacing: "-0.04em",
      lineHeight: 1,
      color: "transparent",
      WebkitTextStroke: "2px #7c5cfc",
      filter: glitching ? "blur(0.5px)" : "none",
      animation: glitching ? "glitch 0.08s steps(1) infinite" : "none",
      pointerEvents: "none",
    },
    errorCodeFill: {
      position: "absolute",
      inset: 0,
      fontSize: "clamp(120px, 22vw, 220px)",
      fontWeight: 900,
      letterSpacing: "-0.04em",
      lineHeight: 1,
      background: "linear-gradient(135deg, #7c5cfc 0%, #4a2fbd 50%, #9273ff 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      opacity: 0.9,
    },
    divider: {
      width: "40px",
      height: "2px",
      background: "rgba(124,92,252,0.4)",
      margin: "18px 0 22px",
      borderRadius: "2px",
    },
    subtitle: {
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.35em",
      color: "#E59D27",
      textTransform: "uppercase",
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      marginBottom: "10px",
      minWidth: "200px",
      textAlign: "center",
    },
    message: {
      fontSize: "15px",
      color: "rgba(226,224,240,0.45)",
      textAlign: "center",
      maxWidth: "340px",
      lineHeight: 1.7,
      marginBottom: "36px",
      fontWeight: 300,
    },
    btn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "11px 28px",
      borderRadius: "10px",
      border: "1px solid #E59D27",
      background: btnHover ? "rgba(124,92,252,0.15)" : "rgba(124,92,252,0.06)",
      color: btnHover ? "#E59D27" : "rgba(226,224,240,0.65)",
      fontSize: "13.5px",
      fontWeight: 500,
      cursor: "pointer",
      transition: "all 0.2s",
      textDecoration: "none",
      letterSpacing: "0.01em",
      transform: btnHover ? "translateY(-1px)" : "translateY(0)",
      boxShadow: btnHover ? "0 8px 24px rgba(124,92,252,0.2)" : "none",
    },
    corner: (pos) => ({
      position: "absolute",
      width: "16px",
      height: "16px",
      borderColor: "#E59D27",
      borderStyle: "solid",
      borderWidth: 0,
      ...(pos === "tl" && { top: "24px", left: "24px", borderTopWidth: "1px", borderLeftWidth: "1px" }),
      ...(pos === "tr" && { top: "24px", right: "24px", borderTopWidth: "1px", borderRightWidth: "1px" }),
      ...(pos === "bl" && { bottom: "24px", left: "24px", borderBottomWidth: "1px", borderLeftWidth: "1px" }),
      ...(pos === "br" && { bottom: "24px", right: "24px", borderBottomWidth: "1px", borderRightWidth: "1px" }),
      zIndex: 10,
    }),
    statusBar: {
      position: "absolute",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "10px",
      color: "#E59D27",
      letterSpacing: "0.12em",
      fontFamily: "'JetBrains Mono', monospace",
      zIndex: 10,
      whiteSpace: "nowrap",
    },
    dot: {
      width: "5px",
      height: "5px",
      borderRadius: "50%",
      background: "rgba(124,92,252,0.5)",
      animation: "blink 1.4s ease-in-out infinite",
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;900&display=swap');
        @keyframes glitch {
          0%   { clip-path: inset(20% 0 60% 0); transform: translate(-3px, 0); }
          20%  { clip-path: inset(70% 0 10% 0); transform: translate(3px, 0); }
          40%  { clip-path: inset(40% 0 40% 0); transform: translate(-2px, 0); }
          60%  { clip-path: inset(10% 0 80% 0); transform: translate(2px, 0); }
          80%  { clip-path: inset(60% 0 20% 0); transform: translate(-1px, 0); }
          100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, 0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nf-content > * {
          animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        .nf-content > *:nth-child(1) { animation-delay: 0.1s; }
        .nf-content > *:nth-child(2) { animation-delay: 0.2s; }
        .nf-content > *:nth-child(3) { animation-delay: 0.28s; }
        .nf-content > *:nth-child(4) { animation-delay: 0.34s; }
        .nf-content > *:nth-child(5) { animation-delay: 0.4s; }
      `}</style>

      <div style={styles.root}>
        <canvas ref={canvasRef} style={styles.canvas} />
        <div style={styles.scanlines} />
        <div style={styles.vignette} />
        <div style={styles.glow} />

        {["tl","tr","bl","br"].map(p => <div key={p} style={styles.corner(p)} />)}

        <div style={styles.content} className="nf-content">
          <div style={{ position: "relative", lineHeight: 1 }}>
            <div style={styles.errorCode}>404</div>
            <div style={styles.errorCodeFill}>404</div>
            {glitching && <div style={styles.errorCodeGlitch}>404</div>}
          </div>

          <div style={styles.divider} />

          <div style={styles.subtitle}>{subtitle}</div>

          <p style={styles.message}>
            The page you're looking for has drifted into the void.<br />
            It may have been moved, deleted, or never existed.
          </p>

          <a
            href="/"
            style={styles.btn}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M6 11L2 7L6 3M2 7H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Return home
          </a>
        </div>

        <div style={styles.statusBar}>
          <div style={styles.dot} />
          ERROR_404 · ROUTE_UNRESOLVED · {new Date().toISOString().slice(0,10)}
        </div>
      </div>
    </>
  );
}