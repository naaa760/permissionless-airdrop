import React, { useState } from "react";
import { AirdropAPI } from "../services/api";
import AirdropCard from "./AirdropCard";
import { Airdrop } from "../types";
import LoadingSpinner from "./LoadingSpinner";

const SearchAirdrop: React.FC = () => {
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<{
    loading: boolean;
    error: string | null;
    airdrop: Airdrop | null;
  }>({
    loading: false,
    error: null,
    airdrop: null,
  });

  const handleSearch = async () => {
    if (!searchId.trim()) {
      setSearchResult({
        loading: false,
        error: "Please enter an Airdrop ID",
        airdrop: null,
      });
      return;
    }

    setSearchResult({ loading: true, error: null, airdrop: null });

    try {
      // Search for airdrop using the API
      const airdrop = await AirdropAPI.getAirdropById(searchId.trim());

      if (!airdrop) {
        setSearchResult({
          loading: false,
          error: "No airdrop found with this ID. Try 'airdrop1' or 'airdrop2'",
          airdrop: null,
        });
        return;
      }

      setSearchResult({
        loading: false,
        error: null,
        airdrop,
      });
    } catch (err) {
      setSearchResult({
        loading: false,
        error: "Failed to search airdrop",
        airdrop: null,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="flex flex-col items-center gap-8">
        {/* Search Input */}
        <div className="w-full flex gap-4">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Try searching 'airdrop1' or 'airdrop2'"
            className="flex-1 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSearch}
            disabled={searchResult.loading}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:opacity-90 transition disabled:opacity-50 whitespace-nowrap"
          >
            {searchResult.loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Search Results */}
        <div className="w-full">
          {searchResult.loading && (
            <div className="text-center py-8">
              <LoadingSpinner />
              <p className="text-gray-400 mt-2">Searching for airdrop...</p>
            </div>
          )}

          {searchResult.error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-center">
              {searchResult.error}
            </div>
          )}

          {searchResult.airdrop && (
            <div className="animate-fade-in">
              <AirdropCard airdrop={searchResult.airdrop} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAirdrop;
