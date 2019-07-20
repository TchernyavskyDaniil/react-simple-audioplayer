import React from "react";
import styled from "styled-components";

import Header from "./layout/Header";
import Main from "./layout/Main";
import Footer from "./layout/Footer";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const App = () => (
  <Container>
    <Header />
    <Main />
    <Footer />
  </Container>
);

export default App;
