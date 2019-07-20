import React from "react";
import styled from "styled-components";
import PT from "prop-types";

import { audioDefaultProps, audioPropTypes } from "../../../utils";

import Controls from "./Controls";

const Container = styled.section`
  min-height: 200px;
`;

const AboutAudio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 160px;
`;

const Title = styled.span`
  font-size: 18px;
  line-height: 20px;
`;

const Author = styled(Title)``;

const AudioInfo = ({
  title,
  author,
  url,
  img,
  setNextAudio,
  setPrevAudio,
  toggleAudio,
  isPlayed,
  setPlayedStatus
}) => {
  return (
    <Container>
      <AboutAudio>
        <Image src={img} alt={title} />
        <Title> Track name: {title} </Title>
        <Author> Author: {author} </Author>
      </AboutAudio>
      <Controls
        url={url}
        setNextAudio={setNextAudio}
        setPrevAudio={setPrevAudio}
        toggleAudio={toggleAudio}
        isPlayed={isPlayed}
        setPlayedStatus={setPlayedStatus}
      />
    </Container>
  );
};

AudioInfo.defaultProps = {
  ...audioDefaultProps,
  isPlayed: true
};

AudioInfo.propTypes = {
  ...audioPropTypes,
  setNextAudio: PT.func,
  setPrevAudio: PT.func,
  toggleAudio: PT.func,
  isPlayed: PT.bool,
  setPlayedStatus: PT.func
};

export default AudioInfo;
