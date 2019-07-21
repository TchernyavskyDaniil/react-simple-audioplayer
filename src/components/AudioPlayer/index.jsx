import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";

import { fakeFetchPlaylist } from "../../store/mockList";

import AudioInfo from "./AudioInfo";
import PlayList from "./PlayList";

import "./customAudioStyles.css";

const Container = styled.div`
  text-align: center;
`;

const SearchAudio = styled.input`
  width: 400px;
  height: 30px;
  font-size: 20px;
  padding: 6px;
  border: 1px solid lightgray;

  @media (max-width: 768px) {
    width: auto;
  }
`;

const Loading = styled.span`
  display: block;
  margin: 40px;
  text-align: center;
  font-size: 24px;
`;

const AudioPlayer = () => {
  const [playlist, setPlaylist] = useState([]);
  const [sortedPlaylist, setSortedList] = useState([]);
  const [indexCurrentAudio, setIndexCurrentAudio] = useState(0);
  const [activeAudio, setActiveAudio] = useState(null);
  const [isPlayed, setPlayedStatus] = useState(false);
  const [isOnceAudio, setOnceAudioStatus] = useState(false);
  const audioRef = useRef(null);

  // Did mount
  useEffect(() => {
    fakeFetchPlaylist().then(fakePlaylist => {
      setPlaylist(fakePlaylist);
      setSortedList(fakePlaylist);
    });
  }, []);

  const updateCurrentAudio = index => {
    setIndexCurrentAudio(index);
    setActiveAudio(sortedPlaylist[index]);
    setPlayedStatus(true);
  };

  const setNextAudio = () => {
    let indexOfNextAudio = indexCurrentAudio + 1;

    // When index last audio
    if (indexCurrentAudio === sortedPlaylist.length - 1) {
      indexOfNextAudio = 0;
    }

    updateCurrentAudio(indexOfNextAudio);
  };

  const setPrevAudio = () => {
    let indexOfPrevAudio = indexCurrentAudio - 1;

    // When index first audio
    if (indexCurrentAudio <= 0) {
      indexOfPrevAudio = sortedPlaylist.length - 1;
    }

    updateCurrentAudio(indexOfPrevAudio);
  };

  const handlePlay = () => {
    setPlayedStatus(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handlePause = () => {
    setPlayedStatus(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const toggleAudio = (isPlayedStatus = false) =>
    isPlayedStatus ? handlePause() : handlePlay();

  // for API - debounce
  const getSortedList = e => {
    const newSortedPlaylist = playlist.filter(playItem => {
      const inputValue = e.target.value.toLowerCase();
      if (
        playItem.title.toLowerCase().includes(inputValue) ||
        playItem.author.toLowerCase().includes(inputValue)
      ) {
        return playItem;
      }
    });

    setSortedList(newSortedPlaylist);
    newSortedPlaylist.length === 1
      ? setOnceAudioStatus(true)
      : setOnceAudioStatus(false);
  };

  const activeAudioCallback = useCallback(() => {
    setActiveAudio(null);
    setPlayedStatus(false);
  }, [activeAudio, isPlayed]);

  const handleChangeSorted = e => {
    if (e.target.value.length >= 3) {
      activeAudioCallback();
      getSortedList(e);
    } else if (!e.target.value.length) {
      setSortedList(playlist);
    }
  };

  return playlist.length ? (
    <Container>
      <SearchAudio
        type="text"
        onChange={handleChangeSorted}
        placeholder="Let's search!"
      />
      {activeAudio && (
        <AudioInfo
          {...activeAudio}
          setPrevAudio={setPrevAudio}
          setNextAudio={setNextAudio}
          toggleAudio={toggleAudio}
          isPlayed={isPlayed}
          setPlayedStatus={setPlayedStatus}
          isOnceAudio={isOnceAudio}
          audioRef={audioRef}
        />
      )}
      <PlayList
        setActiveAudio={setActiveAudio}
        setIndexCurrentAudio={setIndexCurrentAudio}
        playlist={sortedPlaylist}
        toggleAudio={toggleAudio}
        isPlayed={isPlayed}
      />
    </Container>
  ) : (
    <Loading> Loading some audio </Loading>
  );
};

export default AudioPlayer;
