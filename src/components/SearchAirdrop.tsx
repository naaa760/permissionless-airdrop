import React, { useState } from "react";
import { AirdropAPI } from "../services/api";
import AirdropCard from "./AirdropCard";

const SearchAirdrop: React.FC = () => {
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<{
    loading: boolean;
    error: string | null;
    airdrop: any | null;
  }>({
    loading: false,
    error: null,
    airdrop: null,
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setSearchResult({ loading: true, error: null, airdrop: null });

    try {
      const airdrop = await AirdropAPI.getAirdropById(searchId);
      setSearchResult({
        loading: false,
        error: airdrop ? null : "Airdrop not found",
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

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Search Airdrop</h2>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter Airdrop ID"
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={searchResult.loading}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {searchResult.loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="mt-6">
        {searchResult.error && (
          <p className="text-red-500 text-center">{searchResult.error}</p>
        )}
        {searchResult.airdrop && <AirdropCard airdrop={searchResult.airdrop} />}
      </div>
    </div>
  );
};

export default SearchAirdrop;
