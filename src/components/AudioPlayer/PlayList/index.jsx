import React from "react";
import PT from "prop-types";
import styled from "styled-components";

import PlayItem from "./PlayItem";
import { audioPropTypes } from "../../../types/AudioType";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  padding: 20px 0;
  margin: 0 auto;
  list-style: none;
`;

const AudioNotFound = styled.span`
  width: 100%;
  font-size: 16px;
  line-height: 18px;
`;

const PlayList = ({
  playlist,
  setActiveAudio,
  setIndexCurrentAudio,
  toggleAudio,
  isPlayed
}) => {
  /**
   * @param currentIndex {number}
   * @param audioProps {object}
   */
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
        <AudioNotFound> No audio records found </AudioNotFound>
      )}
    </List>
  );
};

PlayList.defaultProps = {
  playlist: [],
  isPlayed: true
};

PlayList.propTypes = {
  playlist: PT.arrayOf(
    PT.shape({
      ...audioPropTypes
    })
  ),
  setActiveAudio: PT.func,
  setIndexCurrentAudio: PT.func,
  toggleAudio: PT.func,
  isPlayed: PT.bool
};

export default PlayList;
