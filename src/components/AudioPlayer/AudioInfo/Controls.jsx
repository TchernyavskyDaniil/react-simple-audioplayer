import React, { useCallback, useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { FaFastBackward, FaFastForward, FaPause, FaPlay } from "react-icons/fa";
import PT from "prop-types";

import { fancyTimeFormat } from "../../../utils";

import ProgressAudio from "./ProgressAudio";
import Volumes from "../Volumes";

const AudioControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
  margin: 20px;
`;

const ContainerVolumeRange = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 0;
`;

const VolumeRange = styled.input`
  width: 100px;
`;

const Settings = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100px;
`;

const Controls = ({
  url,
  setPrevAudio,
  setNextAudio,
  toggleAudio,
  isPlayed,
  setPlayedStatus,
  isOnceAudio,
  audioRef
}) => {
  const [audioDuration, setAudioDuration] = useState("0:00");
  const [currentTime, setCurrentTime] = useState("0:00");
  const [progressValue, setProgressValue] = useState(0);
  const [volumeCount, setVolumeCount] = useState(100);

  // When changed audio
  const loadNextAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();

      setPlayedStatus(true);
    }
  }, [url]);

  const setDuration = useCallback(() => {
    if (audioRef.current.duration) {
      setAudioDuration(fancyTimeFormat(audioRef.current.duration));
    }
  }, [audioRef.current]);

  const updateCurrentTime = () => {
    if (audioRef.current) {
      const value =
        Math.floor(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        ) | 0;

      setCurrentTime(fancyTimeFormat(audioRef.current.currentTime));
      setProgressValue(value);
    }
  };

  // Get next audio
  useEffect(() => loadNextAudio(), [loadNextAudio, url]);

  // Toggle play/pause
  // currentTime checked for not first render
  useEffect(() => {
    if (audioDuration === currentTime && currentTime !== "0:00") {
      setPlayedStatus(false);
    }

    if (audioRef.current) {
      setDuration();
      audioRef.current.ontimeupdate = () => updateCurrentTime();
    }
  }, [audioRef.current, audioDuration, currentTime]);

  const handleValue = e => {
    setVolumeCount(e.target.value);

    // Max audio volume - 1, min - 0
    if (audioRef.current) {
      audioRef.current.volume = e.target.value / 100;
    }
  };

  const toggleMuteValue = isMute => {
    const value = isMute ? 0 : 100;

    setVolumeCount(value);
    audioRef.current.volume = value / 100;
  };

  const changeValueAudio = e => {
    audioRef.current.currentTime =
      (progressValue * audioRef.current.duration) / 100;
    setProgressValue(+e.target.value);
  };

  const renderProgressAudio = useMemo(
    () => (
      <ProgressAudio
        audioDuration={audioDuration}
        currentTime={currentTime}
        progressValue={progressValue}
        changeValueAudio={changeValueAudio}
      />
    ),
    [audioDuration, currentTime, progressValue]
  );

  // Because render Progress Audio every second update value
  const renderVolumes = useMemo(
    () => (
      <>
        <Volumes volumeCount={+volumeCount} toggleMuteValue={toggleMuteValue} />
        <VolumeRange type="range" onChange={handleValue} value={volumeCount} />
      </>
    ),
    [volumeCount]
  );

  const renderSettingsAudio = useMemo(
    () => (
      <Settings>
        {!isOnceAudio && <FaFastBackward onClick={setPrevAudio} />}
        {isPlayed ? (
          <FaPause onClick={() => toggleAudio(true, audioRef.current)} />
        ) : (
          <FaPlay onClick={() => toggleAudio(false, audioRef.current)} />
        )}
        {!isOnceAudio && <FaFastForward onClick={setNextAudio} />}
      </Settings>
    ),
    [
      isOnceAudio,
      setPrevAudio,
      isPlayed,
      setNextAudio,
      toggleAudio,
      audioRef.current
    ]
  );

  return (
    <AudioControls>
      <audio ref={audioRef} id="audio-player" preload="auto">
        <source src={url} type="audio/mp3" />
      </audio>
      {audioRef.current && (
        <>
          {renderSettingsAudio}
          <ContainerVolumeRange>{renderVolumes}</ContainerVolumeRange>
          {renderProgressAudio}
        </>
      )}
    </AudioControls>
  );
};

Controls.defaultProps = {
  url: ""
};

Controls.propTypes = {
  url: PT.string,
  setPrevAudio: PT.func,
  setNextAudio: PT.func
};

export default Controls;
