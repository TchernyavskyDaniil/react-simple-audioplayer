import React from "react";
import styled from "styled-components";

import { audioDefaultProps, audioPropTypes } from "../utils";

import Controls from "./PlayerSettings/Controls";

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
      <Controls
        url={url}
        setNextAudio={setNextAudio}
        setPrevAudio={setPrevAudio}
      />
    </Container>
  );
};

Header.defaultProps = audioDefaultProps;

Header.propTypes = audioPropTypes;

export default Header;
