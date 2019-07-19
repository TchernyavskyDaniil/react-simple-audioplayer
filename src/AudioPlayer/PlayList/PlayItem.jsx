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

const PlayItem = ({ id, title, author, img, url, getNewActiveAudio }) => (
  <Container
    onClick={() => getNewActiveAudio(id - 1, { title, author, img, url })}
  >
    <Title> {title} </Title>
    <Author> {author} </Author>
    <AudioImage src={img} />
  </Container>
);

PlayItem.defaultProps = {
  ...audioDefaultProps
};

PlayItem.propTypes = {
  ...audioPropTypes,
  getNewActiveAudio: PT.func
};

export default PlayItem;
