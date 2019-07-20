import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  useMemo
} from "react";
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
  isOnceAudio
}) => {
  const [audio, setAudio] = useState(null);
  const [audioDuration, setAudioDuration] = useState("0:00");
  const [currentTime, setCurrentTime] = useState("0:00");
  const [progressValue, setProgressValue] = useState(0);
  const [volumeCount, setVolumeCount] = useState(100);

  const setPlayStatusAudio = () => {
    const newAudio = new Audio(url);

    newAudio.load();
    newAudio.play();

    setAudio(newAudio);
  };

  // When changed audio
  const loadNextAudio = useCallback(() => {
    if (audio) {
      audio.pause();
      setPlayStatusAudio();
      setPlayedStatus(true);
    }
  }, [url]);

  const setDuration = useCallback(() => {
    if (audio && audio.duration) {
      setAudioDuration(fancyTimeFormat(audio.duration));
    }
  }, [audio]);

  const updateCurrentTime = () => {
    if (audio) {
      const value = Math.floor((audio.currentTime / audio.duration) * 100) | 0;

      setCurrentTime(fancyTimeFormat(audio.currentTime));
      setProgressValue(value);
    }
  };

  // After DOM
  useLayoutEffect(() => setPlayStatusAudio(), []);

  // Get next audio
  useEffect(() => loadNextAudio(), [loadNextAudio, url]);

  // Toggle play/pause
  // currentTime checked for not first render
  useEffect(() => {
    if (audioDuration === currentTime && currentTime !== "0:00") {
      setPlayedStatus(false);
    }

    if (audio) {
      setDuration();
      audio.ontimeupdate = () => updateCurrentTime();
    }
  }, [audio, audioDuration, currentTime]);

  const handleValue = e => {
    setVolumeCount(e.target.value);

    // Max audio volume - 1, min - 0
    audio.volume = e.target.value / 100;
  };

  const toggleMuteValue = isMute => {
    const value = isMute ? 0 : 100;

    setVolumeCount(value);
    audio.volume = value / 100;
  };

  const changeValueAudio = e => {
    audio.currentTime = (progressValue * audio.duration) / 100;
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
      <Volumes volumeCount={+volumeCount} toggleMuteValue={toggleMuteValue} />
    ),
    [volumeCount]
  );

  return (
    <AudioControls>
      <audio
        id="audio-player"
        preload="metadata"
        onLoadedMetadata={setDuration}
      >
        <source src={url} type="audio/ogg" />
      </audio>
      {audio && (
        <>
          <Settings>
            {!isOnceAudio && <FaFastBackward onClick={setPrevAudio} />}
            {isPlayed ? (
              <FaPause onClick={() => toggleAudio(true, audio)} />
            ) : (
              <FaPlay onClick={() => toggleAudio(false, audio)} />
            )}
            {!isOnceAudio && <FaFastForward onClick={setNextAudio} />}
          </Settings>
          <ContainerVolumeRange>
            {renderVolumes}
            <VolumeRange
              type="range"
              onChange={handleValue}
              value={volumeCount}
            />
          </ContainerVolumeRange>
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
