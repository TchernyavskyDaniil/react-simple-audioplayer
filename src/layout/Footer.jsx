import React from "react";
import styled from "styled-components";

import { urlToGithub } from "../utils";

const Container = styled.footer`
  background-color: aliceblue;
  text-align: center;
  padding: 40px 20px;
`;

const LinkTo = styled.a`
  color: black;
  font-size: 24px;
  line-height: 26px;
  text-decoration: none;
  transition: 0.4s ease opacity;

  &:hover {
    opacity: 0.6;
  }
`;

const Footer = () => (
  <Container>
    <LinkTo href={urlToGithub} title="Github link project">
      {" "}
      GitHub{" "}
    </LinkTo>
  </Container>
);

export default Footer;
