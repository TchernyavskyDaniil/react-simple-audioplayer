import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { fakeFetchPlaylist } from "../store/mockList";

import PlayerHeader from "./PlayerHeader";

const Container = styled.div``;

const Player = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentAudioNumber, setCurrentAudioNumber] = useState(0);

  // Did mount
  useEffect(() => {
    fakeFetchPlaylist().then(fakePlaylist => setPlaylist(fakePlaylist));
  }, []);


  return playlist.length ? (
    <Container>
      <PlayerHeader {...playlist[currentAudioNumber]} />
    </Container>
  ) : (
    <span> Loading data </span>
  )
};

export default Player;
