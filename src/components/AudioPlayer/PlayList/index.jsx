import React from "react";
import PT from "prop-types";
import styled from "styled-components";

import PlayItem from "./PlayItem";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  padding: 20px 0;
  margin: 0 auto;
  list-style: none;
`;

const PlayList = ({
  playlist,
  setActiveAudio,
  setIndexCurrentAudio,
  toggleAudio,
  isPlayed
}) => {
  const getNewActiveAudio = (currentIndex, audioProps) => {
    setIndexCurrentAudio(currentIndex);
    setActiveAudio(audioProps);
    toggleAudio(isPlayed);
  };

  return (
    <List>
      {playlist.length ? (
        playlist.map(({ id, title, author, img, url }) => (
          <PlayItem
            key={id}
            id={id}
            title={title}
            author={author}
            img={img}
            url={url}
            getNewActiveAudio={getNewActiveAudio}
          />
        ))
      ) : (
        <span> No audio records found </span>
      )}
    </List>
  );
};

PlayList.defaultProps = {
  playlist: [],
  isPlayed: true
};

PlayList.propTypes = {
  playlist: PT.array,
  setActiveAudio: PT.func,
  setIndexCurrentAudio: PT.func,
  toggleAudio: PT.func,
  isPlayed: PT.bool
};

export default PlayList;
