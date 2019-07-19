import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState
} from "react";
import styled from "styled-components";
import { FaFastBackward, FaFastForward, FaPause, FaPlay } from "react-icons/fa";
import PT from "prop-types";

import { fancyTimeFormat } from "../../utils";

import ProgressAudio from "./ProgressAudio";
import Volumes from "../Volumes";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 40%;
`;

const AudioControls = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;

const ContainerVolumeRange = styled.div``;

const VolumeRange = styled.input``;

const Settings = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Controls = ({ url, setPrevAudio, setNextAudio }) => {
  const [audio, setAudio] = useState(null);
  const [isPlayed, setPlayedStatus] = useState(false);
  const [audioDuration, setAudioDuration] = useState("0:00");
  const [currentTime, setCurrentTime] = useState("0:00");
  const [progressValue, setProgressValue] = useState(0);
  const [volumeCount, setVolumeCount] = useState(100);
  const [isChangedRange, setIsChangedRange] = useState(false);

  // When changed audio
  const loadNextAudio = useCallback(() => {
    if (audio) {
      setPlayedStatus(false);
      audio.pause();
      audio.load();
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

      if (!isChangedRange) {
        setCurrentTime(fancyTimeFormat(audio.currentTime));
        setProgressValue(value);
      }
    }
  };

  // After DOM
  useLayoutEffect(() => {
    setAudio(document.getElementById("audio-player"));
  }, []);

  // Get next audio
  useEffect(() => loadNextAudio(), [loadNextAudio, url]);

  useEffect(() => {
    if (audio && audio.duration) {
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
    // Audio have onTimeUpdate, need to stop generate value 0;
    setIsChangedRange(true);

    audio.currentTime = (progressValue * audio.duration) / 100;
    setProgressValue(+e.target.value);

    setTimeout(() => setIsChangedRange(false), 100);
  };

  return (
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
        {audio && (
          <>
            <Settings>
              <FaFastBackward onClick={setPrevAudio} />
              {isPlayed ? (
                <FaPause onClick={handlePause} />
              ) : (
                <FaPlay onClick={handlePlay} />
              )}
              <FaFastForward onClick={setNextAudio} />
            </Settings>
            <ContainerVolumeRange>
              <Volumes
                volumeCount={+volumeCount}
                toggleMuteValue={toggleMuteValue}
              />
              <VolumeRange
                type="range"
                onChange={handleValue}
                value={volumeCount}
              />
            </ContainerVolumeRange>
            <ProgressAudio
              audioDuration={audioDuration}
              currentTime={currentTime}
              progressValue={progressValue}
              changeValueAudio={changeValueAudio}
            />
          </>
        )}
      </AudioControls>
    </Container>
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
