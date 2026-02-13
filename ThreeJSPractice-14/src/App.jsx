import { Environment, Loader, useGLTF } from "@react-three/drei";
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
      position={[-0.5, -14, 0]}
      scale={10}
    />
  );
};

const ThreeElement = ({ modelRef, onModelLoaded }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <Suspense fallback={null}>
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
          "-=0.8"
        );
    }
  }, [modelLoaded]);

  // GSAP scroll animations
  useGSAP(() => {
    if (!modelRef.current || !modelLoaded || !isReady) return;

    scrollTriggersRef.current.forEach((trigger) => trigger.kill());
    scrollTriggersRef.current = [];

    const smoothEase = "power2.inOut";

    // Model animations - Page 1
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
      .to(modelRef.current.position, { z: 1, x: 3, ease: smoothEase })
      .to(modelRef.current.rotation, { y: -3, ease: smoothEase }, 0);

    // Model animations - Page 2
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
      .to(modelRef.current.rotation, { x: 0, ease: smoothEase })
      .to(modelRef.current.position, { x: 0, ease: smoothEase }, 0);

    // Model animations - Page 3
    gsap.to(modelRef.current.rotation, {
      y: 2,
      scrollTrigger: {
        trigger: "#page-2",
        endTrigger: "#page-3",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    // Model animations - Page 4
    gsap.to(modelRef.current.position, {
      x: -2,
      scrollTrigger: {
        trigger: "#page-3",
        endTrigger: "#page-4",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    // Background transitions
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
      .to(backgroundRefs.current[2], { opacity: 1, ease: smoothEase }, 0);

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
      .to(backgroundRefs.current[1], { opacity: 1, ease: smoothEase })
      .to(backgroundRefs.current[2], { opacity: 0, ease: smoothEase }, 0);

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

    // Reveal animations for sections
    gsap.utils.toArray(".reveal-section").forEach((section) => {
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
          style={{ backgroundImage: 'url("/wal.jpg")' }}
          className="bg"
        ></div>
        <div
          ref={(el) => (backgroundRefs.current[1] = el)}
          style={{ backgroundImage: 'url("/wal3.jpg")', opacity: 0 }}
          className="bg"
        ></div>
        <div
          ref={(el) => (backgroundRefs.current[2] = el)}
          style={{ backgroundImage: 'url("/wal4.jpg")', opacity: 0 }}
          className="bg"
        ></div>

        <h1 className="hero-heading" style={{ opacity: 0, transform: 'translateY(30px)' }}>
          Morales
        </h1>

        <div className="abover">
          <Navbar />
          <ThreeElement modelRef={modelRef} onModelLoaded={() => setModelLoaded(true)} />
          <Loader />
        </div>

        <div className="pages">
          <h1 className="hero-heading-front" style={{ opacity: 0, transform: 'translateY(30px)' }}>
            Miles
          </h1>

          {/* PAGE 1 - ORIGIN */}
          <div id="page-1" className="page page-1">
            <div className="page-content reveal-section">
              <div className="text-section parallax-slow">
                <span className="section-label">01 — ORIGIN</span>
                <h2 className="section-title">
                  The New
                  <br />
                  <span className="highlight">Spider-Man</span>
                </h2>
                <p className="section-description">
                  A teenager from Brooklyn, Miles Morales was bitten by a genetically altered spider
                  and gained incredible powers. Mentored by Peter Parker, he learned that with great
                  power comes great responsibility.
                </p>

                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-number">2011</div>
                    <div className="stat-label">First Appearance</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">∞</div>
                    <div className="stat-label">Multiverses</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">13</div>
                    <div className="stat-label">Age</div>
                  </div>
                </div>

                <div className="story-highlights">
                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <div className="highlight-content">
                      <h4>Brooklyn Born</h4>
                      <p>Raised in Brooklyn, New York by his parents Jefferson and Rio Morales</p>
                    </div>
                  </div>

                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                    <div className="highlight-content">
                      <h4>The Bite</h4>
                      <p>Bitten by a radioactive spider during a visit to Oscorp laboratories</p>
                    </div>
                  </div>

                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <div className="highlight-content">
                      <h4>Mentored</h4>
                      <p>Learned from Peter Parker before taking on the Spider-Man mantle</p>
                    </div>
                  </div>
                </div>

                <div className="quote-section">
                  <div className="quote-mark">"</div>
                  <blockquote className="quote-text">
                    Anyone can wear the mask. You could wear the mask. If you didn't know that before, I
                    hope you do now.
                  </blockquote>
                  <p className="quote-author">— Miles Morales</p>
                </div>
              </div>

              <div className="visual-section">
                <div className="floating-card card-1">
                  <div className="card-number">01</div>
                  <div className="card-title">Hero's Journey</div>
                  <div className="card-description">From ordinary student to extraordinary hero</div>
                </div>

                <div className="floating-card card-2">
                  <div className="card-number">02</div>
                  <div className="card-title">Brooklyn's Defender</div>
                  <div className="card-description">Protecting his neighborhood and beyond</div>
                </div>

                <div className="decorative-spider">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="15" fill="#ff0033" opacity="0.3" />
                    <line x1="100" y1="85" x2="100" y2="30" stroke="#ff0033" strokeWidth="2" opacity="0.5" />
                    <line x1="100" y1="115" x2="100" y2="170" stroke="#ff0033" strokeWidth="2" opacity="0.5" />
                    <line x1="85" y1="100" x2="30" y2="100" stroke="#ff0033" strokeWidth="2" opacity="0.5" />
                    <line x1="115" y1="100" x2="170" y2="100" stroke="#ff0033" strokeWidth="2" opacity="0.5" />
                    <line x1="85" y1="85" x2="40" y2="40" stroke="#ff0033" strokeWidth="2" opacity="0.5" />
                    <line x1="115" y1="115" x2="160" y2="160" stroke="#ff0033" strokeWidth="2" opacity="0.5" />
                    <line x1="115" y1="85" x2="160" y2="40" stroke="#ff0033" strokeWidth="2" opacity="0.5" />
                    <line x1="85" y1="115" x2="40" y2="160" stroke="#ff0033" strokeWidth="2" opacity="0.5" />
                  </svg>
                </div>

                <div className="accent-circle"></div>
                <div className="accent-line"></div>
              </div>
            </div>
          </div>

          {/* PAGE 2 - ABILITIES */}
          <div id="page-2" className="page page-2">
            <div className="page-content reveal-section">
              <div className="abilities-section parallax-medium">
                <span className="section-label">02 — ABILITIES</span>
                <h2 className="section-title">
                  Unique
                  <br />
                  <span className="highlight">Powers</span>
                </h2>

                <div className="abilities-grid">
                  <div className="ability-card">
                    <div className="ability-icon">⚡</div>
                    <h3 className="ability-title">Venom Strike</h3>
                    <p className="ability-description">
                      Bio-electric energy blasts that can paralyze enemies on contact
                    </p>
                    <div className="ability-progress">
                      <div className="progress-bar" style={{ width: '95%' }}></div>
                    </div>
                  </div>

                  <div className="ability-card">
                    <div className="ability-icon">👻</div>
                    <h3 className="ability-title">Camouflage</h3>
                    <p className="ability-description">
                      Ability to blend into surroundings, becoming nearly invisible
                    </p>
                    <div className="ability-progress">
                      <div className="progress-bar" style={{ width: '88%' }}></div>
                    </div>
                  </div>

                  <div className="ability-card">
                    <div className="ability-icon">🕷️</div>
                    <h3 className="ability-title">Spider Sense</h3>
                    <p className="ability-description">
                      Enhanced awareness that alerts him to danger before it strikes
                    </p>
                    <div className="ability-progress">
                      <div className="progress-bar" style={{ width: '92%' }}></div>
                    </div>
                  </div>

                  <div className="ability-card">
                    <div className="ability-icon">🕸️</div>
                    <h3 className="ability-title">Web Slinging</h3>
                    <p className="ability-description">
                      Advanced web-shooting technology for traversal and combat
                    </p>
                    <div className="ability-progress">
                      <div className="progress-bar" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PAGE 3 - ENEMIES */}
          <div id="page-3" className="page page-3">
            <div className="page-content reveal-section">
              <div className="enemies-section">
                <span className="section-label">03 — ENEMIES</span>
                <h2 className="section-title">
                  Rogues
                  <br />
                  <span className="highlight">Gallery</span>
                </h2>

                <div className="enemies-grid">
                  <div className="enemy-card">
                    <div className="enemy-header">
                      <div className="enemy-icon">💀</div>
                      <div className="enemy-rank">ARCH NEMESIS</div>
                    </div>
                    <h3 className="enemy-name">The Prowler</h3>
                    <p className="enemy-description">
                      Aaron Davis, Miles' uncle, created a complex relationship between family and duty.
                    </p>
                    <div className="enemy-stats">
                      <div className="stat-mini">
                        <span>Threat Level</span>
                        <div className="threat-bar high"></div>
                      </div>
                    </div>
                  </div>

                  <div className="enemy-card">
                    <div className="enemy-header">
                      <div className="enemy-icon">🎭</div>
                      <div className="enemy-rank">MAJOR THREAT</div>
                    </div>
                    <h3 className="enemy-name">Kingpin</h3>
                    <p className="enemy-description">
                      Wilson Fisk's attempt to access other dimensions put the multiverse at risk.
                    </p>
                    <div className="enemy-stats">
                      <div className="stat-mini">
                        <span>Threat Level</span>
                        <div className="threat-bar extreme"></div>
                      </div>
                    </div>
                  </div>

                  <div className="enemy-card">
                    <div className="enemy-header">
                      <div className="enemy-icon">🦂</div>
                      <div className="enemy-rank">RECURRING FOE</div>
                    </div>
                    <h3 className="enemy-name">Scorpion</h3>
                    <p className="enemy-description">
                      Mac Gargan's enhanced strength and agility make him a formidable adversary.
                    </p>
                    <div className="enemy-stats">
                      <div className="stat-mini">
                        <span>Threat Level</span>
                        <div className="threat-bar medium"></div>
                      </div>
                    </div>
                  </div>

                  <div className="enemy-card">
                    <div className="enemy-header">
                      <div className="enemy-icon">⚡</div>
                      <div className="enemy-rank">SUPER VILLAIN</div>
                    </div>
                    <h3 className="enemy-name">The Spot</h3>
                    <p className="enemy-description">
                      A scientist with portal-creating abilities who seeks revenge across dimensions.
                    </p>
                    <div className="enemy-stats">
                      <div className="stat-mini">
                        <span>Threat Level</span>
                        <div className="threat-bar high"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PAGE 4 - ALLIES */}
          <div id="page-4" className="page page-4">
            <div className="page-content reveal-section">
              <div className="allies-section">
                <span className="section-label">04 — ALLIES</span>
                <h2 className="section-title">
                  Spider
                  <br />
                  <span className="highlight">Team</span>
                </h2>

                <div className="allies-container">
                  <div className="ally-card featured">
                    <div className="ally-badge">MENTOR</div>
                    <div className="ally-avatar">🕷️</div>
                    <h3 className="ally-name">Peter B. Parker</h3>
                    <p className="ally-role">Original Spider-Man</p>
                    <p className="ally-bio">
                      The experienced Spider-Man who mentored Miles and helped him discover his potential.
                    </p>
                    <div className="ally-connection">
                      <span className="connection-strength">Bond Strength:</span>
                      <div className="bond-meter">
                        <div className="bond-fill" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="ally-card">
                    <div className="ally-badge">PARTNER</div>
                    <div className="ally-avatar">🕸️</div>
                    <h3 className="ally-name">Gwen Stacy</h3>
                    <p className="ally-role">Spider-Woman</p>
                    <p className="ally-bio">
                      From another dimension, Gwen brings unique abilities and perspective to the team.
                    </p>
                    <div className="ally-connection">
                      <span className="connection-strength">Bond Strength:</span>
                      <div className="bond-meter">
                        <div className="bond-fill" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="ally-card">
                    <div className="ally-badge">FRIEND</div>
                    <div className="ally-avatar">👊</div>
                    <h3 className="ally-name">Ganke Lee</h3>
                    <p className="ally-role">Best Friend & Tech Support</p>
                    <p className="ally-bio">
                      Miles' roommate and confidant who provides crucial tech support and moral guidance.
                    </p>
                    <div className="ally-connection">
                      <span className="connection-strength">Bond Strength:</span>
                      <div className="bond-meter">
                        <div className="bond-fill" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="ally-card">
                    <div className="ally-badge">FAMILY</div>
                    <div className="ally-avatar">❤️</div>
                    <h3 className="ally-name">Rio & Jefferson</h3>
                    <p className="ally-role">Parents</p>
                    <p className="ally-bio">
                      His loving parents who support him even when they don't know his secret identity.
                    </p>
                    <div className="ally-connection">
                      <span className="connection-strength">Bond Strength:</span>
                      <div className="bond-meter">
                        <div className="bond-fill" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PAGE 5 - MULTIVERSE */}
          <div id="page-5" className="page page-5">
            <div className="page-content reveal-section">
              <div className="multiverse-section">
                <span className="section-label">05 — MULTIVERSE</span>
                <h2 className="section-title">
                  Across The
                  <br />
                  <span className="highlight">Spider-Verse</span>
                </h2>

                <div className="multiverse-grid">
                  <div className="dimension-card">
                    <div className="dimension-number">Earth-1610</div>
                    <h3 className="dimension-title">Home Dimension</h3>
                    <p className="dimension-description">
                      Miles' original universe where he became Spider-Man and faced Kingpin's collider.
                    </p>
                    <div className="dimension-status active">Active</div>
                  </div>

                  <div className="dimension-card">
                    <div className="dimension-number">Earth-616</div>
                    <h3 className="dimension-title">Prime Universe</h3>
                    <p className="dimension-description">
                      The main Marvel Universe where Peter Parker originated and many adventures unfold.
                    </p>
                    <div className="dimension-status visited">Visited</div>
                  </div>

                  <div className="dimension-card">
                    <div className="dimension-number">Earth-65</div>
                    <h3 className="dimension-title">Gwen's World</h3>
                    <p className="dimension-description">
                      Home to Spider-Gwen, where Gwen Stacy was bitten instead of Peter Parker.
                    </p>
                    <div className="dimension-status visited">Visited</div>
                  </div>

                  <div className="dimension-card">
                    <div className="dimension-number">∞</div>
                    <h3 className="dimension-title">Infinite Possibilities</h3>
                    <p className="dimension-description">
                      Countless universes with different Spider-People protecting their worlds.
                    </p>
                    <div className="dimension-status unexplored">Unexplored</div>
                  </div>
                </div>

                <div className="multiverse-quote">
                  <p>"In every universe, someone becomes Spider-Man. In this one, it's me."</p>
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
                      <p>Miles Morales debuts in Ultimate Fallout #4, introducing a new Spider-Man.</p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-year">2018</div>
                      <h3>Into the Spider-Verse</h3>
                      <p>The groundbreaking animated film brings Miles to mainstream audiences worldwide.</p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-year">2023</div>
                      <h3>Across the Spider-Verse</h3>
                      <p>Miles' journey continues across dimensions in the epic sequel.</p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-year">Beyond</div>
                      <h3>The Future</h3>
                      <p>New adventures await as Miles continues to define what it means to be Spider-Man.</p>
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
                    Miles Morales proved that heroes come in all forms. His story reminds us that courage,
                    responsibility, and heart matter more than anything else. The mask doesn't make the
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