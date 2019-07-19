import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from "react";
import styled from "styled-components";
import { FaFastBackward, FaFastForward, FaPause, FaPlay } from "react-icons/fa";

import { fancyTimeFormat } from "../utils";

import ProgressAudio from "./ProgressAudio";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 40%;
`;

const AudioControls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 10px;
`;

const Controls = ({ url, setPrevAudio, setNextAudio }) => {
  const [audio, setAudio] = useState(null);
  const [isPlayed, setPlayedStatus] = useState(false);
  const [audioDuration, setAudioDuration] = useState("0:00");
  const [currentTime, setCurrentTime] = useState("0:00");
  const [progressPercent, setProgressPercent] = useState(0);

  // When changed audio
  const loadNextAudio = useCallback(() => {
    if (audio) {
      setPlayedStatus(false);
      audio.pause();
      audio.load();
    }
  }, [url]);

  const setDuration = useCallback(() => {
    if (audio) {
      setAudioDuration(fancyTimeFormat(audio.duration));
    }
  }, [audio]);

  const updateCurrentTime = () => {
    if (audio) {
      let percent = Math.floor((audio.currentTime / audio.duration) * 100);

      setCurrentTime(fancyTimeFormat(audio.currentTime));
      setProgressPercent(percent);
    }
  };

  // After DOM
  useLayoutEffect(() => {
    setAudio(document.getElementById("audio-player"));
  }, []);

  // Get next audio
  useEffect(() => loadNextAudio(), [loadNextAudio, url]);

  //
  useEffect(() => {
    if (audio) {
      setDuration();
    }
  }, [audioDuration, setDuration]);

  // Toggle play/pause
  useEffect(() => {
    if (audioDuration === currentTime) {
      setPlayedStatus(false);
    }
  }, [audioDuration, currentTime]);

  const handlePlay = () => {
    audio.play();
    setPlayedStatus(true);
  };

  const handlePause = () => {
    audio.pause();
    setPlayedStatus(false);
  };

  return useMemo(
    () => (
      <Container>
        <AudioControls>
          <audio
            id="audio-player"
            preload="metadata"
            onLoadedMetadata={setDuration}
            onTimeUpdate={updateCurrentTime}
          >
            <source src={url} type="audio/ogg" />
          </audio>
          <FaFastBackward onClick={setPrevAudio} />
          {isPlayed ? (
            <FaPause onClick={handlePause} />
          ) : (
            <FaPlay onClick={handlePlay} />
          )}
          <FaFastForward onClick={setNextAudio} />
        </AudioControls>
        <ProgressAudio
          audioDuration={audioDuration}
          currentTime={currentTime}
          progressPercent={progressPercent}
        />
      </Container>
    ),
    [url, isPlayed, audioDuration, currentTime, progressPercent]
  );
};

export default Controls;
