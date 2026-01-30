//what fields your app supports importing

export type GameImportField =
  | "title"
  | "platform"
  | "releaseDate"
  | "coverImage"
  | "status"
  | "score"
  | "comments"
  | "tags";

export const GAME_IMPORT_FIELDS: {
  key: GameImportField;
  label: string;
  required?: boolean;
}[] = [
  { key: "title", label: "Title", required: true },
  { key: "platform", label: "Platform", required: true },
  { key: "releaseDate", label: "Release date" },
  { key: "coverImage", label: "Cover image URL" },
  { key: "status", label: "Status" },
  { key: "score", label: "Score" },
  { key: "comments", label: "Comments" },
  { key: "tags", label: "Tags" },
];