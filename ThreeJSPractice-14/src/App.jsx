import { Environment, Loader, useGLTF, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Navbar from "./components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { Suspense, useEffect, useRef, useState } from "react";
gsap.registerPlugin(ScrollTrigger, useGSAP);
import Lenis from "lenis";

const Model = ({ modelRef, onModelLoaded }) => {
  const model = useGLTF("/Miles.glb");

  useEffect(() => {
    if (model.scene && onModelLoaded) {
      onModelLoaded();
    }
  }, [model.scene, onModelLoaded]);

  return (
    <primitive
      ref={modelRef}
      object={model.scene}
      position={[-0.5, -10, 1]}
      scale={7}
    />
  );
};

const ThreeElement = ({ modelRef, onModelLoaded }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <Suspense fallback={null}>
        {/* <OrbitControls /> */}
        <Environment preset="sunset" />
        <ambientLight intensity={10} position={[0, 10, 0]} />
        <Model modelRef={modelRef} onModelLoaded={onModelLoaded} />
      </Suspense>
    </Canvas>
  );
};

const App = () => {
  const modelRef = useRef(null);
  const backgroundRefs = useRef([]);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const scrollTriggersRef = useRef([]);

  // Smooth scroll setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Initial fade-in animation
  useEffect(() => {
    if (modelLoaded) {
      const timeline = gsap.timeline({
        onComplete: () => setIsReady(true),
      });

      timeline
        .to(".hero-heading", {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        })
        .to(
          ".hero-heading-front",
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8",
        );
    }
  }, [modelLoaded]);

  // GSAP scroll animations - ENHANCED MODEL ANIMATIONS
  useGSAP(() => {
    if (!modelRef.current || !modelLoaded || !isReady) return;

    scrollTriggersRef.current.forEach((trigger) => trigger.kill());
    scrollTriggersRef.current = [];

    const smoothEase = "power2.inOut";

    // Model animations - Page 1 (ORIGIN) - Model swings into view
    const modelTimeline1 = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        endTrigger: "#page-1",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    modelTimeline1
      .to(modelRef.current.position, {
        z: 1,
        x: 2,
        y: -12,
        ease: smoothEase,
      })
      .to(
        modelRef.current.rotation,
        {
          y: -2,
          x: 0.1,
          z: -0.05,
          ease: smoothEase,
        },
        0,
      )
      .to(
        modelRef.current.scale,
        {
          x: 8,
          y: 8,
          z: 8,
          ease: smoothEase,
        },
        0,
      );

    // Model animations - Page 2 (ABILITIES) - Model centers and spins
    const modelTimeline2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#page-1",
        endTrigger: "#page-2",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    modelTimeline2
      .to(modelRef.current.position, {
        x: 0.5,
        y: -11,
        z: 1,
        ease: smoothEase,
      })
      .to(
        modelRef.current.rotation,
        {
          x: 0,
          y: Math.PI,
          z: 0,
          ease: smoothEase,
        },
        0,
      )
      .to(
        modelRef.current.scale,
        {
          x: 8.5,
          y: 8.5,
          z: 8.5,
          ease: smoothEase,
        },
        0,
      );

    // Model animations - Page 3 (ENEMIES) - Model moves to left, dramatic pose
    const modelTimeline3 = gsap.timeline({
      scrollTrigger: {
        trigger: "#page-2",
        endTrigger: "#page-3",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    modelTimeline3
      .to(modelRef.current.position, {
        x: -0.5,
        y: -11,
        z: 2.5,
        ease: smoothEase,
      })
      .to(
        modelRef.current.rotation,
        {
          y: 0,
          x: -0.2,
          z: 0.1,
          ease: smoothEase,
        },
        0,
      )
      .to(
        modelRef.current.scale,
        {
          x: 7.5,
          y: 7.5,
          z: 7.5,
          ease: smoothEase,
        },
        0,
      );

    // Model animations - Page 4 (ALLIES) - Model friendly pose to the right
    const modelTimeline4 = gsap.timeline({
      scrollTrigger: {
        trigger: "#page-3",
        endTrigger: "#page-4",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    modelTimeline4
      .to(modelRef.current.position, {
        x: 0.5,
        y: -10,
        z: 0,
        ease: smoothEase,
      })
      .to(
        modelRef.current.rotation,
        {
          y: -Math.PI * 0.6,
          x: 0.05,
          z: -0.05,
          ease: smoothEase,
        },
        0,
      )
      .to(
        modelRef.current.scale,
        {
          x: 7.5,
          y: 7.5,
          z: 7.5,
          ease: smoothEase,
        },
        0,
      );

    // Model animations - Page 5 (MULTIVERSE) - Model floats in center, cosmic pose
    const modelTimeline5 = gsap.timeline({
      scrollTrigger: {
        trigger: "#page-4",
        endTrigger: "#page-5",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    modelTimeline5
      .to(modelRef.current.position, {
        x: 0,
        y: -10,
        z: 0,
        ease: smoothEase,
      })
      .to(
        modelRef.current.rotation,
        {
          y: 0,
          x: 0,
          z: 0,
          ease: smoothEase,
        },
        0,
      )
      .to(
        modelRef.current.scale,
        {
          x: 9,
          y: 9,
          z: 9,
          ease: smoothEase,
        },
        0,
      );

    // Model animations - Page 6 (LEGACY) - Model hero pose, slight upward angle
    const modelTimeline6 = gsap.timeline({
      scrollTrigger: {
        trigger: "#page-5",
        endTrigger: "#page-6",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    modelTimeline6
      .to(modelRef.current.position, {
        x: 0,
        y: -11,
        z: 1.5,
        ease: smoothEase,
      })
      .to(
        modelRef.current.rotation,
        {
          y: Math.PI * 2,
          x: -0.1,
          z: 0,
          ease: smoothEase,
        },
        0,
      )
      .to(
        modelRef.current.scale,
        {
          x: 8,
          y: 8,
          z: 8,
          ease: smoothEase,
        },
        0,
      );

    // Background transitions
    // Background transitions for all pages
    const bgTimeline1 = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "top top",
        endTrigger: "#page-1",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    bgTimeline1
      .to(backgroundRefs.current[0], { opacity: 0, ease: smoothEase })
      .to(backgroundRefs.current[1], { opacity: 1, ease: smoothEase }, 0);

    const bgTimeline2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#page-1",
        start: "top top",
        endTrigger: "#page-2",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    bgTimeline2
      .to(backgroundRefs.current[1], { opacity: 0, ease: smoothEase })
      .to(backgroundRefs.current[2], { opacity: 1, ease: smoothEase }, 0);

    const bgTimeline3 = gsap.timeline({
      scrollTrigger: {
        trigger: "#page-2",
        start: "top top",
        endTrigger: "#page-3",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    bgTimeline3
      .to(backgroundRefs.current[2], { opacity: 0, ease: smoothEase })
      .to(backgroundRefs.current[3], { opacity: 1, ease: smoothEase }, 0);

    const bgTimeline4 = gsap.timeline({
      scrollTrigger: {
        trigger: "#page-3",
        start: "top top",
        endTrigger: "#page-4",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    bgTimeline4
      .to(backgroundRefs.current[3], { opacity: 0, ease: smoothEase })
      .to(backgroundRefs.current[4], { opacity: 1, ease: smoothEase }, 0);

    // Keep bg5 visible for page 5 and 6
    const bgTimeline5 = gsap.timeline({
      scrollTrigger: {
        trigger: "#page-4",
        start: "top top",
        endTrigger: "#page-5",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    bgTimeline5.to(backgroundRefs.current[4], { opacity: 1, ease: smoothEase });

    // Parallax effects
    gsap.to(".parallax-slow", {
      y: -150,
      scrollTrigger: {
        trigger: "#page-1",
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });

    gsap.to(".parallax-medium", {
      y: -100,
      scrollTrigger: {
        trigger: "#page-2",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // Reveal animations for sections with stagger
    gsap.utils.toArray(".reveal-section").forEach((section, index) => {
      gsap.from(section, {
        opacity: 0,
        y: 60,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });
    });

    // Card animations with stagger
    gsap.utils.toArray(".enemy-card").forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        rotateX: 10,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 60%",
          scrub: 1,
        },
      });
    });

    gsap.utils.toArray(".ally-card").forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        scale: 0.9,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 60%",
          scrub: 1,
        },
      });
    });

    gsap.utils.toArray(".dimension-card").forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        z: -100,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 60%",
          scrub: 1,
        },
      });
    });

    gsap.utils.toArray(".timeline-item").forEach((item, index) => {
      gsap.from(item, {
        opacity: 0,
        x: -50,
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          end: "top 65%",
          scrub: 1,
        },
      });
    });

    ScrollTrigger.getAll().forEach((trigger) => {
      scrollTriggersRef.current.push(trigger);
    });

    return () => {
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, [modelLoaded, isReady]);

  return (
    <>
      <main>
        {/* Particle background overlay */}
        <div className="particle-overlay"></div>

        {/* Background layers */}
        <div
          ref={(el) => (backgroundRefs.current[0] = el)}
          style={{ backgroundImage: 'url("/bg1.png")' }}
          className="bg"
        ></div>
        <div
          ref={(el) => (backgroundRefs.current[1] = el)}
          style={{ backgroundImage: 'url("/bg2.png")', opacity: 0 }}
          className="bg"
        ></div>
        <div
          ref={(el) => (backgroundRefs.current[2] = el)}
          style={{ backgroundImage: 'url("/bg3.jpg")', opacity: 0 }}
          className="bg"
        ></div>
        <div
          ref={(el) => (backgroundRefs.current[3] = el)}
          style={{ backgroundImage: 'url("/bg4.jpg")', opacity: 0 }}
          className="bg"
        ></div>
        <div
          ref={(el) => (backgroundRefs.current[4] = el)}
          style={{ backgroundImage: 'url("/bg5.jpg")', opacity: 0 }}
          className="bg"
        ></div>

        <h1
          className="hero-heading"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          Morales
        </h1>

        <div className="abover">
          <Navbar />
          <ThreeElement
            modelRef={modelRef}
            onModelLoaded={() => setModelLoaded(true)}
          />
          <Loader />
        </div>

        <div className="pages">
          <h1
            className="hero-heading-front"
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            Miles
          </h1>

          {/* PAGE 1 - ORIGIN */}
          <div id="page-1" className="page page-1">
            <div className="origin-container reveal-section">
              <div className="origin-content">
                <span className="section-label">01 — ORIGIN</span>
                <h2 className="section-title centered">
                  The New
                  <br />
                  <span className="highlight">Spider-Man</span>
                </h2>
                <p className="section-description centered">
                  A teenager from Brooklyn, Miles Morales was bitten by a
                  genetically altered spider and gained incredible powers.
                  Mentored by Peter Parker, he learned that with great power
                  comes great responsibility.
                </p>

                <div className="origin-stats">
                  <div className="stat-box">
                    <div className="stat-number">2011</div>
                    <div className="stat-label">First Appearance</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-number">∞</div>
                    <div className="stat-label">Multiverses</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-number">13</div>
                    <div className="stat-label">Age</div>
                  </div>
                </div>

                <div className="origin-story">
                  <div className="story-card">
                    <div className="story-icon">🏙️</div>
                    <h4>Brooklyn Born</h4>
                    <p>
                      Raised in Brooklyn, New York by his parents Jefferson and
                      Rio Morales
                    </p>
                  </div>

                  <div className="story-card">
                    <div className="story-icon">🕷️</div>
                    <h4>The Bite</h4>
                    <p>
                      Bitten by a radioactive spider during a visit to Oscorp
                      laboratories
                    </p>
                  </div>

                  <div className="story-card">
                    <div className="story-icon">👥</div>
                    <h4>Mentored</h4>
                    <p>
                      Learned from Peter Parker before taking on the Spider-Man
                      mantle
                    </p>
                  </div>
                </div>

                <div className="origin-quote">
                  <blockquote>
                    "Anyone can wear the mask. You could wear the mask. If you
                    didn't know that before, I hope you do now."
                  </blockquote>
                  <cite>— Miles Morales</cite>
                </div>
              </div>
            </div>
          </div>

          {/* PAGE 2 - ABILITIES */}
          <div id="page-2" className="page page-2">
            <div className="abilities-showcase reveal-section">
              <div className="abilities-header">
                <span className="section-label">02 — ABILITIES</span>
                <h2 className="section-title centered">
                  Unique
                  <br />
                  <span className="highlight">Powers</span>
                </h2>
              </div>

              <div className="abilities-display">
                <div className="ability-item">
                  <div className="ability-visual">⚡</div>
                  <div className="ability-info">
                    <h3>Venom Strike</h3>
                    <p>
                      Bio-electric energy blasts that can paralyze enemies on
                      contact
                    </p>
                    <div className="power-level">
                      <span>Power Level</span>
                      <div className="power-bar">
                        <div style={{ width: "95%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ability-item">
                  <div className="ability-visual">👻</div>
                  <div className="ability-info">
                    <h3>Camouflage</h3>
                    <p>
                      Ability to blend into surroundings, becoming nearly
                      invisible
                    </p>
                    <div className="power-level">
                      <span>Power Level</span>
                      <div className="power-bar">
                        <div style={{ width: "88%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ability-item">
                  <div className="ability-visual">🕷️</div>
                  <div className="ability-info">
                    <h3>Spider Sense</h3>
                    <p>
                      Enhanced awareness that alerts him to danger before it
                      strikes
                    </p>
                    <div className="power-level">
                      <span>Power Level</span>
                      <div className="power-bar">
                        <div style={{ width: "92%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ability-item">
                  <div className="ability-visual">🕸️</div>
                  <div className="ability-info">
                    <h3>Web Slinging</h3>
                    <p>
                      Advanced web-shooting technology for traversal and combat
                    </p>
                    <div className="power-level">
                      <span>Power Level</span>
                      <div className="power-bar">
                        <div style={{ width: "90%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PAGE 3 - ENEMIES */}
          <div id="page-3" className="page page-3">
            <div className="enemies-showcase reveal-section">
              <div className="enemies-intro">
                <span className="section-label">03 — ENEMIES</span>
                <h2 className="section-title">
                  Rogues
                  <br />
                  <span className="highlight">Gallery</span>
                </h2>
                <p className="section-intro">
                  Every hero is defined by their villains. Miles faces threats
                  from street-level criminals to interdimensional menaces.
                </p>
              </div>

              <div className="enemies-layout">
                <div className="enemy-spotlight large">
                  <div className="enemy-glow"></div>
                  <div className="enemy-threat">ARCH NEMESIS</div>
                  <div className="enemy-symbol">💀</div>
                  <h3>The Prowler</h3>
                  <p>
                    Aaron Davis, Miles' uncle, created a complex relationship
                    between family and duty that tested Miles' resolve.
                  </p>
                  <div className="threat-indicator extreme">
                    <span>THREAT LEVEL</span>
                    <div className="threat-meter"></div>
                  </div>
                </div>

                <div className="enemy-spotlight">
                  <div className="enemy-threat">MAJOR THREAT</div>
                  <div className="enemy-symbol">🎭</div>
                  <h3>Kingpin</h3>
                  <p>
                    Wilson Fisk's collider threatened the multiverse itself.
                  </p>
                  <div className="threat-indicator extreme">
                    <span>THREAT LEVEL</span>
                    <div className="threat-meter"></div>
                  </div>
                </div>

                <div className="enemy-spotlight">
                  <div className="enemy-threat">RECURRING FOE</div>
                  <div className="enemy-symbol">🦂</div>
                  <h3>Scorpion</h3>
                  <p>
                    Enhanced strength and agility make him a formidable
                    adversary.
                  </p>
                  <div className="threat-indicator high">
                    <span>THREAT LEVEL</span>
                    <div className="threat-meter"></div>
                  </div>
                </div>

                <div className="enemy-spotlight">
                  <div className="enemy-threat">SUPER VILLAIN</div>
                  <div className="enemy-symbol">⚡</div>
                  <h3>The Spot</h3>
                  <p>
                    Portal-creating scientist seeking revenge across dimensions.
                  </p>
                  <div className="threat-indicator high">
                    <span>THREAT LEVEL</span>
                    <div className="threat-meter"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PAGE 4 - ALLIES */}
          <div id="page-4" className="page page-4">
            <div className="allies-showcase reveal-section">
              <div className="allies-header">
                <span className="section-label">04 — ALLIES</span>
                <h2 className="section-title centered">
                  Spider
                  <br />
                  <span className="highlight">Team</span>
                </h2>
              </div>

              <div className="allies-grid-new">
                <div className="ally-feature">
                  <div className="ally-badge-top">MENTOR</div>
                  <div className="ally-icon-big">🕷️</div>
                  <h3>Peter B. Parker</h3>
                  <span className="ally-subtitle">Original Spider-Man</span>
                  <p>
                    The experienced Spider-Man who mentored Miles and helped him
                    discover his true potential as a hero.
                  </p>
                  <div className="bond-display">
                    <span>BOND STRENGTH</span>
                    <div className="bond-bar">
                      <div style={{ width: "95%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="ally-card-new">
                  <div className="ally-badge-top">PARTNER</div>
                  <div className="ally-icon-big">🕸️</div>
                  <h3>Gwen Stacy</h3>
                  <span className="ally-subtitle">Spider-Woman</span>
                  <p>
                    From another dimension, Gwen brings unique abilities and
                    perspective.
                  </p>
                  <div className="bond-display">
                    <span>BOND</span>
                    <div className="bond-bar">
                      <div style={{ width: "90%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="ally-card-new">
                  <div className="ally-badge-top">FRIEND</div>
                  <div className="ally-icon-big">👊</div>
                  <h3>Ganke Lee</h3>
                  <span className="ally-subtitle">Tech Support</span>
                  <p>
                    Best friend who provides crucial tech support and moral
                    guidance.
                  </p>
                  <div className="bond-display">
                    <span>BOND</span>
                    <div className="bond-bar">
                      <div style={{ width: "88%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="ally-card-new">
                  <div className="ally-badge-top">FAMILY</div>
                  <div className="ally-icon-big">❤️</div>
                  <h3>Rio & Jefferson</h3>
                  <span className="ally-subtitle">Parents</span>
                  <p>His loving parents who support him unconditionally.</p>
                  <div className="bond-display">
                    <span>BOND</span>
                    <div className="bond-bar">
                      <div style={{ width: "100%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PAGE 5 - MULTIVERSE */}
          <div id="page-5" className="page page-5">
            <div className="multiverse-showcase reveal-section">
              <div className="multiverse-header">
                <span className="section-label">05 — MULTIVERSE</span>
                <h2 className="section-title centered">
                  Across The
                  <br />
                  <span className="highlight">Spider-Verse</span>
                </h2>
                <p className="multiverse-tagline">
                  "In every universe, someone becomes Spider-Man. In this one,
                  it's me."
                </p>
              </div>

              <div className="dimensions-wheel">
                <div className="dimension-node primary">
                  <div className="node-pulse"></div>
                  <div className="node-label">Earth-1610</div>
                  <div className="node-status active">ACTIVE</div>
                  <p>Home Universe</p>
                </div>

                <div className="dimension-node">
                  <div className="node-label">Earth-616</div>
                  <div className="node-status visited">VISITED</div>
                  <p>Prime Universe</p>
                </div>

                <div className="dimension-node">
                  <div className="node-label">Earth-65</div>
                  <div className="node-status visited">VISITED</div>
                  <p>Gwen's World</p>
                </div>

                <div className="dimension-node">
                  <div className="node-label">∞</div>
                  <div className="node-status">UNEXPLORED</div>
                  <p>Infinite Possibilities</p>
                </div>
              </div>
            </div>
          </div>

          {/* PAGE 6 - LEGACY */}
          <div id="page-6" className="page page-6">
            <div className="page-content reveal-section">
              <div className="legacy-section">
                <span className="section-label">06 — LEGACY</span>
                <h2 className="section-title">
                  A New
                  <br />
                  <span className="highlight">Generation</span>
                </h2>

                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-year">2011</div>
                      <h3>The Beginning</h3>
                      <p>
                        Miles Morales debuts in Ultimate Fallout #4, introducing
                        a new Spider-Man.
                      </p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-year">2018</div>
                      <h3>Into the Spider-Verse</h3>
                      <p>
                        The groundbreaking animated film brings Miles to
                        mainstream audiences worldwide.
                      </p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-year">2023</div>
                      <h3>Across the Spider-Verse</h3>
                      <p>
                        Miles' journey continues across dimensions in the epic
                        sequel.
                      </p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-year">Beyond</div>
                      <h3>The Future</h3>
                      <p>
                        New adventures await as Miles continues to define what
                        it means to be Spider-Man.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="impact-stats">
                  <div className="impact-item">
                    <div className="impact-number">1B+</div>
                    <div className="impact-label">Box Office</div>
                  </div>
                  <div className="impact-item">
                    <div className="impact-number">Oscar</div>
                    <div className="impact-label">Academy Award</div>
                  </div>
                  <div className="impact-item">
                    <div className="impact-number">100M+</div>
                    <div className="impact-label">Fans Worldwide</div>
                  </div>
                  <div className="impact-item">
                    <div className="impact-number">∞</div>
                    <div className="impact-label">Inspiration</div>
                  </div>
                </div>

                <div className="final-quote">
                  <h3>Anyone Can Wear The Mask</h3>
                  <p>
                    Miles Morales proved that heroes come in all forms. His
                    story reminds us that courage, responsibility, and heart
                    matter more than anything else. The mask doesn't make the
                    hero—the hero makes the mask.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
