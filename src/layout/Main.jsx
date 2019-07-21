import React from "react";
import styled from "styled-components";

import AudioPlayerPage from "../pages/AudioPlayerPage";
import { device } from "../stylesConfig/devices";

const Container = styled.main`
  padding: 20px 10px;
  min-height: 450px;

  @media screen and ${device.tablet} {
    padding: 20px 40px;
    min-height: 600px;
  }
`;

const Main = () => (
  <Container>
    <AudioPlayerPage />
  </Container>
);

export default Main;
