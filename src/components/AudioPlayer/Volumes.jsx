import React from "react";
import styled from "styled-components";
import { FaVolumeUp, FaVolumeDown, FaVolumeMute } from "react-icons/fa";
import PT from "prop-types";

const Container = styled.div`
  margin-right: 10px;
`;

const Volumes = ({ volumeCount, toggleMuteValue }) => (
  <Container onClick={() => toggleMuteValue(!!volumeCount)}>
    {volumeCount > 50 && <FaVolumeUp />}
    {volumeCount <= 50 && volumeCount > 10 && <FaVolumeDown />}
    {volumeCount < 10 && <FaVolumeMute />}
  </Container>
);

Volumes.defaultProps = {
  volumeCount: 100
};

Volumes.propTypes = {
  volumeCount: PT.number,
  toggleMuteValue: PT.func
};

export default Volumes;
