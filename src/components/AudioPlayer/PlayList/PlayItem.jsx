import React from "react";
import styled from "styled-components";
import PT from "prop-types";

import { audioDefaultProps, audioPropTypes } from "../../../utils";

const Title = styled.span`
  transition: 0.4s ease color;
`;

const Author = styled(Title)`
  padding-left: 10px;
`;

const AudioImage = styled.img`
  width: 80px;
  border-radius: 50%;
`;

const Container = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  min-height: 50px;
  width: 100%;
  justify-content: flex-start;
  border: 1px solid lightblue;
  padding: 4px 6px;
  box-sizing: border-box;
  border-bottom: transparent;

  &:last-child {
    border-bottom: 1px solid lightblue;
  }

  &:hover {
    ${Title} {
      color: red;
    }
  }
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
