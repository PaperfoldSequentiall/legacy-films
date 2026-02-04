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

  /* -------- LOADER (5s) -------- */

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);

      const v = videoRef.current;
      if (v) {
        v.playbackRate = 0.85;
        v.muted = false; // sound ON
        v.play().catch(() => {});
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  /* -------- CHANGE VIDEO ON LANGUAGE SWITCH -------- */

  useEffect(() => {
    const v = videoRef.current;
    if (!v || loading) return;

    v.pause();
    v.load();
    v.play().catch(() => {});
  }, [lang, loading]);

  return (
    <section className="section hero">

      {/* Video */}
      <video
        ref={videoRef}
        src={HERO_VIDEOS[lang]}
        playsInline
        preload="auto"
        muted={false}
        onEnded={() => {
          setEnded(true);
          onEnd();
        }}
      />

      {/* Language Switch */}
      {!loading && !ended && (
        <div className="hero-lang">

          <button
            onClick={() =>
              setLang((p) => (p === "en" ? "hi" : "en"))
            }
          >
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

      {/* Black Overlay After End */}
      {ended && !loading && (
        <div className="hero-overlay">
          <p className="scroll-text">Scroll Down ↓</p>
        </div>
      )}

    </section>
  );
}

export default HeroVideo;
