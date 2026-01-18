// utils/csvImport.ts
import { Game } from "../types/Game";
import Papa from "papaparse";


/**
 * Converts the label column into your status type
 */
export const parseStatusFromLabel = (label?: string): Game["status"] => {
  if (!label) return "backlog";

  const lower = label.trim().toLowerCase();
  switch (lower) {
    case "finished":
      return "finished";
    case "replay":
      return "replay";
    case "abandoned":
      return "abandoned";
    case "suspended":
      return "suspended";
    case "wishlist":
      return "wishlist";
    default:
      return "backlog";
  }
};

/**
 * Converts a CSV row into a Game object for your catalogue.
 * 
 * Mapping:
 * - name → title
 * - labels → status
 * - genres → tags
 * - user_rating → score (scaled to 0–10 with half points)
 * - description_short → comments
 * - release_date → releaseDate
 * - image_url_medium → coverImage
 */
export function csvRowToGame(
  row: Record<string, string>,
  nextId: number
): Game {
  // Normalize status
  const status = row.labels?.toLowerCase() || "backlog";

  // Normalize tags
  const tags = row.genres
    ? row.genres.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  // Score conversion (CSV 0–100 → 0–10 scale)
  let score: number | null = null;
  if (row.user_rating) {
    const parsed = parseFloat(row.user_rating);
    if (!isNaN(parsed)) {
      score = Math.round((parsed / 10) * 2) / 2; // rounds to nearest 0.5
    }
  }

  // Release date and completed date
  const releaseDate = row.release_date ? new Date(row.release_date) : null;
  let completedDate: Date | null = null;
  if (status === "finished" && row.added_on) {
    completedDate = new Date(row.added_on);
  }

  return {
    id: nextId,
    title: row.name || "Untitled",
    coverImage: row.image_url_medium || "",
    status: status as Game["status"],
    tags,
    score,
    completedDate: null, // 🚫 never derived from CSV
    releaseDate: row.release_date ? new Date(row.release_date) : null,
    comments: row.description_short || "",
  };
}

/**
 * Converts multiple CSV rows into Game objects
 */
export function csvToGames(rows: Record<string, string>[], startingId = 1): Game[] {
  return rows.map((row, i) => csvRowToGame(row, startingId + i));
}

/** Parse CSV file into Game[] */
export function parseCSV(file: File): Promise<Game[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          // ⚡ Cast results.data to proper type
          const rows = results.data as Record<string, string>[];
          const games = rows.map((row, i) => csvRowToGame(row, i + 1));
          resolve(games);
        } catch (err) {
          reject(err);
        }
      },
      error: (err) => reject(err),
    });
  });
}