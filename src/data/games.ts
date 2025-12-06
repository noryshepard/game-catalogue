import { Game } from "../types/Game";

export const games: Game[] = [
  {
    id: 1,
    title: "Elden Ring",
    coverImage: "https://i.redd.it/wzqo9olsot471.png",
    status: "finished",        // one of your six statuses
    completedDate: new Date("2024-02-01"), // if finished, else null
    releaseDate: null,                     // if wishlist, else null
    score: 9,                              // or null
    comments: "Loved this game!",          // or empty string
    tags: ["Adventure", "RPG"],            // optional tags array
  },
  {
    id: 2,
    title: "Stardew Valley",
    coverImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/header.jpg?t=1754692865",
    status: "replay",
    completedDate: null,
    releaseDate: null,
    score: null,
    comments: "Really need to replay it",
    tags: ["Indie"],
  },
  // add more games here...
];
