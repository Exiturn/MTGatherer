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

export async function fetchSpecificCard({ cardName }: { cardName: string }): Promise<CardT> {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  await delay(1000);

  const queryString = cardName.replaceAll(' ', '+');

  const res = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${queryString}}`, {
    next: { revalidate: 0 },
  })
  
  if (!res.ok) {
    throw new Error("Failed to fetch card, please try again.");
  }

  const card: CardT = await res.json();

  return card;
}