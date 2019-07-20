import React from "react";
import styled from "styled-components";
import PT from "prop-types";

import Controls from "./Controls";
import AboutAudio from "./AboutAudio";
import { audioDefaultProps, audioPropTypes } from "../../../types/AudioType";

const Container = styled.section`
  min-height: 200px;
  padding: 20px 0;
`;

const AudioInfo = ({
  title,
  author,
  url,
  img,
  setNextAudio,
  setPrevAudio,
  toggleAudio,
  isPlayed,
  setPlayedStatus,
                     isOnceAudio,
}) => {
  return (
    <Container>
      <AboutAudio title={title} img={img} author={author} />
      <Controls
        url={url}
        setNextAudio={setNextAudio}
        setPrevAudio={setPrevAudio}
        toggleAudio={toggleAudio}
        isPlayed={isPlayed}
        setPlayedStatus={setPlayedStatus}
        isOnceAudio={isOnceAudio}
      />
    </Container>
  );
};

AudioInfo.defaultProps = {
  ...audioDefaultProps,
  isPlayed: true,
  isOnceAudio: false,
};

AudioInfo.propTypes = {
  ...audioPropTypes,
  setNextAudio: PT.func,
  setPrevAudio: PT.func,
  toggleAudio: PT.func,
  isPlayed: PT.bool,
  setPlayedStatus: PT.func,
  isOnceAudio: PT.bool,
};

export default AudioInfo;
