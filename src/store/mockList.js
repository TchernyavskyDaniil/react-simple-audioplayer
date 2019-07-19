import { defaultAudioImg } from '../utils';

const mockPlaylist = [
  {
    id: 1,
    title: "First track",
    author: "First author",
    url:
      "https://sampleswap.org/samples-ghost/DRUM%20LOOPS%20and%20BREAKS/000%20to%20080%20bpm/827[kb]050_barbituate-beat.wav.mp3",
    img: defaultAudioImg
  },
  {
    id: 2,
    title: "Second track",
    author: "Second author",
    url:
      "https://sampleswap.org/samples-ghost/DRUM%20LOOPS%20and%20BREAKS/000%20to%20080%20bpm/1658[kb]050_glitch-hop-serenade.aif.mp3",
    img: defaultAudioImg
  },
  {
    id: 3,
    title: "Third track",
    author: "Third author",
    url:
      "https://sampleswap.org/samples-ghost/DRUM%20LOOPS%20and%20BREAKS/000%20to%20080%20bpm/819[kb]050_udu_groove-1.aif.mp3",
    img: defaultAudioImg
  },
  {
    id: 4,
    title: "Fourth track",
    author: "Fourth author",
    url:
      "https://sampleswap.org/samples-ghost/MELODIC%20LOOPS/VOCAL%20OR%20VOXY%20LOOPS/1175[kb]141_illusion-echo-vox.wav.mp3",
    img: defaultAudioImg
  }
];

export const fakeFetchPlaylist = () =>
  new Promise((res, rej) => setTimeout(() => res(mockPlaylist), 1000));
