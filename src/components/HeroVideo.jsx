import { useEffect, useRef, useState } from "react";

// Hero Videos
const HERO_VIDEOS = {
  en: "https://res.cloudinary.com/djhfark2q/video/upload/v1770120742/en_01_vurigj.mp4",
  hi: "https://res.cloudinary.com/djhfark2q/video/upload/v1770121308/hi_01_hmbo5b.mp4",
};

function HeroVideo({ onEnd }) {
  const videoRef = useRef(null);

  const [ended, setEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("en");

  const [soundUnlocked, setSoundUnlocked] = useState(false);

  /* -------- LOADER -------- */

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      tryPlay();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  /* -------- TRY PLAY -------- */

  const tryPlay = () => {
    const v = videoRef.current;
    if (!v) return;

    v.playbackRate = 0.85;

    // Always start muted
    v.muted = !soundUnlocked;

    v.play().catch(() => {
      // Autoplay blocked
    });
  };

  /* -------- ON LANGUAGE CHANGE -------- */

  useEffect(() => {
    if (!loading) {
      tryPlay();
    }
  }, [lang, loading, soundUnlocked]);

  /* -------- UNLOCK SOUND -------- */

  const enableSound = () => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = false;
    v.play();

    setSoundUnlocked(true);
  };

  return (
    <section className="section hero" onClick={!soundUnlocked ? enableSound : undefined}>

      {/* Video */}
      <video
        ref={videoRef}
        src={HERO_VIDEOS[lang]}
        playsInline
        preload="auto"
        muted={!soundUnlocked}
        onEnded={() => {
          setEnded(true);
          onEnd();
        }}
      />

      {/* Click To Enable Sound */}
      {!soundUnlocked && !loading && !ended && (
        <div className="hero-overlay">
          <p className="scroll-text">
            Tap to Start 🔊
          </p>
        </div>
      )}

      {/* Language Switch */}
      {!loading && !ended && (
        <div className="hero-lang">
          <button onClick={() => setLang((p) => (p === "en" ? "hi" : "en"))}>
            {lang === "en" ? "हिंदी" : "EN"}
          </button>
        </div>
      )}

      {/* Loader */}
      {loading && (
        <div className="loader-screen">
          <div className="loader-ring"></div>
          <p className="loader-text">Loading Experience...</p>
        </div>
      )}

      {/* End Overlay */}
      {ended && !loading && (
        <div className="hero-overlay">
          <p className="scroll-text">Scroll Down ↓</p>
        </div>
      )}

    </section>
  );
}

export default HeroVideo;
