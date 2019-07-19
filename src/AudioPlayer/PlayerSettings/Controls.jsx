import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from "react";
import styled from "styled-components";
import { FaFastBackward, FaFastForward, FaPause, FaPlay, FaVolumeUp, FaVolumeDown, FaVolumeOff } from "react-icons/fa";

import { fancyTimeFormat } from "../../utils";

import ProgressAudio from "./ProgressAudio";

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

const Volumes = styled.div`
  min-height: 25px;
`;

const Controls = ({ url, setPrevAudio, setNextAudio }) => {
  const [audio, setAudio] = useState(null);
  const [isPlayed, setPlayedStatus] = useState(false);
  const [audioDuration, setAudioDuration] = useState("0:00");
  const [currentTime, setCurrentTime] = useState("0:00");
  const [progressPercent, setProgressPercent] = useState(0);
  const [valueSound, setValueSound] = useState(100);

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
    setValueSound(e.target.value);

    // Max audio volume - 1, min - 0
    audio.volume = e.target.value / 100;
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
                <Volumes>
                  {valueSound > 50 && <FaVolumeUp />}
                  {valueSound < 50 && valueSound > 10 && <FaVolumeDown />}
                  {valueSound < 10 && <FaVolumeOff />}
                </Volumes>
                <VolumeRange
                  type="range"
                  onChange={handleValue}
                  defaultValue={100}
                />
              </ContainerVolumeRange>
            </>
          )}
        </AudioControls>
        <ProgressAudio
          audioDuration={audioDuration}
          currentTime={currentTime}
          progressPercent={progressPercent}
        />
      </Container>
    ),
    [url, isPlayed, audioDuration, currentTime, progressPercent, audio, valueSound]
  );
};

export default Controls;
