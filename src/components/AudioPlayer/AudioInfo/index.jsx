import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import {
  audioControlsTypes,
  audioDefaultProps,
  audioPropTypes,
  audioRefTypes
} from "../../../types/AudioType";

import Controls from "./Controls";
import AboutAudio from "./AboutAudio";

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
  toggleAudioStatus,
  isPlaying,
  setPlayedStatus,
  isOnceAudio,
  audioRef
}) => {
  return (
    <Container>
      <Helmet>
        <title> {`${title}, ${author}`} </title>
      </Helmet>
      <AboutAudio title={title} img={img} author={author} />
      <Controls
        url={url}
        typeAudio={typeAudio}
        setNextAudio={setNextAudio}
        setPrevAudio={setPrevAudio}
        toggleAudioStatus={toggleAudioStatus}
        isPlaying={isPlaying}
        setPlayedStatus={setPlayedStatus}
        isOnceAudio={isOnceAudio}
        audioRef={audioRef}
      />
    </Container>
  );
};

AudioInfo.defaultProps = {
  ...audioDefaultProps,
  isPlaying: true,
  isOnceAudio: false
};

AudioInfo.propTypes = {
  ...audioPropTypes,
  ...audioControlsTypes,
  ...audioRefTypes
};

export default AudioInfo;
