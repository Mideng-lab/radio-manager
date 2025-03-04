import React, { useEffect, useState } from "react";
import { db, doc, setDoc, onSnapshot } from "./firebase";

const RADIO_DOC = "radio"; // Firestore document name

function App() {
    const [station, setStation] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.useRef(null);

    // Fetch the latest station from Firebase
useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "stations", "radio"), (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.data();
            console.log("Firestore Update:", data); // Debugging log
            setStation(""); // Force a re-render
            setTimeout(() => setStation(data.url), 100); // Small delay to trigger UI update
            if (audioRef.current) {
                audioRef.current.src = data.url;
                audioRef.current.load();
                audioRef.current.play().catch(err => console.log("Autoplay blocked:", err));
            }
        }
    });

    return () => unsubscribe();
}, []);


    // Function to change the radio station in Firestore
const changeStation = async (newStation) => {
    try {
        await setDoc(doc(db, "stations", "radio"), { 
            url: newStation, 
            playing: true 
        }, { merge: true }); // Merge prevents overwriting other data
        console.log("Station updated in Firestore:", newStation);
    } catch (error) {
        console.error("Error updating station:", error);
    }
};

    // Toggle play/pause
    const togglePlay = async () => {
        const newPlayingState = !isPlaying;
        setIsPlaying(newPlayingState);
        await setDoc(doc(db, "stations", RADIO_DOC), { url: station, playing: newPlayingState });
        if (newPlayingState) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Live Radio</h1>
            <audio ref={audioRef} controls autoPlay>
            <source src={station} type="audio/mpeg" />
            Your browser does not support the audio element.
            </audio>
            <div>
                <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
            </div>
            <div>
                <h3>Select a Radio Station:</h3>
                <button onClick={() => changeStation("http://stream.v2radio.co.uk/V2RadioHQMP3")}>
                    V2 Radio
                </button>
                <button onClick={() => changeStation("https://media-ssl.musicradio.com/Heart90s")}>
                    Heart 90s
                </button>
                <button onClick={() => changeStation("https://media-ssl.musicradio.com/Heart80s")}>
                    Heart 80s
                </button>
            </div>
        </div>
    );
}



export default App;
