export type GameStatus =
  | "finished"
  | "backlog"
  | "replay"
  | "abandoned"
  | "suspended"
  | "wishlist";

export interface Game {
  id: number;                     // unique id for each game
  title: string;                  // game name
  coverImage: string | null;      // image URL
  status: GameStatus;             // only ONE status

  
  tags: string[];          // now required, not optional
  score: number | null;           // 0–10 or null if not rated

  completedDate: Date | null;  // only if status === "finished"
  releaseDate: Date | null;    // only if status === "wishlist"

  comments: string;               // up to 250 characters
}
