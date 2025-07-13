// src/components/Player.tsx
import React, { useEffect, useRef, useState } from "react";
import { Track } from "../types/music";
import {
  Play,
  Pause,
  Heart,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
} from "lucide-react";

interface PlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSkipNext: () => void;
  onSkipPrevious: () => void;
}

const Player: React.FC<PlayerProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onSkipNext,
  onSkipPrevious,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  // Sync play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying, currentTrack]);

  // Track progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [currentTrack]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const toggleVolume = () => {
    const newVolume = volume > 0 ? 0 : 1;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-gray-900 border-t border-gray-800 p-4 text-white flex items-center justify-between">
      {currentTrack && (
        <audio ref={audioRef} src={currentTrack.audioUrl} preload="metadata" />
      )}
      <div className="flex items-center gap-4 w-1/3">
        {currentTrack && (
          <>
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              className="w-12 h-12 object-cover rounded"
            />
            <div>
              <h3 className="text-sm font-semibold">{currentTrack.title}</h3>
              <p className="text-xs text-gray-400">{currentTrack.artist}</p>
            </div>
            <Heart
              onClick={toggleLike}
              className={`ml-2 cursor-pointer ${
                isLiked ? "text-green-500 fill-green-500" : "text-green-500"
              }`}
              size={18}
              strokeWidth={2.5}
            />
          </>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center gap-6">
          <SkipBack
            onClick={onSkipPrevious}
            className="text-white cursor-pointer hover:text-green-500"
            size={20}
          />
          {isPlaying ? (
            <Pause
              onClick={onTogglePlay}
              className="text-green-500 cursor-pointer"
              size={30}
            />
          ) : (
            <Play
              onClick={onTogglePlay}
              className="text-green-500 cursor-pointer"
              size={30}
            />
          )}
          <SkipForward
            onClick={onSkipNext}
            className="text-white cursor-pointer hover:text-green-500"
            size={20}
          />
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full mt-1">
          <span className="text-xs text-gray-400">{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={progress}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none accent-green-500"
          />
          <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center w-1/3 justify-end gap-2">
        {volume > 0 ? (
          <Volume2
            onClick={toggleVolume}
            className="cursor-pointer text-white"
            size={18}
          />
        ) : (
          <VolumeX
            onClick={toggleVolume}
            className="cursor-pointer text-white"
            size={18}
          />
        )}
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => {
            const vol = parseFloat(e.target.value);
            setVolume(vol);
            if (audioRef.current) audioRef.current.volume = vol;
          }}
          className="w-24 accent-green-500"
        />
      </div>
    </div>
  );
};

export default Player;
