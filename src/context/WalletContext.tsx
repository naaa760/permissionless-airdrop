import { FC, ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, Connection } from "@solana/web3.js";

// Import wallet adapter styles
require("@solana/wallet-adapter-react-ui/styles.css");

// Configure for Solana devnet
const network = WalletAdapterNetwork.Devnet;
const endpoint = clusterApiUrl(network);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: FC<WalletProviderProps> = ({ children }) => {
  // Initialize all the wallets you want to use
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter({
        network: WalletAdapterNetwork.Devnet,
      }),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};

// Create a context for wallet state
export const useWalletContext = useWallet;

// Export the WalletMultiButton for use in components
export { WalletMultiButton };
export const connection = new Connection(endpoint, "confirmed");
