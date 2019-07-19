import PT from "prop-types";

export const fancyTimeFormat = time => {
  // Hours, minutes and seconds
  const hrs = Math.floor(time / 3600);
  const mins = Math.floor((time % 3600) / 60);
  const secs = Math.floor(time % 60);

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = "";

  if (hrs > 0) {
    ret += `${hrs}:${mins < 10 ? "0" : ""}`;
  }

  ret += `${mins}:${secs < 10 ? "0" : ""}`;
  ret += `${secs}`;

  return ret;
};

export const defaultAudioImg =
  "https://www.macworld.co.uk/cmsdata/features/3630990/sync_itunes_apple_music_thumb800.jpg";

export const audioDefaultProps = {
  title: "Default title",
  author: "Default author",
  url: "default url",
  img: "default img"
};

export const audioPropTypes = {
  title: PT.string,
  author: PT.string,
  url: PT.string,
  img: PT.string
};

export function debounce(f, t) {
  return function(args) {
    let previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (previousCall && this.lastCall - previousCall <= t) {
      clearTimeout(this.lastCallTimer);
    }
    this.lastCallTimer = setTimeout(() => f(args), t);
  };
}
