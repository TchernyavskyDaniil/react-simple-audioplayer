import React from "react";
import styled from "styled-components";

const Container = styled.header`
  padding: 40px 20px;
  background-color: aliceblue;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 22px;
  line-height: 22px;
  margin: 0;
`;

const Header = () => {
  return (
    <Container>
      <Title> Simple React audio player </Title>
    </Container>
  );
};

export default Header;
