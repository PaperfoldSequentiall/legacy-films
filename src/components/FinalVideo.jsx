import { useRef, useState, useEffect } from "react";
import { englishVideos, hindiVideos } from "../data/videos";
import { isSoundUnlocked, unlockSound } from "../utils/sound";

function FinalVideo() {
  const videoRef = useRef(null);

  const [lang, setLang] = useState("en");
  const [muted, setMuted] = useState(!isSoundUnlocked());
  const [show, setShow] = useState(false);
  const [soundReady, setSoundReady] = useState(isSoundUnlocked());

  const list = lang === "en" ? englishVideos : hindiVideos;

  /* --------- AUTOPLAY + PAUSE ON VIEW --------- */

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [lang]);

  /* --------- ENABLE SOUND ONCE --------- */

  const enableSound = () => {
    if (soundReady) return; // already unlocked

    unlockSound();

    setSoundReady(true);
    setMuted(false);

    const video = videoRef.current;
    video.muted = false;
    video.play();
  };

  return (
    <section
      className="section playlist"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={enableSound}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={list[21]}
        playsInline
        muted={!soundReady}
        preload="auto"
      />

      {/* Sound Unlock Overlay */}
      {!soundReady && (
        <div className="hero-overlay">
          <p className="scroll-text">
            Click Once to Enable Sound 🔊
          </p>
        </div>
      )}

      {/* Controls */}
      {show && soundReady && (
        <div
          className="controls"
          onClick={(e) => e.stopPropagation()} // <-- IMPORTANT
        >

          <button onClick={() => videoRef.current.play()}>
            ▶
          </button>

          <button onClick={() => videoRef.current.pause()}>
            ⏸
          </button>

          <button
            onClick={() => {
              setMuted((m) => !m);
              videoRef.current.muted = !muted;
            }}
          >
            {muted ? "🔇" : "🔊"}
          </button>

          <button
            onClick={() =>
              setLang((p) => (p === "en" ? "hi" : "en"))
            }
          >
            🌐
          </button>

        </div>
      )}
    </section>
  );
}

export default FinalVideo;
