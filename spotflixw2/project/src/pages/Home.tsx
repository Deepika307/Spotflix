// src/pages/Home.tsx
import React from "react";
import { tracks } from "../data/tracks";
import TrackItem from "../components/TrackItem";
import { usePlayer } from "../context/PlayerContext";
import { Track } from "../types/music";

const Home: React.FC = () => {
  const { setTrack, currentTrack, isPlaying } = usePlayer();

  const handlePlayTrack = (track: Track) => {
    setTrack(track, tracks); 
  };

  return (
    <div className="p-4">
      <h2 className="text-white text-2xl font-bold mb-4">All Tracks</h2>
      {tracks.map((track, index) => (
        <TrackItem
          key={track.id}
          track={track}
          index={index}
          queue={tracks}
          onPlayTrack={handlePlayTrack}
          isCurrentTrack={currentTrack?.id === track.id}
          isPlaying={isPlaying}
        />
      ))}
    </div>
  );
};

export default Home;
