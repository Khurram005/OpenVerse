import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";
import { format } from "date-fns";

const SearchHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/api/search-history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response?.data?.data);
      setHistory(response?.data?.data);
    } catch (err) {
      console.error("Failed to fetch search history:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteHistoryItem = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/api/search-history/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(history.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete history item:", err);
    }
  };

  const deleteAllHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete("/api/search-history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory([]);
    } catch (err) {
      console.error("Failed to delete all history:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) return <p className="text-white">Loading history...</p>;

  return (
    <div className="p-6 bg-gray-800 text-white mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Search History</h2>
        {history.length > 0 && (
          <button
            onClick={deleteAllHistory}
            className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded"
          >
            Clear All
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <p className="text-gray-400">No search history available.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((item) => (
            <li
              key={item.id}
              className="bg-gray-700 p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{item.query}</p>
                <p className="text-sm text-gray-300">
                  {format(new Date(item.createdAt), "PPpp")}
                </p>
              </div>
              <button
                onClick={() => deleteHistoryItem(item.id)}
                className="bg-red-400 hover:bg-red-300 px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchHistory;
