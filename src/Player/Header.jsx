import React, { useState } from "react";
import styled from "styled-components";
import PT from "prop-types";

import Controls from "./Controls";

const Container = styled.div``;

const AboutAudio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 160px;
`;

const Title = styled.span``;

const Author = styled(Title)``;

const Header = ({ title, author, url, img, setNextAudio, setPrevAudio }) => {
  return (
    <Container>
      <AboutAudio>
        <Image src={img} alt={title} />
        <Title> {title} </Title>
        <Author> {author} </Author>
      </AboutAudio>
      <Controls url={url} setNextAudio={setNextAudio} setPrevAudio={setPrevAudio} />
    </Container>
  );
};

Header.defaultProps = {
  title: "Default title",
  author: "Default author",
  url: "default url",
  img: "default img"
};

Header.propTypes = {
  title: PT.string,
  author: PT.string,
  url: PT.string,
  img: PT.string
};

export default Header;
