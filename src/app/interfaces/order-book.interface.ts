export interface OrderBook {
  microTimestamp: number;
  tickerDisplay: string;
  bids: number[][];
  asks: number[][];
}
