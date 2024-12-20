import React, { useState } from "react";
import { readMusic } from "../services/RestApi";
import AudioHeader from "./AudioHeader";

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
      <div className="flex-col">
        <AudioHeader/>




      </div>

    </div>
  );
};

export default AudioPlayer;