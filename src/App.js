import React from 'react';

import Player from "./Player";

const App = () => {
  return (
    <div>
      <header>
        <span> header audio player </span>
      </header>
      <main>
        <Player />
      </main>
      <footer>
        <span> audio player footer </span>
      </footer>
    </div>
  );
};

export default App;
