import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";

import { fakeFetchPlaylist } from "../../store/mockList";
import { device } from "../../stylesConfig/devices";

import AudioInfo from "./AudioInfo";
import PlayList from "./PlayList";

import "./index.css";

const Container = styled.div`
  text-align: center;
`;

const SearchAudio = styled.input`
  width: auto;
  height: 30px;
  font-size: 20px;
  padding: 6px;
  border: 1px solid lightgray;

  @media screen and ${device.tablet} {
    width: 400px;
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
  const [isPlaying, setPlayedStatus] = useState(false);
  const [isOnceAudio, setOnceAudioStatus] = useState(false);
  const audioRef = useRef(null);

  // Did mount
  useEffect(() => {
    fakeFetchPlaylist().then(fakePlaylist => {
      setPlaylist(fakePlaylist);
      setSortedList(fakePlaylist);
    });
  }, []);

  /**
   * @param index {number}
   */
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

  /**
   * @param isPlaying {boolean}
   */
  const toggleAudioStatus = isPlaying =>
    isPlaying ? handlePause() : handlePlay();

  /**
   * @param playlist {Array.<Object>}
   */
  const toggleIsOnceAudioStatus = playlist => {
    playlist.length === 1
      ? setOnceAudioStatus(true)
      : setOnceAudioStatus(false);
  };

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
    toggleIsOnceAudioStatus(newSortedPlaylist);
  };

  const setNewActiveAudioCallback = useCallback(() => {
    setActiveAudio(null);
    setPlayedStatus(false);
  }, [activeAudio, isPlaying]);

  const handleChangeSorted = e => {
    if (e.target.value.length >= 3) {
      setNewActiveAudioCallback();
      getSortedList(e);
    } else {
      setSortedList(playlist);
      toggleIsOnceAudioStatus(playlist);
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
          toggleAudioStatus={toggleAudioStatus}
          isPlaying={isPlaying}
          setPlayedStatus={setPlayedStatus}
          isOnceAudio={isOnceAudio}
          audioRef={audioRef}
        />
      )}
      <PlayList
        setActiveAudio={setActiveAudio}
        setIndexCurrentAudio={setIndexCurrentAudio}
        playlist={sortedPlaylist}
        toggleAudioStatus={toggleAudioStatus}
        isPlaying={isPlaying}
      />
    </Container>
  ) : (
    <Loading> Loading some audio </Loading>
  );
};

export default AudioPlayer;
