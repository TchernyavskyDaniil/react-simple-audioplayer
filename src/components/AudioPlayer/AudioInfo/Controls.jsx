import React, { useCallback, useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { FaFastBackward, FaFastForward, FaPause, FaPlay } from "react-icons/fa";

import { fancyTimeFormat, getPartOfValue } from "../../../utils";

import ProgressAudio from "./ProgressAudio";
import Volumes from "../Volumes";
import {
  audioControlsTypes,
  audioDefaultProps,
  audioPropTypes,
  audioRefTypes
} from "../../../types/AudioType";

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
  position: relative;
  padding: 8px 0;
`;

const VolumeRange = styled.input`
  width: 100px;
`;

const Settings = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100px;
  cursor: pointer;
`;

const ToPrev = styled(FaFastBackward)`
  &:hover {
    color: #656565;
  }
`;

const Pause = styled(FaPause)`
  &:hover {
    color: #656565;
  }
`;

const Play = styled(FaPlay)`
  &:hover {
    color: #656565;
  }
`;

const ToNext = styled(FaFastForward)`
  &:hover {
    color: #656565;
  }
`;

const Controls = ({
  url,
  typeAudio,
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

  const handleValue = useCallback(
    e => {
      setVolumeCount(e.target.value);

      // Max audio volume - 1, min - 0
      if (audioRef.current) {
        audioRef.current.volume = getPartOfValue(e.target.value);
      }
    },
    [audioRef]
  );

  const toggleMuteValue = useCallback(
    isMute => {
      const value = isMute ? 0 : 100;

      setVolumeCount(value);
      audioRef.current.volume = getPartOfValue(value);
    },
    [audioRef]
  );

  const changeValueAudio = e => {
    if (audioRef.current.duration) {
      audioRef.current.currentTime = getPartOfValue(
        progressValue * audioRef.current.duration
      );
    }

    if (!isPlayed || audioRef.current.paused) {
      audioRef.current.load();
      audioRef.current.play();
    }

    setPlayedStatus(true);
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
    [handleValue, toggleMuteValue, volumeCount]
  );

  const renderSettingsAudio = useMemo(
    () => (
      <Settings>
        {!isOnceAudio && <ToPrev onClick={setPrevAudio} />}
        {isPlayed ? (
          <Pause onClick={() => toggleAudio(true)} />
        ) : (
          <Play onClick={() => toggleAudio(false)} />
        )}
        {!isOnceAudio && <ToNext onClick={setNextAudio} />}
      </Settings>
    ),
    [isOnceAudio, setPrevAudio, isPlayed, setNextAudio, toggleAudio]
  );

  return (
    <AudioControls>
      <audio ref={audioRef} id="audio-player" preload="auto">
        <source src={url} type={`audio/${typeAudio}`} />
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
  ...audioDefaultProps
};

Controls.propTypes = {
  ...audioPropTypes,
  ...audioRefTypes,
  ...audioControlsTypes
};

export default Controls;
