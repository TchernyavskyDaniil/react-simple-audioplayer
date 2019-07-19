import React from "react";
import styled from "styled-components";
import PT from "prop-types";

import { audioDefaultProps, audioPropTypes } from "../../utils";

const Container = styled.li`
  cursor: pointer;
`;

const Title = styled.span``;

const Author = styled(Title)``;

const AudioImage = styled.img`
  width: 80px;
  border-radius: 50%;
`;

const PlayItem = ({ id, title, author, img, setIndexCurrentAudio }) => (
  <Container onClick={() => setIndexCurrentAudio(id - 1)}>
    <Title> {title} </Title>
    <Author> {author} </Author>
    <AudioImage src={img} />
  </Container>
);

PlayItem.defaultProps = {
  ...audioDefaultProps,
  setIndexCurrentAudio: () => {},
  id: 0
};

PlayItem.propTypes = {
  ...audioPropTypes,
  setIndexCurrentAudio: PT.func,
  id: PT.number
};

export default PlayItem;
