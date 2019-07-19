import React from "react";
import PT from "prop-types";
import styled from "styled-components";

import PlayItem from "./PlayItem";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 20px 10%;
  margin: 0;
  list-style: none;
`;

const PlayList = ({ playlist, setIndexCurrentAudio }) => (
  <List>
    {playlist.map(({ id, title, author, img }) => (
      <PlayItem key={id} id={id} title={title} author={author} img={img} setIndexCurrentAudio={setIndexCurrentAudio} />
    ))}
  </List>
);

PlayList.defaultProps = {
  playlist: []
};

PlayList.propTypes = {
  playlist: PT.array
};

export default PlayList;
