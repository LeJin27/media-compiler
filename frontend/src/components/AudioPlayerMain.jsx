import React, { useState } from "react";
import { readMusic } from "../services/RestApi";
import AudioHeader from "./AudioHeader";
import AudioPlaylist from "./AudioPlaylist/AudioPlaylist";
import AudioPlayerState from "./context/AudioPlayerState";
import AudioControls from "./AudioControls/AudioControls";

const AudioPlayerMain = () => {
    return (
        <div className="relative">
            <AudioPlayerState>
                <AudioHeader/>
                <AudioPlaylist />
                <AudioControls/>
            </AudioPlayerState>
        </div>
    );
};

export default AudioPlayerMain;