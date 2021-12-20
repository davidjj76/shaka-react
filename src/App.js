import { useRef, useState, useEffect } from 'react';
import Player from './Player';

const manifests = [
  'https://entclips.cbsaavideo.com/2021/11/15/1974380099822/1039669_dash_ta/stream.mpd',
  'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd',
];

const App = () => {
  const ref = useRef(null);
  const [showPlayer, setShowPlayer] = useState(true);
  const [selectedManifest, setSelectedManifest] = useState(0);

  useEffect(() => {
    console.log('app effect', ref.current);
  }, []);

  return (
    <div id="app">
      {showPlayer && (
        <Player
          ref={ref}
          controls
          muted
          autoPlay
          resource={manifests[selectedManifest]}
        />
      )}
      <select onChange={ev => setSelectedManifest(ev.target.value)}>
        <option value={0}>Video 1</option>
        <option value={1}>Video 2</option>
      </select>
      <input
        type="checkbox"
        checked={showPlayer}
        onChange={ev => setShowPlayer(ev.target.checked)}
      />
    </div>
  );
};

export default App;
