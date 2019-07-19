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

const PlayList = ({ playlist, setActiveAudio, setIndexCurrentAudio }) => {
  const getNewActiveAudio = (currentIndex, audioProps) => {
    setIndexCurrentAudio(currentIndex);
    setActiveAudio(audioProps);
  };

  return (
    <List>
      {playlist.map(({ id, title, author, img, url }) => (
        <PlayItem
          key={id}
          id={id}
          title={title}
          author={author}
          img={img}
          url={url}
          getNewActiveAudio={getNewActiveAudio}
        />
      ))}
    </List>
  );
};

PlayList.defaultProps = {
  playlist: []
};

PlayList.propTypes = {
  playlist: PT.array
};

export default PlayList;
