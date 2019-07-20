import React from "react";
import styled from "styled-components";
import PT from "prop-types";

import AboutAudio from "../AudioInfo/AboutAudio";
import { audioDefaultProps, audioPropTypes } from "../AudioType";

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
`;

const PlayItem = ({ id, title, author, img, url, getNewActiveAudio }) => (
  <Container
    onClick={() => getNewActiveAudio(id - 1, { title, author, img, url })}
  >
    <AboutAudio title={title} author={author} img={img} isList />
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
