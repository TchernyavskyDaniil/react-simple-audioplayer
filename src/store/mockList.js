const mockPlaylist = [
  {
    id: 1,
    title: "First track",
    author: "First author",
    url:
      "https://sampleswap.org/samples-ghost/DRUM%20LOOPS%20and%20BREAKS/000%20to%20080%20bpm/827[kb]050_barbituate-beat.wav.mp3",
    img:
      "https://www.macworld.co.uk/cmsdata/features/3630990/sync_itunes_apple_music_thumb800.jpg"
  },
  {
    id: 2,
    title: "Second track",
    author: "Second author",
    url:
      "https://sampleswap.org/samples-ghost/DRUM%20LOOPS%20and%20BREAKS/000%20to%20080%20bpm/1658[kb]050_glitch-hop-serenade.aif.mp3",
    img:
      "https://www.macworld.co.uk/cmsdata/features/3630990/sync_itunes_apple_music_thumb800.jpg"
  },
  {
    id: 3,
    title: "Third track",
    author: "Third author",
    url:
      "https://sampleswap.org/samples-ghost/DRUM%20LOOPS%20and%20BREAKS/000%20to%20080%20bpm/819[kb]050_udu_groove-1.aif.mp3",
    img:
      "https://www.macworld.co.uk/cmsdata/features/3630990/sync_itunes_apple_music_thumb800.jpg"
  }
];

export const fakeFetchPlaylist = () =>
  new Promise((res, rej) => setTimeout(() => res(mockPlaylist), 1000));
