import React, { useState } from "react";
import { readMusic } from "../services/RestApi";
import AudioHeader from "./AudioHeader";
import AudioPlaylist from "./AudioPlaylist";
import AudioPlayerState from "./context/AudioPlayerState";

const AudioPlayerMain = () => {
    return (
        <AudioPlayerState>
            <AudioHeader/>
            <AudioPlaylist />
        </AudioPlayerState>
    );
};

export default AudioPlayerMain;