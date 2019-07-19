import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import PT from "prop-types";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px 0;
`;

const Counter = styled.span``;

const ProgressAudio = ({ audioDuration, currentTime }) => {
  return (
    <Container>
      <Counter> {currentTime} </Counter>
      <Counter> {audioDuration} </Counter>
    </Container>
  );
};

ProgressAudio.defaultProps = {
  audioDuration: "0:00",
  currentTime: "0:00"
};

ProgressAudio.propTypes = {
  audioDuration: PT.string,
  currentTime: PT.string
};

export default ProgressAudio;
