import React, { useState } from "react";
import { readMusic } from "../services/RestApi";

const AudioPlayer = () => {
  const [audioUrl, setAudioUrl] = useState("");

  const fetchAudio = async () => {
    try {
      // Fetch the audio file as a Blob
      const blob = await readMusic(); // Await the promise from readMusic
      const url = URL.createObjectURL(blob);
      setAudioUrl(url); // Set the Blob URL as the audio source
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchAudio}>Load Audio</button>
      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/mp4" />
          Your browser does not support the audio tag.
        </audio>
      )}
    </div>
  );
};

export default AudioPlayer;