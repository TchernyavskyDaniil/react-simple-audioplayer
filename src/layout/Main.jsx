import React from "react";
import styled from "styled-components";

import AudioPlayerPage from "../pages/AudioPlayerPage";

const Container = styled.main`
  padding: 20px 40px;
  width: 100%;
`;

const Main = () => (
  <Container>
    <AudioPlayerPage />
  </Container>
);

export default Main;
