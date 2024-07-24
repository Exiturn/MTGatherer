"use server";
import { CardT, ErrorObjectT, SearchSuggestionsT } from "@/types";
import { Dispatch } from "react";

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

export async function fetchSpecificCard({
  cardName,
}: {
  cardName: string | undefined;
}): Promise<CardT | ErrorObjectT | null> {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  await delay(1000);

  const queryString = cardName?.replaceAll(" ", "+");

  const res = await fetch(
    `https://api.scryfall.com/cards/named?fuzzy=${queryString}}`,
    {
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    return res.json();
  }

  const card: CardT | ErrorObjectT = await res.json();

  if (card.object === "error") {
    return null;
  }

  return card;
}

export async function fetchSuggestions({
  query,
}: {
  query: string | undefined | null;
}): Promise<SearchSuggestionsT | void> {
  const queryString = query?.replaceAll(" ", "+");

  const res = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${queryString}`, {
    next: { revalidate: 0 },
  });

  const suggestions = await res.json();

  if (suggestions.total_values === 0) {
    return;
  }

  return suggestions
}
