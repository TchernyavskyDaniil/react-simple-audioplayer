import React from "react";
import styled from "styled-components";

import AudioPlayerPage from "../pages/AudioPlayerPage";

const Container = styled.main`
  padding: 20px 40px;
  width: auto;
  height: 100%;

  @media screen and (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const Main = () => (
  <Container>
    <AudioPlayerPage />
  </Container>
);

export default Main;
