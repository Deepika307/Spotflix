// path: src/pages/Search.tsx
import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);

  const accessToken = localStorage.getItem("spotify_access_token");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    try {
      const res = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: query,
          type: "track",
          limit: 10,
        },
      });
      setTracks(res.data.tracks.items);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search for tracks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded w-1/2"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-green-600 text-white rounded"
        >
          Search
        </button>
      </form>

      <div>
        {tracks.map((track: any) => (
          <div key={track.id} className="flex items-center gap-4 mb-2">
            <img
              src={track.album.images[2]?.url}
              alt="cover"
              className="w-12 h-12 rounded"
            />
            <div className="flex-1">
              <div className="font-semibold">{track.name}</div>
              <div className="text-sm text-gray-500">
                {track.artists[0].name}
              </div>
            </div>
            {/* Like button will go here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
