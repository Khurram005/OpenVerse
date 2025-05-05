import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OpenverseResults = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state || !state.results) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  const [query, setQuery] = useState(state?.query || "");
  const [mediaType, setMediaType] = useState(state?.mediaType || "all");
  const [results, setResults] = useState(state?.results || []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      let newResults = [];

      if (mediaType === "image") {
        const res = await fetch(`https://api.openverse.org/v1/images/?q=${query}`);
        const data = await res.json();
        newResults = data.results;
      } else if (mediaType === "audio") {
        const res = await fetch(`https://api.openverse.org/v1/audio/?q=${query}`);
        const data = await res.json();
        newResults = data.results;
      } else {
        const [images, audio] = await Promise.all([
          fetch(`https://api.openverse.org/v1/images/?q=${query}`).then((res) => res.json()),
          fetch(`https://api.openverse.org/v1/audio/?q=${query}`).then((res) => res.json()),
        ]);
        newResults = [...images.results, ...audio.results];
      }

      setResults(newResults);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">
      {/* Search bar */}
      <div className="flex flex-col sm:flex-row items-stretch max-w-3xl mb-8 mx-auto bg-white rounded shadow overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search again"
          className="flex-grow px-4 py-3 placeholder-gray-500 focus:outline-none"
        />
        <select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
          className="bg-gray-100 text-gray-800 px-4 py-3 border-l border-gray-300 focus:outline-none"
        >
          <option value="all">All content</option>
          <option value="image">Images</option>
          <option value="audio">Audio</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-500 transition"
        >
          Search
        </button>
      </div>

      {/* Results display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {results.length === 0 && <p className="text-center col-span-full">No results found.</p>}
        {results.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow">
            {item.thumbnail ? (
              <img
                src={item.thumbnail}
                alt={item.title || "Content"}
                className="w-full h-48 object-cover rounded"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                No preview
              </div>
            )}
            <h3 className="mt-2 text-sm font-semibold">{item.title || "Untitled"}</h3>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm underline"
            >
              View on source
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenverseResults;
