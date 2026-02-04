import { useRef, useState, useEffect } from "react";

import HeroVideo from "./components/HeroVideo";
import Playlist from "./components/Playlist";
import FinalVideo from "./components/FinalVideo";

import "./index.css";
import Deliverables from "./components/Deliverables";

function App() {
	const playlistRef = useRef(null);
	const comingRef = useRef(null);
	const finalRef = useRef(null);

	const [heroDone, setHeroDone] = useState(false);

	useEffect(() => {
		document.body.style.overflow = heroDone ? "auto" : "hidden";
	}, [heroDone]);

	useEffect(() => {
		if (!heroDone) return;

		const onWheel = (e) => {
			if (e.deltaY > 0) {
				playlistRef.current.scrollIntoView({
					behavior: "smooth",
				});

				window.removeEventListener("wheel", onWheel);
			}
		};

		window.addEventListener("wheel", onWheel);

		return () => window.removeEventListener("wheel", onWheel);
	}, [heroDone]);

	return (
		<>
			{/* HERO */}
			<HeroVideo onEnd={() => setHeroDone(true)} />

			{/* PLAYLIST */}
			<div ref={playlistRef} className='section'>
				<Playlist />
			</div>

			<div ref={comingRef}>
				<Deliverables />
			</div>

			{/* FINAL */}
			<div ref={finalRef} className='section'>
				<FinalVideo />
			</div>
		</>
	);
}

export default App;
