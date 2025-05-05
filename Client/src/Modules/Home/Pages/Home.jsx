import React, { useState } from "react";
import { isAuthenticated } from "../../../utils/auth";
import axiosInstance from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const isLoggedIn = isAuthenticated();

  const [query, setQuery] = useState("");
  const [mediaType, setMediaType] = useState("all"); // 'all', 'image', 'audio'
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      let searchResults = [];

      if (mediaType === "image") {
        const res = await fetch(
          `https://api.openverse.org/v1/images/?q=${query}`
        );
        const data = await res.json();
        searchResults = data.results;
      } else if (mediaType === "audio") {
        const res = await fetch(
          `https://api.openverse.org/v1/audio/?q=${query}`
        );
        const data = await res.json();
        searchResults = data.results;
      } else {
        const [images, audio] = await Promise.all([
          fetch(`https://api.openverse.org/v1/images/?q=${query}`).then((res) =>
            res.json()
          ),
          fetch(`https://api.openverse.org/v1/audio/?q=${query}`).then((res) =>
            res.json()
          ),
        ]);
        searchResults = [...images.results, ...audio.results];
      }

      // Save search history for logged-in users
      if (isLoggedIn) {
        const token = localStorage.getItem("token");
        await axiosInstance.post(
          "/api/search-history",
          { query },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // Navigate to results page
      navigate("/openverse-results", {
        state: {
          results: searchResults,
          query,
          mediaType,
        },
      });
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div className="bg-cover bg-center text-white">
      <div className="bg-black bg-opacity-80 min-h-screen flex items-center">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-20">
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4">
            Explore more than 800 million creative works
          </h1>

          {/* Subheading */}
          <p className="text-gray-300 mb-6 max-w-2xl text-sm sm:text-base">
            An extensive library of free stock photos, images, and audio,
            available for free use.
          </p>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row items-stretch w-full max-w-2xl rounded-md shadow-md overflow-hidden bg-white mx-auto sm:mx-0">
            <div className="flex items-center px-4 bg-white border-r border-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.386a1 1 0 01-1.414 1.415l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for content"
              className="flex-grow px-4 py-3 text-black placeholder-gray-500 focus:outline-none"
            />
            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value)}
              className="bg-gray-100 text-gray-800 px-4 py-3 border-t sm:border-t-0 sm:border-l border-gray-300 focus:outline-none"
            >
              <option value="all">All content</option>
              <option value="image">Images</option>
              <option value="audio">Audio</option>
            </select>
            <button
              onClick={handleSearch}
              className="bg-yellow-500 text-black px-6 py-3 hover:bg-yellow-400 transition"
            >
              Search
            </button>
          </div>

          {/* Footer note */}
          <p className="text-gray-400 text-xs mt-4 max-w-xl">
            All Openverse content is under a{" "}
            <a href="#" className="underline">
              Creative Commons license
            </a>{" "}
            or is in the public domain.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
