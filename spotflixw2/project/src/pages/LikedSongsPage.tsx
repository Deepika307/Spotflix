// src/pages/LikedSongsPage.tsx
import React, { useEffect, useState } from "react";
import { Track } from "../types/music";
import TrackItem from "../components/TrackItem";

interface LikedSongsPageProps {
  onPlayTrack: (track: Track, queue?: Track[]) => void;
  currentTrack: Track | null;
  isPlaying: boolean;
}

const LikedSongsPage: React.FC<LikedSongsPageProps> = ({
  onPlayTrack,
  currentTrack,
  isPlaying,
}) => {
  const [likedTracks, setLikedTracks] = useState<Track[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("likedTracks");
    if (stored) {
      try {
        setLikedTracks(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse likedTracks:", e);
      }
    }
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-white text-2xl font-bold">Liked Songs</h2>
      {likedTracks.length > 0 ? (
        likedTracks.map((track, index) => (
          <TrackItem
            key={track.id}
            track={track}
            index={index}
            onPlayTrack={onPlayTrack}
            queue={likedTracks}
            isCurrentTrack={currentTrack?.id === track.id}
            isPlaying={isPlaying}
          />
        ))
      ) : (
        <p className="text-gray-400">No liked songs yet.</p>
      )}
    </div>
  );
};

export default LikedSongsPage;
