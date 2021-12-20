import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from 'react';

import shaka from 'shaka-player';
shaka.polyfill.installAll();

const Player = ({ resource, ...props }, ref) => {
  const video = useRef(null);
  const player = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      player.current = new shaka.Player(video.current);
      return player.current;
    },
    [],
  );

  useEffect(() => {
    return () => {
      player.current.destroy();
    };
  }, []);

  useEffect(() => {
    if (resource) {
      player.current.load(resource).then(() => console.log('loaded', resource));
    }
    return () => {
      if (player.current.getLoadMode() === shaka.Player.LoadMode.DESTROYED) {
        return;
      }
      player.current.unload();
    };
  }, [resource]);

  return (
    <video ref={video} style={{ width: '100%', height: 'auto' }} {...props} />
  );
};

export default forwardRef(Player);
