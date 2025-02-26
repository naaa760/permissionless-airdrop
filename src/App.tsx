import React from "react";
import { WalletProvider } from "./context/WalletContext";
import { NotificationProvider } from "./context/NotificationContext";
import Layout from "./components/Layout";
import Header from "./components/Header";
import SearchAirdrop from "./components/SearchAirdrop";
import AirdropList from "./components/AirdropList";
import AirdropCard from "./components/AirdropCard";
import { AirdropType } from "./types";

const App: React.FC = () => {
  const handleClaim = () => {
    console.log("Claiming tokens...");
  };

  const mockAirdrops = [
    {
      id: "airdrop1",
      tokenSymbol: "SOL",
      tokenDecimals: 9,
      type: "INSTANT" as const,
      totalAmount: 1000000000000,
      totalRecipients: 1000,
      claimedRecipients: 500,
      claimedAmount: 500000000000,
    },
    {
      id: "airdrop2",
      tokenSymbol: "USDC",
      tokenDecimals: 6,
      type: "VESTED" as const,
      totalAmount: 1000000000,
      totalRecipients: 1000,
      claimedRecipients: 0,
      claimedAmount: 0,
    },
  ];

  return (
    <WalletProvider>
      <NotificationProvider>
        <Layout>
          <Header />
          <div className="space-y-12">
            <SearchAirdrop />
            <AirdropList />
            <section>
              <h2>Available Airdrops</h2>
              <div className="airdrops-grid">
                {mockAirdrops.map((airdrop) => (
                  <AirdropCard key={airdrop.id} airdrop={airdrop} />
                ))}
              </div>
            </section>
          </div>
        </Layout>
      </NotificationProvider>
    </WalletProvider>
  );
};

export default App;
