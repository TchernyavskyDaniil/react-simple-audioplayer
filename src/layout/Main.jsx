import React from "react";
import styled from "styled-components";

import AudioPlayerPage from "../pages/AudioPlayerPage";

const Container = styled.main`
  padding: 20px 40px;
  min-height: 600px;

  @media screen and (max-width: 768px) {
    padding: 20px 10px;
    min-height: 450px;
  }
`;

const Main = () => (
  <Container>
    <AudioPlayerPage />
  </Container>
);

export default Main;
