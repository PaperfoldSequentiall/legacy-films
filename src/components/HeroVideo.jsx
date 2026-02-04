import { useEffect, useRef, useState } from "react";

const HERO_VIDEO =
  "https://res.cloudinary.com/djhfark2q/video/upload/v1770120742/en_01_vurigj.mp4";

function HeroVideo({ onEnd }) {
  const videoRef = useRef(null);

  const [ended, setEnded] = useState(false);
  const [loading, setLoading] = useState(true);

  /* -------- LOADER (10s) -------- */

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);

      const v = videoRef.current;
      if (v) {
        v.playbackRate = 0.85;
        v.play();
      }
    }, 5000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="section hero">

      {/* Video */}
      <video
        ref={videoRef}
        src={HERO_VIDEO}
        muted
        playsInline
        preload="auto"
        onEnded={() => {
          setEnded(true);
          onEnd();
        }}
      />

      {/* Loader */}
      {loading && (
        <div className="loader-screen">

          <div className="loader-ring"></div>

          <p className="loader-text">
            Loading Experience...
          </p>

        </div>
      )}

      {/* Black Overlay After End */}
      {ended && !loading && (
        <div className="hero-overlay">
          <p className="scroll-text">
            Scroll Down ↓
          </p>
        </div>
      )}

    </section>
  );
}

export default HeroVideo;
