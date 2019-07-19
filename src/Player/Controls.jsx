import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import {
  FaFastForward,
  FaFastBackward,
  FaPlay,
  FaPause,
  FaStop
} from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 10px 40%;
`;

const Controls = ({ url, setPrevAudio, setNextAudio }) => {
  const [audio, setAudio] = useState(null);
  const [isPlayed, setPlayedStatus] = useState(false);

  // After DOM
  useLayoutEffect(() => {
    setAudio(document.getElementById("audio-player"));
  }, []);

  // Get next audio
  useEffect(() => loadNextAudio(), [url]);

  const handlePlay = () => {
    audio.play();
    setPlayedStatus(true);
  };

  const handlePause = () => {
    audio.pause();
    setPlayedStatus(false);
  };

  const loadNextAudio = () => {
    if (audio) {
      setPlayedStatus(false);
      audio.pause();
      audio.load();
    }
  };

  return (
    <Container>
      <audio id="audio-player" preload="metadata">
        <source
          src={url}
          type="audio/ogg"
        />
      </audio>
      <FaFastBackward onClick={setPrevAudio} />
      {isPlayed ? (
        <FaPause onClick={handlePause} />
      ) : (
        <FaPlay onClick={handlePlay} />
      )}
      <FaFastForward onClick={setNextAudio} />
    </Container>
  );
};

export default Controls;
