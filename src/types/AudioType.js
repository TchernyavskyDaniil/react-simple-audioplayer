import PT from "prop-types";
import { defaultAudioImg } from "../utils";

// types for many components

export const audioDefaultProps = {
  title: "Default title",
  author: "Default author",
  url: "default url",
  img: defaultAudioImg,
  typeAudio: "mp3"
};

export const audioPropTypes = {
  title: PT.string.isRequired,
  author: PT.string.isRequired,
  url: PT.string.isRequired,
  img: PT.string,
  id: PT.number,
  typeAudio: PT.string
};

export const audioRefTypes = {
  audioRef: PT.shape({
    current: PT.shape({
      load: PT.func,
      play: PT.func,
      duration: PT.number,
      currentTime: PT.number,
      ontimeupdate: PT.func,
      volume: PT.number
    })
  })
};

export const audioControlsTypes = {
  setNextAudio: PT.func,
  setPrevAudio: PT.func,
  toggleAudio: PT.func,
  isPlayed: PT.bool,
  setPlayedStatus: PT.func,
  isOnceAudio: PT.bool
};
