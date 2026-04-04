import { useEffect, useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import "../styles/Landingpage.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

function MorphOrb() {
  const meshRef = useRef();
  const mat = useRef();
  const { viewport } = useThree();
  const clock = new THREE.Clock();

  // multiple geometries for morphing
  const geoA = useMemo(() => new THREE.IcosahedronGeometry(1.4, 4), []);
  const geoB = useMemo(() => new THREE.OctahedronGeometry(1.6, 3), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Slow organic rotation
    meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.3;
    meshRef.current.rotation.y = t * 0.08;
    meshRef.current.rotation.z = Math.cos(t * 0.12) * 0.15;

    // Breathe scale
    const breathe = 1 + Math.sin(t * 0.5) * 0.04;
    meshRef.current.scale.setScalar(breathe);

    // Distort vertices
    const pos = meshRef.current.geometry.attributes.position;
    const origPos = meshRef.current.geometry.userData.original;
    if (origPos) {
      for (let i = 0; i < pos.count; i++) {
        const ox = origPos[i * 3];
        const oy = origPos[i * 3 + 1];
        const oz = origPos[i * 3 + 2];
        const noise = Math.sin(ox * 2 + t * 0.6) * Math.cos(oy * 2 + t * 0.4) * 0.08;
        pos.setXYZ(i, ox + noise, oy + noise * 0.8, oz + noise * 0.6);
      }
      pos.needsUpdate = true;
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      const pos = meshRef.current.geometry.attributes.position;
      const orig = new Float32Array(pos.array);
      meshRef.current.geometry.userData.original = orig;
    }
  }, []);

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} geometry={geoA}>
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.4}
          chromaticAberration={0.08}
          anisotropy={0.2}
          distortion={0.3}
          distortionScale={0.5}
          temporalDistortion={0.1}
          iridescence={1.2}
          iridescenceIOR={1.4}
          iridescenceThicknessRange={[0, 1400]}
          roughness={0.0}
          color="#C8441A"
          attenuationColor="#3D5A4C"
          attenuationDistance={0.4}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function OrbParticles() {
  const ref = useRef();
  const count = 120;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.8 + Math.random() * 1.2;
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((s) => {
    ref.current.rotation.y = s.clock.elapsedTime * 0.05;
    ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.04) * 0.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#F0EBE1"
        size={0.022}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function GraphCanvas() {
  const canvasRef = useRef();
  const animRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, t = 0;

    const nodeConfigs = [
      { lx: 0.5, ly: 0.46, r: 20, label: "AI Core", color: "#C8441A", size: 1 },
      { lx: 0.22, ly: 0.22, r: 12, label: "Articles",  color: "#F0EBE1", size: .7 },
      { lx: 0.78, ly: 0.2,  r: 10, label: "Tweets",    color: "#B8B0A4", size: .6 },
      { lx: 0.15, ly: 0.62, r: 14, label: "PDFs",      color: "#F0EBE1", size: .8 },
      { lx: 0.82, ly: 0.65, r: 11, label: "Videos",    color: "#B8B0A4", size: .65 },
      { lx: 0.47, ly: 0.82, r: 9,  label: "Images",    color: "#3D5A4C", size: .55 },
      { lx: 0.88, ly: 0.42, r: 8,  label: "Notes",     color: "#B8B0A4", size: .5 },
      { lx: 0.1,  ly: 0.4,  r: 9,  label: "Links",     color: "#3D5A4C", size: .55 },
      { lx: 0.35, ly: 0.15, r: 7,  label: "Audio",     color: "#B8B0A4", size: .45 },
      { lx: 0.68, ly: 0.84, r: 7,  label: "Threads",   color: "#F0EBE1", size: .45 },
    ];

    const edges = [
      [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],
      [1,7],[1,8],[2,6],[3,5],[4,9],[5,9]
    ];

    function resize() {
      const box = canvas.parentElement.getBoundingClientRect();
      W = canvas.width  = box.width;
      H = canvas.height = box.height;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.008;

      const nodes = nodeConfigs.map((n, i) => ({
        ...n,
        x: n.lx * W,
        y: (n.ly + Math.sin(t * 0.7 + i * 1.1) * 0.025) * H,
      }));

      // Edges
      edges.forEach(([a, b]) => {
        const na = nodes[a], nb = nodes[b];
        const alpha = 0.12 + 0.05 * Math.sin(t + a + b);
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);

        // Curved edges
        const mx = (na.x + nb.x) / 2 + (Math.random() - 0.5) * 20;
        const my = (na.y + nb.y) / 2 + (Math.random() - 0.5) * 20;
        ctx.quadraticCurveTo(
          (na.x + nb.x) / 2 + Math.sin(t * 0.3) * 8,
          (na.y + nb.y) / 2 + Math.cos(t * 0.3) * 8,
          nb.x, nb.y
        );
        ctx.strokeStyle = `rgba(200,68,26,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Traveling dot
        const prog = (t * 0.5 + (a + b) * 0.3) % 1;
        const tx = na.x + (nb.x - na.x) * prog;
        const ty = na.y + (nb.y - na.y) * prog;
        ctx.beginPath();
        ctx.arc(tx, ty, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,68,26,0.7)`;
        ctx.fill();
      });

      // Nodes
      nodes.forEach((n, i) => {
        // Glow
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 2.8);
        g.addColorStop(0, n.color + "22");
        g.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // Ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.strokeStyle = n.color + "80";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Fill
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r - 1, 0, Math.PI * 2);
        ctx.fillStyle = n.color + "18";
        ctx.fill();

        // Label
        ctx.fillStyle = n.color;
        ctx.font = `${Math.max(7, n.r * 0.6)}px 'Geist Mono', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.label, n.x, n.y);

        // Pulse ring for center
        if (i === 0) {
          const pulse = 0.5 + 0.5 * Math.sin(t * 1.8);
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + pulse * 28, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(200,68,26,${0.4 - pulse * 0.35})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
}

function Preloader({ onDone }) {
  const counterRef = useRef();
  const barRef = useRef();
  const wrapRef = useRef();

  useEffect(() => {
    let count = 0;
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(wrapRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
          onComplete: onDone,
        });
      },
    });

    tl.to(barRef.current, {
      scaleX: 1,
      duration: 1.8,
      ease: "power2.inOut",
    });

    gsap.to({ val: 0 }, {
      val: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: function () {
        if (counterRef.current)
          counterRef.current.textContent = Math.round(this.targets()[0].val);
      },
    });
  }, []);

  return (
    <div id="preloader" ref={wrapRef}>
      <div className="pre-counter" ref={counterRef}>0</div>
      <div className="pre-bar-wrap">
        <div className="pre-bar" ref={barRef} />
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [loaded, setLoaded] = useState(false);

  const curRef = useRef();
  const labelRef = useRef();

  useEffect(() => {
    if (!loaded) return;

    let mx = 0, my = 0;
    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      gsap.to(curRef.current, {
        x: mx, y: my,
        duration: 0.08,
        ease: "none",
      });
      gsap.to(labelRef.current, {
        x: mx, y: my + 28,
        duration: 0.12,
      });
    };
    document.addEventListener("mousemove", move);

    // Hover states
    const hoverEls = document.querySelectorAll("button, a, .feat-item, .save-card, .nav-link");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        curRef.current?.classList.add("hovering");
        if (labelRef.current) {
          labelRef.current.style.opacity = "1";
          labelRef.current.textContent = el.dataset.cursor || "VIEW";
        }
      });
      el.addEventListener("mouseleave", () => {
        curRef.current?.classList.remove("hovering");
        if (labelRef.current) labelRef.current.style.opacity = "0";
      });
    });

    return () => document.removeEventListener("mousemove", move);
  }, [loaded]);

  // GSAP animations after load
  useEffect(() => {
    if (!loaded) return;

    const ctx = gsap.context(() => {
      // Hero title lines
      gsap.utils.toArray(".hero-title .line span").forEach((span, i) => {
        gsap.to(span, {
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.1 + i * 0.12,
        });
      });

      // Hero bottom
      gsap.to(".hero-desc", { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power3.out" });
      gsap.to(".hero-meta", { opacity: 1, y: 0, duration: 1, delay: 0.75, ease: "power3.out" });
      gsap.to(".scroll-ticker", { opacity: 1, duration: 0.8, delay: 1.2 });

      // Section reveals
      gsap.utils.toArray(".reveal-inner").forEach((el) => {
        gsap.to(el, {
          y: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top 80%",
          },
        });
      });

      // About text split
      const aboutTexts = document.querySelectorAll(".about-text");
      aboutTexts.forEach((el) => {
        const split = new SplitText(el, { type: "lines" });
        gsap.from(split.lines, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
          },
        });
      });

      // Feat items
      gsap.utils.toArray(".feat-item").forEach((el, i) => {
        gsap.from(el, {
          x: -30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: i * 0.07,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
        });
      });

      // Process steps
      gsap.utils.toArray(".process-step").forEach((el, i) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: ".process-grid",
            start: "top 75%",
          },
        });
      });

      // Save cards
      gsap.utils.toArray(".save-card").forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: i * 0.05,
          scrollTrigger: {
            trigger: ".saves-grid",
            start: "top 80%",
          },
        });
      });

      // Graph stats counter
      gsap.utils.toArray(".g-stat-n").forEach((el) => {
        const target = el.textContent;
        const isNum = !isNaN(parseInt(target));
        if (isNum) {
          const end = parseInt(target);
          gsap.from({ val: 0 }, {
            val: end,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
            onUpdate: function () {
              el.textContent = Math.round(this.targets()[0].val) + (target.includes("K") ? "K+" : "%");
            },
          });
        }
      });
    });

    return () => ctx.revert();
  }, [loaded]);

  const features = [
    { n: "01", name: "Universal Save", desc: "Browser extension captures anything — articles, tweets, PDFs, videos, images. One click, instantly indexed.", tag: "Extension" },
    { n: "02", name: "AI Tagging",     desc: "Semantic embeddings extract topics, entities, intent. No manual effort. Ever.", tag: "AI" },
    { n: "03", name: "Knowledge Graph",desc: "D3-powered live graph. See how ideas saved weeks apart invisibly connect.", tag: "Visualization" },
    { n: "04", name: "Semantic Search",desc: "Vector-powered search understands meaning, not keywords. Find an idea you half-remember.", tag: "Search" },
    { n: "05", name: "Resurfacing",    desc: '"2 months ago you saved this." Spaced repetition. Right thing, right time.', tag: "Memory" },
    { n: "06", name: "Highlights",     desc: "Clip specific passages, annotate inline, weave into your graph automatically.", tag: "Capture" },
  ];

  const saves = [
    { ico: "📄", name: "Articles",    sub: "web pages" },
    { ico: "𝕏",  name: "Tweets",      sub: "threads" },
    { ico: "▶",  name: "Videos",      sub: "youtube" },
    { ico: "📑", name: "PDFs",        sub: "documents" },
    { ico: "🖼", name: "Images",      sub: "screenshots" },
    { ico: "🎙", name: "Podcasts",    sub: "audio" },
    { ico: "📝", name: "Notes",       sub: "text" },
    { ico: "🧵", name: "Threads",     sub: "discussions" },
  ];

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />

      <div id="cursor" ref={curRef} />
      <div id="cursor-label" ref={labelRef} />

      {/* THREE.JS HERO CANVAS */}
      <canvas id="hero-canvas" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <Canvas
          style={{ position: "fixed", inset: 0 }}
          camera={{ position: [0, 0, 4], fov: 45 }}
          gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        >
          <Environment preset="city" />
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#C8441A" />
          <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#3D5A4C" />
          <MorphOrb />
          <OrbParticles />
        </Canvas>
      </canvas>

      {/* NAV */}
      <nav>
        <a href="#" className="nav-logo">MEMEX</a>
        <div className="nav-right">
          <span className="nav-count">EST. 2025</span>
          <a href="#features" className="nav-link">Features</a>
          <a href="#process"  className="nav-link">Process</a>
          <a href="#cta"      className="nav-link" data-cursor="WAITLIST">Access</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-kicker">Second Brain Infrastructure</div>

        <div className="hero-title-wrap">
          <h1 className="hero-title">
            <div className="line"><span>SAVE</span></div>
            <div className="line"><span className="italic">everything</span></div>
            <div className="line"><span>FORGET</span></div>
            <div className="line"><span>NOTHING</span></div>
          </h1>
        </div>

        <div className="hero-bottom">
          <p className="hero-desc">
            An AI-powered knowledge OS that captures, organizes, and resurfaces
            everything you consume — automatically. Articles, tweets, PDFs, videos.
            All connected. All searchable. All remembered.
          </p>
          <div className="hero-meta">
            <span>Browser Extension</span>
            <span>Vector Search</span>
            <span>Knowledge Graph</span>
            <a href="#cta" className="hero-cta" data-cursor="LET'S GO">
              <span>Get Early Access</span>
              <span className="arrow">→</span>
            </a>
          </div>
        </div>

        <div className="scroll-ticker">
          <div className="scroll-ticker-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-strip">
        <div className="marquee-inner">
          {["Save Anything", "AI Tagged", "Graph Connected", "Semantically Searched", "Auto Resurfaced", "Zero Friction"].flatMap((t, i) => [
            <span className="marquee-item" key={`a${i}`}>{t}</span>,
            <span className="marquee-dot" key={`d${i}`} />,
          ])}
          {["Save Anything", "AI Tagged", "Graph Connected", "Semantically Searched", "Auto Resurfaced", "Zero Friction"].flatMap((t, i) => [
            <span className="marquee-item" key={`b${i}`}>{t}</span>,
            <span className="marquee-dot" key={`e${i}`} />,
          ])}
        </div>
      </div>

      {/* ABOUT */}
      <section className="section-about">
        <div className="about-left">
          <div className="section-num">01 — About</div>
          <h2 className="about-heading">
            Your mind<br />
            <em>extended</em>
          </h2>
        </div>
        <div className="about-right">
          <div className="about-block">
            <div className="about-label">The Problem</div>
            <p className="about-text">
              You read 200 articles a month. You save 50.
              You remember <em>3</em>. The rest — gone.
              Your browser bookmarks are a graveyard.
            </p>
          </div>
          <div className="about-block">
            <div className="about-label">The Solution</div>
            <p className="about-text">
              Memex is not a note-taking app. It's a <em>knowledge operating system</em>.
              Save once. The AI does the rest — tagging, clustering, connecting, resurfacing.
            </p>
          </div>
          <div className="about-block">
            <div className="about-label">The Vision</div>
            <p className="about-text">
              A living graph that grows with you. Surfaces the right idea
              at the <em>exact right moment</em>. Your second brain, running in the background.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section-features" id="features">
        <div className="feat-header">
          <div>
            <div className="section-num">02 — Features</div>
            <h2 className="feat-heading">
              WHAT<br />
              <span className="accent">IT DOES</span>
            </h2>
          </div>
          <p className="feat-sub">
            Six systems working in concert. No manual effort. Pure signal.
          </p>
        </div>
        <div className="feat-list">
          {features.map((f) => (
            <div className="feat-item" key={f.n} data-cursor="VIEW">
              <div className="feat-n">{f.n}</div>
              <div className="feat-body">
                <div className="feat-name">{f.name}</div>
                <p className="feat-desc">{f.desc}</p>
              </div>
              <div className="feat-tag">{f.tag}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-process" id="process">
        <div className="process-bg-text">MEMEX</div>
        <div className="section-num" style={{ color: "var(--rust)", marginBottom: "2rem" }}>03 — How It Works</div>
        <h2 className="process-heading">
          FOUR STEPS<br />
          <span>TO MASTERY</span>
        </h2>
        <div className="process-grid">
          {[
            { n: "01", icon: "↓", title: "SAVE", text: "Browser extension. One click. Any URL, tweet, PDF, video. Instantly captured and queued." },
            { n: "02", icon: "◎", title: "EMBED",text: "AI generates semantic embeddings. Topics extracted. Entities identified. Knowledge categorized." },
            { n: "03", icon: "⌀", title: "GRAPH",text: "Items cluster into topics. Connections form. Your knowledge graph grows with every save." },
            { n: "04", icon: "↑", title: "RECALL",text: "Spaced repetition engine resurfaces items. Search by meaning. Never lose an idea again." },
          ].map((s, i) => (
            <div className="process-step" key={i}>
              <div className="p-num">{s.n}</div>
              <div className="p-icon">{s.icon}</div>
              <div className="p-title">{s.title}</div>
              <p className="p-text">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GRAPH SECTION */}
      <section className="section-graph">
        <div className="graph-left">
          <div className="graph-label">04 — Knowledge Graph</div>
          <h2 className="graph-heading">YOUR BRAIN<br />VISUALIZED</h2>
          <p className="graph-text">
            Watch your knowledge graph grow in real-time. Every save adds a node.
            The AI finds connections you'd never see. Topics cluster automatically.
            Ideas from months ago link to what you saved today.
          </p>
          <div className="graph-stats">
            <div className="g-stat">
              <div className="g-stat-n">48K+</div>
              <div className="g-stat-l">Items processed</div>
            </div>
            <div className="g-stat">
              <div className="g-stat-n">93%</div>
              <div className="g-stat-l">Tag accuracy</div>
            </div>
            <div className="g-stat">
              <div className="g-stat-n">0</div>
              <div className="g-stat-l">Manual tags needed</div>
            </div>
            <div className="g-stat">
              <div className="g-stat-n">1s</div>
              <div className="g-stat-l">Save to indexed</div>
            </div>
          </div>
        </div>
        <div className="graph-right" style={{ height: "500px" }}>
          <GraphCanvas />
        </div>
      </section>

      {/* SAVES */}
      <section className="section-saves" id="saves">
        <h2 className="saves-heading">
          SAVE FROM<br />
          <em>anywhere</em>
        </h2>
        <div className="saves-grid">
          {saves.map((s, i) => (
            <div className="save-card" key={i} data-cursor="SAVE">
              <span className="save-ico">{s.ico}</span>
              <div className="save-name">{s.name}</div>
              <div className="save-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-cta" id="cta">
        <div className="cta-bg-title">NOW</div>
        <div className="cta-label">05 — Early Access</div>
        <h2 className="cta-title">
          JOIN THE<br />
          <span className="ghost">WAITLIST</span>
        </h2>
        <p className="cta-sub">
          Limited spots. Be first. Start building your second brain before
          everyone else catches on.
        </p>
        <div className="cta-form">
          <input
            className="cta-input"
            type="email"
            placeholder="your@email.com"
          />
          <button className="cta-submit" data-cursor="GO">
            ACCESS →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="f-logo">MEMEX</div>
        <div className="f-center">
          <a href="#" className="f-link">Privacy</a>
          <a href="#" className="f-link">Terms</a>
          <a href="#" className="f-link">Twitter</a>
          <a href="#" className="f-link">GitHub</a>
        </div>
        <div className="f-right">© 2025 Memex Inc.</div>
      </footer>
    </>
  );
}