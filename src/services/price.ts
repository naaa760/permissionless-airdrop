import { connection } from "../context/WalletContext";

interface TokenPrice {
  usd: number;
  usd_24h_change: number;
}

export class PriceService {
  private static prices: Record<string, TokenPrice> = {};
  private static coingeckoIds: Record<string, string> = {
    SOL: "solana",
    USDC: "usd-coin",
    // Add more token mappings as needed
  };

  static async getTokenPrice(symbol: string): Promise<TokenPrice | null> {
    try {
      const id = this.coingeckoIds[symbol.toUpperCase()];
      if (!id) return null;

      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_24hr_change=true`
      );

      const data = await response.json();
      return data[id] || null;
    } catch (error) {
      console.error("Error fetching price:", error);
      return null;
    }
  }
}
