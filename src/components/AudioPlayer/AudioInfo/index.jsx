import React from "react";
import styled from "styled-components";

import Controls from "./Controls";
import AboutAudio from "./AboutAudio";
import {
  audioControlsTypes,
  audioDefaultProps,
  audioPropTypes,
  audioRefTypes
} from "../../../types/AudioType";

const Container = styled.section`
  min-height: 200px;
  padding: 20px 0;
`;

const AudioInfo = ({
  title,
  author,
  url,
  img,
  typeAudio,
  setNextAudio,
  setPrevAudio,
  toggleAudio,
  isPlayed,
  setPlayedStatus,
  isOnceAudio,
  audioRef
}) => {
  return (
    <Container>
      <AboutAudio title={title} img={img} author={author} />
      <Controls
        url={url}
        typeAudio={typeAudio}
        setNextAudio={setNextAudio}
        setPrevAudio={setPrevAudio}
        toggleAudio={toggleAudio}
        isPlayed={isPlayed}
        setPlayedStatus={setPlayedStatus}
        isOnceAudio={isOnceAudio}
        audioRef={audioRef}
      />
    </Container>
  );
};

AudioInfo.defaultProps = {
  ...audioDefaultProps,
  isPlayed: true,
  isOnceAudio: false
};

AudioInfo.propTypes = {
  ...audioPropTypes,
  ...audioControlsTypes,
  ...audioRefTypes
};

export default AudioInfo;
