import { Environment, Loader, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import Navbar from "./components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { Suspense, useEffect, useRef, useState } from "react";
gsap.registerPlugin(ScrollTrigger, useGSAP);
import Lenis from "lenis";

const Model = ({ modelRef, onModelLoaded }) => {
  const model = useGLTF("/Miles.glb");
  const [hasNotified, setHasNotified] = useState(false);

  useFrame(() => {
    if (modelRef.current && !hasNotified) {
      onModelLoaded();
      setHasNotified(true);
    }
  });

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
    <Canvas>
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
  const bgRef = useRef(null)
  const bgRef2 = useRef(null)
  const bgRef3 = useRef(null)
  const [ModelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
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


  useGSAP(() => {
    if (!modelRef.current || !ModelLoaded) return;

    gsap.to(
      modelRef.current.position,
      {
        z: 2,
        x: 3,
        scrollTrigger: {
          trigger: "nav",
          endTrigger: "#page-1",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      },
      "a",
    );
    gsap.to(
      modelRef.current.rotation,
      {
        y: -3,
        scrollTrigger: {
          trigger: "nav",
          endTrigger: "#page-1",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      },
      "a",
    );
    gsap.to(
      modelRef.current.rotation,
      {
        y: 0,
        scrollTrigger: {
          trigger: "#page-1",
          endTrigger: "#page-2",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      },
      "b",
    );
    gsap.to(
      modelRef.current.position,
      {
        z: -2,
        scrollTrigger: {
          trigger: "#page-1",
          endTrigger: "#page-2",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      },
      "b",
    );
    gsap.to(bgRef.current,{
      opacity:0,
      scrollTrigger:{
        trigger:'nav',
        start:'top top',
        endTrigger:'#page-1',
        end:'bottom bottom',
        scrub:true,
      }
    },"c")
    gsap.to(bgRef3.current,{
      opacity:1,
      scrollTrigger:{
        trigger:'nav',
        start:'top top',
        endTrigger:'#page-1',
        end:'bottom bottom',
        scrub:true,
      }
    },"c")
     gsap.to(bgRef2.current,{
      opacity:1,
      scrollTrigger:{
        trigger:'#page-1',
        start:'top top',
        endTrigger:'#page-2',
        end:'bottom bottom',
        scrub:true,
      }
    },"d")
     gsap.to(bgRef3.current,{
      opacity:0,
      scrollTrigger:{
        trigger:'#page-1',
        start:'bottom top',
        endTrigger:'#page-2',
        end:'bottom bottom',
        scrub:true,
      }
    },"d")
  }, [ModelLoaded]);

  return (
    <>
      <main>
        <div
        ref={bgRef}
          style={{
            backgroundImage: 'url("/wal.jpg")',
          }}
          className="bg"
        ></div>
        <div
        ref={bgRef2}
          style={{
            backgroundImage: 'url("/wal3.jpg")',
          }}
          className="bg"
        ></div>
        <div
        ref={bgRef3}
          style={{
            backgroundImage: 'url("/wal4.jpg")',
          }}
          className="bg"
        ></div>
        <h1 className="hero-heading">Morales </h1>
        <div className="abover">
          <Navbar />
          <ThreeElement
            modelRef={modelRef}
            onModelLoaded={() => setModelLoaded(true)}
          />
          <Loader />
        </div>
        <div className="pages">
          <h1 className="hero-heading-front">Miles </h1>
          <div id="page-1" className="page page-1">
            <div className="page-content">
              <div className="text-section">
                <span className="section-label">01 — ORIGIN</span>
                <h2 className="section-title">
                  The New
                  <br />
                  <span className="highlight">Spider-Man</span>
                </h2>
                <p className="section-description">
                  A teenager from Brooklyn, Miles Morales was bitten by a
                  genetically altered spider and gained incredible powers.
                  Mentored by Peter Parker, he learned that with great power
                  comes great responsibility.
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
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <div className="highlight-content">
                      <h4>Brooklyn Born</h4>
                      <p>
                        Raised in Brooklyn, New York by his parents Jefferson
                        and Rio Morales
                      </p>
                    </div>
                  </div>

                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                    <div className="highlight-content">
                      <h4>The Bite</h4>
                      <p>
                        Bitten by a radioactive spider during a visit to Oscorp
                        laboratories
                      </p>
                    </div>
                  </div>

                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <div className="highlight-content">
                      <h4>Mentored</h4>
                      <p>
                        Learned from Peter Parker before taking on the
                        Spider-Man mantle
                      </p>
                    </div>
                  </div>
                </div>

                <div className="quote-section">
                  <div className="quote-mark">"</div>
                  <blockquote className="quote-text">
                    Anyone can wear the mask. You could wear the mask. If you
                    didn't know that before, I hope you do now.
                  </blockquote>
                  <p className="quote-author">— Miles Morales</p>
                </div>
              </div>

              <div className="visual-section">
                <div className="floating-card card-1">
                  <div className="card-number">01</div>
                  <div className="card-title">Hero's Journey</div>
                  <div className="card-description">
                    From ordinary student to extraordinary hero
                  </div>
                </div>

                <div className="floating-card card-2">
                  <div className="card-number">02</div>
                  <div className="card-title">Brooklyn's Defender</div>
                  <div className="card-description">
                    Protecting his neighborhood and beyond
                  </div>
                </div>

                <div className="decorative-spider">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle
                      cx="100"
                      cy="100"
                      r="15"
                      fill="#ff0033"
                      opacity="0.3"
                    />
                    <line
                      x1="100"
                      y1="85"
                      x2="100"
                      y2="30"
                      stroke="#ff0033"
                      strokeWidth="2"
                      opacity="0.5"
                    />
                    <line
                      x1="100"
                      y1="115"
                      x2="100"
                      y2="170"
                      stroke="#ff0033"
                      strokeWidth="2"
                      opacity="0.5"
                    />
                    <line
                      x1="85"
                      y1="100"
                      x2="30"
                      y2="100"
                      stroke="#ff0033"
                      strokeWidth="2"
                      opacity="0.5"
                    />
                    <line
                      x1="115"
                      y1="100"
                      x2="170"
                      y2="100"
                      stroke="#ff0033"
                      strokeWidth="2"
                      opacity="0.5"
                    />
                    <line
                      x1="85"
                      y1="85"
                      x2="40"
                      y2="40"
                      stroke="#ff0033"
                      strokeWidth="2"
                      opacity="0.5"
                    />
                    <line
                      x1="115"
                      y1="115"
                      x2="160"
                      y2="160"
                      stroke="#ff0033"
                      strokeWidth="2"
                      opacity="0.5"
                    />
                    <line
                      x1="115"
                      y1="85"
                      x2="160"
                      y2="40"
                      stroke="#ff0033"
                      strokeWidth="2"
                      opacity="0.5"
                    />
                    <line
                      x1="85"
                      y1="115"
                      x2="40"
                      y2="160"
                      stroke="#ff0033"
                      strokeWidth="2"
                      opacity="0.5"
                    />
                  </svg>
                </div>

                <div className="accent-circle"></div>
                <div className="accent-line"></div>
              </div>
            </div>
          </div>
          <div id="page-2" className="page">
            <div className="page-content">
              <div className="abilities-section">
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
                      Bio-electric energy blasts that can paralyze enemies on
                      contact
                    </p>
                  </div>

                  <div className="ability-card">
                    <div className="ability-icon">👻</div>
                    <h3 className="ability-title">Camouflage</h3>
                    <p className="ability-description">
                      Ability to blend into surroundings, becoming nearly
                      invisible
                    </p>
                  </div>

                  <div className="ability-card">
                    <div className="ability-icon">🕷️</div>
                    <h3 className="ability-title">Spider Sense</h3>
                    <p className="ability-description">
                      Enhanced awareness that alerts him to danger before it
                      strikes
                    </p>
                  </div>

                  <div className="ability-card">
                    <div className="ability-icon">🕸️</div>
                    <h3 className="ability-title">Web Slinging</h3>
                    <p className="ability-description">
                      Advanced web-shooting technology for traversal and combat
                    </p>
                  </div>
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
