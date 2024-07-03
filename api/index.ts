import { CardT } from "@/types";

export async function fetchRandomCard(): Promise<CardT> {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  await delay(1000);

  const res = await fetch("https://api.scryfall.com/cards/random", {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch random card");
  }

  const card: CardT = await res.json();
  return card;
}

export async function fetchCardImage({ card }: { card: CardT }): Promise<string> {
  if (!card) {
    throw new Error("No card provided");
  }
  const cardImage = card.image_uris.normal;
  return cardImage;
}