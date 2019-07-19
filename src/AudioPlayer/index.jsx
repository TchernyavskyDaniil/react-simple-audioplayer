import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { fakeFetchPlaylist } from "../store/mockList";

import Header from "./Header";
import PlayList from "./PlayList";

const Container = styled.div``;

const AudioPlayer = () => {
  const [playlist, setPlaylist] = useState([]);
  const [indexCurrentAudio, setIndexCurrentAudio] = useState(0);

  // Did mount
  useEffect(() => {
    fakeFetchPlaylist().then(fakePlaylist => setPlaylist(fakePlaylist));
  }, []);

  const setNextAudio = () => {
    let indexOfNextAudio = indexCurrentAudio + 1;

    // When index last audio
    if (indexCurrentAudio === playlist.length - 1) {
      indexOfNextAudio = 0;
    }
    setIndexCurrentAudio(indexOfNextAudio);
  };

  const setPrevAudio = () => {
    let indexOfPrevAudio = indexCurrentAudio - 1;

    // When index first audio
    if (indexCurrentAudio === 0) {
      indexOfPrevAudio = playlist.length - 1;
    }

    setIndexCurrentAudio(indexOfPrevAudio);
  };

  return playlist.length ? (
    <Container>
      <Header
        {...playlist[indexCurrentAudio]}
        setPrevAudio={setPrevAudio}
        setNextAudio={setNextAudio}
      />
      <PlayList playlist={playlist} setIndexCurrentAudio={setIndexCurrentAudio} />
    </Container>
  ) : (
    <span> Loading data </span>
  );
};

export default AudioPlayer;