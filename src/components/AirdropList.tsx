import React, { useEffect, useState } from "react";
import { Airdrop } from "../types";
import { AirdropAPI } from "../services/api";
import AirdropCard from "./AirdropCard";

const AirdropList: React.FC = () => {
  const [airdrops, setAirdrops] = useState<Airdrop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAirdrops();
  }, []);

  const loadAirdrops = async () => {
    try {
      const data = await AirdropAPI.getAirdrops();
      setAirdrops(data);
    } catch (err) {
      setError("Failed to load airdrops");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading available airdrops...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (airdrops.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No airdrops available at the moment</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Available Airdrops</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {airdrops.map((airdrop) => (
          <AirdropCard key={airdrop.id} airdrop={airdrop} />
        ))}
      </div>
    </div>
  );
};

export default AirdropList;
