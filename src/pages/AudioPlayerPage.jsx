import React from "react";
import { Helmet } from "react-helmet";

import AudioPlayer from "../components/AudioPlayer";

const AudioPlayerPage = () => (
  <>
    <Helmet>
      <title> Audio player main page</title>
    </Helmet>
    <AudioPlayer />
  </>
);

export default AudioPlayerPage;
