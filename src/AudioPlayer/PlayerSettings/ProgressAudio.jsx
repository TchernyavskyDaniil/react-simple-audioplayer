import React from "react";
import styled from "styled-components";
import PT from "prop-types";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
`;

const Counter = styled.span`
  min-width: 45px;
  text-align: center;
`;

const ProgressRange = styled.input``;

const ProgressAudio = ({
  audioDuration,
  currentTime,
  progressValue,
  changeValueAudio
}) => (
  <Container>
    <Counter> {currentTime} </Counter>
    <ProgressRange
      type="range"
      value={progressValue}
      onChange={changeValueAudio}
      onClick={changeValueAudio}
    />
    <Counter> {audioDuration} </Counter>
  </Container>
);

ProgressAudio.defaultProps = {
  audioDuration: "0:00",
  currentTime: "0:00",
  progressValue: 0
};

ProgressAudio.propTypes = {
  audioDuration: PT.string,
  currentTime: PT.string,
  progressValue: PT.number,
  changeValueAudio: PT.func
};

export default ProgressAudio;
