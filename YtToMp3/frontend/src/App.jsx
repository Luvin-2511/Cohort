import { useState, useEffect, useRef } from "react";
import axios from "axios";

const MARQUEE_ITEMS = [
  "YOUTUBE → MP3",
  "FREE",
  "INSTANT DOWNLOAD",
  "NO SIGN UP",
  "HIGH QUALITY",
  "YOUTUBE → MP3",
  "FREE",
  "INSTANT DOWNLOAD",
  "NO SIGN UP",
  "HIGH QUALITY",
];

const STEPS = [
  {
    num: "01",
    title: "Paste the link",
    desc: "Drop any YouTube URL into the input field.",
  },
  {
    num: "02",
    title: "Fetch details",
    desc: "We grab the title, thumbnail & duration instantly.",
  },
  {
    num: "03",
    title: "Download MP3",
    desc: "One click. Your audio is ready in seconds.",
  },
];

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [glitch, setGlitch] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const inputRef = useRef(null);
  const resultRef = useRef(null);
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/info?url=${encodeURIComponent(url)}`,
      );
      setShowResult(response.data.videoDetail);
      setTimeout(
        () =>
          resultRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          }),
        50,
      );
    } catch (err) {
      setShowError(err);
    } finally {
      setLoading(false);
      console.log(showResult);
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      window.location.href = `${BASE_URL}/api/convert?url=${encodeURIComponent(url)}`;
      setTimeout(() => setDownloading(false), 4000);
    }, 100);
  };

  return (
    <div className="hp">
      <div className="hp__grid" aria-hidden="true" />
      <div className="hp__noise" aria-hidden="true" />

      <nav className="hp__nav">
        <span className="hp__logo">
          YT<span className="hp__logo-accent">—</span>MP3
        </span>
        <div className="hp__nav-links">
          <a href="#how">How it works</a>
          <a href="#convert" className="hp__nav-cta">
            Convert now
          </a>
        </div>
      </nav>

      <section className="hp__hero" id="convert">
        <div className="hp__hero-eyebrow">
          <span className="hp__dot" />
          Free · No account · Unlimited
        </div>

        <h1 className={`hp__headline ${glitch ? "hp__headline--glitch" : ""}`}>
          <span className="hp__headline-line">YouTube</span>
          <span className="hp__headline-line hp__headline-line--accent">
            to MP3
          </span>
          <span className="hp__headline-line hp__headline-line--outline">
            in seconds.
          </span>
        </h1>

        <p className="hp__sub">
          Paste a link. Get your audio. No fluff, no ads, no friction.
        </p>

        <form onSubmit={handleSubmit} className="hp__form">
          <div className="hp__input-wrap">
            <span className="hp__input-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </span>
            <input
              ref={inputRef}
              type="url"
              className="hp__input"
              placeholder="https://youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              spellCheck={false}
            />
          </div>
          <button type="submit" className="hp__btn" disabled={loading}>
            {loading ? (
              <span className="hp__spinner" />
            ) : (
              <>
                <span>Convert</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="hp__hint">
          Supports youtube.com &amp; youtu.be links
        </div>

        {showError && (
          <div className="hp__error">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Couldn't fetch video. Check the URL and try again.
          </div>
        )}

        {showResult && (
          <div ref={resultRef} className="hp__result">
            <button
              className="hp__result-close"
              onClick={() => setShowResult(false)}
              aria-label="Close"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="hp__result-inner">
              <div className="hp__result-thumb-wrap">
                <img
                  className="hp__result-thumb"
                  src={showResult.thumbnail}
                  alt={showResult.title}
                />
                <div className="hp__result-duration">{showResult.duration}</div>
              </div>

              <div className="hp__result-body">
                <div className="hp__result-tag">
                  <span className="hp__dot hp__dot--sm" />
                  Ready to convert
                </div>
                <h2 className="hp__result-title">{showResult.title}</h2>
                <div className="hp__result-meta">
                  <span className="hp__result-meta-item">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {showResult.duration}
                  </span>
                  <span className="hp__result-meta-sep">·</span>
                  <span className="hp__result-meta-item">MP3</span>
                  <span className="hp__result-meta-sep">·</span>
                  <span className="hp__result-meta-item">High quality</span>
                </div>

                <button
                  className="hp__btn hp__btn--download"
                  disabled={downloading}
                  onClick={handleDownload}
                >
                  {downloading ? (
                    <>
                      <span className="hp__spinner hp__spinner--dark" />
                      <span>Preparing...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <span>Download MP3</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="hp__demo-btns">
          <button
            className="hp__demo-btn"
            onClick={() => {
              setShowResult(true);
              setShowError(false);
            }}
          >
            Preview: result card
          </button>
          <button
            className="hp__demo-btn hp__demo-btn--err"
            onClick={() => {
              setShowError(true);
              setShowResult(false);
            }}
          >
            Preview: error state
          </button>
          <button
            className="hp__demo-btn"
            onClick={() => setDownloading((d) => !d)}
          >
            Toggle: downloading
          </button>
          <button
            className="hp__demo-btn"
            onClick={() => setLoading((d) => !d)}
          >
            Toggle: loading
          </button>
        </div>
      </section>

      <div className="hp__marquee-wrap" aria-hidden="true">
        <div className="hp__marquee">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="hp__marquee-item">
              {item} <span className="hp__marquee-sep">✦</span>
            </span>
          ))}
        </div>
      </div>

      <section className="hp__steps" id="how">
        <div className="hp__steps-label">HOW IT WORKS</div>
        <div className="hp__steps-grid">
          {STEPS.map((step) => (
            <div className="hp__step" key={step.num}>
              <div className="hp__step-num">{step.num}</div>
              <div className="hp__step-body">
                <h3 className="hp__step-title">{step.title}</h3>
                <p className="hp__step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="hp__bottom-cta">
        <div className="hp__bottom-cta-inner">
          <span className="hp__bottom-cta-label">Ready?</span>
          <h2 className="hp__bottom-cta-heading">
            Stop streaming.
            <br />
            Start owning.
          </h2>
          <a href="#convert" className="hp__btn hp__btn--large">
            <span>Convert a video</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </section>

      <footer className="hp__footer">
        <span className="hp__logo">
          YT<span className="hp__logo-accent">—</span>MP3
        </span>
        <span className="hp__footer-copy">
          For personal use only. Respect copyright laws.
        </span>
      </footer>
    </div>
  );
}
