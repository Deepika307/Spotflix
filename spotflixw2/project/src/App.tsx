import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Player from "./components/Player";
import { Track, Playlist, Album } from "./types/music";
import { mockPlaylists, mockTracks, mockAlbums } from "./data/mockData";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState("home");
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null
  );

  const handlePlayTrack = (track: Track, queue: Track[] = []) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setSelectedPlaylist(null); // Clear playlist when switching views
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar
        currentView={currentView}
        onViewChange={handleViewChange}
        playlists={mockPlaylists}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <MainContent
          currentView={currentView}
          playlists={mockPlaylists}
          albums={mockAlbums}
          tracks={mockTracks}
          onPlayTrack={handlePlayTrack}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          selectedPlaylist={selectedPlaylist}
          onSelectPlaylist={setSelectedPlaylist}
          onViewChange={setCurrentView}
        />
        <Player
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
        />
      </div>
    </div>
  );
};

export default App;
