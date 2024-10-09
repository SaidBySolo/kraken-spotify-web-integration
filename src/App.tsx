import { useEffect, useRef, useState } from 'react'
import { SpotifyApi, Track } from '@spotify/web-api-ts-sdk';

const clientId = '<YOUR_CLIENT_ID>';
const redirectUri = 'http://localhost:5173';
const scope = 'user-read-playback-state';

interface IUseInterval {
  (callback: () => void, interval: number): void;
}

const useInterval: IUseInterval = (callback, interval) => {
  const savedCallback = useRef<(() => void) | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    let id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [interval]);
};


function App() {
  const [playingAlbumCover, setPlayingAlbumCover] = useState<string>("")

  useInterval(() => {
    const getAlbumCoverUrl = async () => {
      const state = await SpotifyApi.withUserAuthorization(clientId, redirectUri, [scope]).player.getPlaybackState()
      if (state?.item) {
        setPlayingAlbumCover((state.item as Track).album.images[0].url)
      }
    }
    getAlbumCoverUrl()

  }, 1000)

  return (
    <div style={
      {
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw"
      }
    }>
      <img style={
        {
          borderRadius: "2px",
          width: "240px",
          height: "240px"
        }
      } src={playingAlbumCover} />
    </div>

  )
}

export default App
