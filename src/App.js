import React from "react";

import AudioPlayer from "./AudioPlayer";

const App = () => {
  return (
    <div>
      <header>
        <span> header audio player </span>
      </header>
      <main>
        <AudioPlayer />
      </main>
      <footer>
        <span> audio player footer </span>
      </footer>
    </div>
  );
};

export default App;
