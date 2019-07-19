import React, { memo } from "react";
import styled from "styled-components";
import PT from "prop-types";

// Magic numbers
const difWithStyleProgress = 3;
const difWithStyleDotted = 5;
const maxPercentDotted = 93;

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

const ProgressAudio = ({ audioDuration, currentTime, progressPercent }) => {
  const ProgressContainer = styled.div`
    position: relative;
    height: 6px;
    width: 100px;
    background-color: lightblue;
  `;

  const Progress = styled.div`
    position: absolute;
    width: ${`${progressPercent - difWithStyleProgress}%`};
    background-color: black;
    height: 100%;
  `;

  const Dotted = styled.span`
    position: absolute;
    left: ${`${progressPercent >= maxPercentDotted ? maxPercentDotted : progressPercent - difWithStyleDotted}%`};
    background-color: black;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    top: -1px;
  `;

  return (
    <Container>
      <Counter> {currentTime} </Counter>
      <ProgressContainer>
        <Dotted />
        <Progress />
      </ProgressContainer>
      <Counter> {audioDuration} </Counter>
    </Container>
  );
};

ProgressAudio.defaultProps = {
  audioDuration: "0:00",
  currentTime: "0:00",
  progressPercent: 0
};

ProgressAudio.propTypes = {
  audioDuration: PT.string,
  currentTime: PT.string,
  progressPercent: PT.number
};

export default memo(ProgressAudio);
