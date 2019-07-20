import React from "react";
import styled from "styled-components";

import AudioPlayerLayout from "../pages/AudioPlayerLayout";

const Container = styled.main`
  padding: 20px 40px;
  width: 100%;
`;

const Main = () => (
  <Container>
    <AudioPlayerLayout />
  </Container>
);

export default Main;
