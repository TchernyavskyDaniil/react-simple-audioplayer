import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { fakeFetchPlaylist } from "../store/mockList";

import Header from "./Header";
import PlayList from "./PlayList";

const Container = styled.div``;

const SearchAudio = styled.input``;

const AudioPlayer = () => {
  const [playlist, setPlaylist] = useState([]);
  const [sortedPlaylist, setSortedList] = useState([]);
  const [indexCurrentAudio, setIndexCurrentAudio] = useState(0);
  const [activeAudio, setActiveAudio] = useState(null);

  // Did mount
  useEffect(() => {
    fakeFetchPlaylist().then(fakePlaylist => {
      setPlaylist(fakePlaylist);
      setSortedList(fakePlaylist);
    });
  }, []);

  const setNextAudio = () => {
    let indexOfNextAudio = indexCurrentAudio + 1;

    // When index last audio
    if (indexCurrentAudio === sortedPlaylist.length - 1) {
      indexOfNextAudio = 0;
    }
    setIndexCurrentAudio(indexOfNextAudio);
    setActiveAudio(sortedPlaylist[indexOfNextAudio]);
  };

  const setPrevAudio = () => {
    let indexOfPrevAudio = indexCurrentAudio - 1;

    // When index first audio
    if (indexCurrentAudio <= 0) {
      indexOfPrevAudio = sortedPlaylist.length - 1;
    }

    setIndexCurrentAudio(indexOfPrevAudio);
    setActiveAudio(sortedPlaylist[indexOfPrevAudio]);
  };

  // for API debounce
  const getSortedList = e => {
    setSortedList(
      playlist.filter(playItem => {
        const inputValue = e.target.value.toLowerCase();
        if (
          playItem.title.toLowerCase().includes(inputValue) ||
          playItem.author.toLowerCase().includes(inputValue)
        ) {
          return playItem;
        }
      })
    );
  };

  return playlist.length ? (
    <Container>
      <SearchAudio type="text" onChange={getSortedList} />
      {activeAudio && (
        <Header
          {...activeAudio}
          setPrevAudio={setPrevAudio}
          setNextAudio={setNextAudio}
        />
      )}
      <PlayList
        setActiveAudio={setActiveAudio}
        setIndexCurrentAudio={setIndexCurrentAudio}
        playlist={sortedPlaylist}
      />
    </Container>
  ) : (
    <span> Loading data </span>
  );
};

export default AudioPlayer;
