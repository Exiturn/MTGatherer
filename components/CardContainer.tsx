"use client";
import { CardT } from "@/types";
import CollectionCard from "./CollectionCard";
import { useState, useEffect } from "react";
import { fetchRandomCard } from "@/api";

export default function CardContainer({ card }: { card?: CardT }) {
  const [cards, setCards] = useState<CardT[] | null>([]);
  const [currentCardId, setCurrentCardId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleFetchCards = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const randCard = await fetchRandomCard();
      setCards((prevCards) => {
        return prevCards ? [...prevCards, randCard] : [randCard];
      });
      setCurrentCardId(randCard.id);
    } catch (e) {
      setError(e as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchCards();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="w-fit bg-[var(--foreground)] text-[var(--background)] rounded-md px-4 py-2 font-medium"
        onClick={handleFetchCards}
      >
        Add new card
      </button>
      <div className="pt-5 flex flex-wrap w-[90vw] gap-y-5">
        {cards?.map((card, index) => (
          <div key={card.name} className="mx-3">
            <CollectionCard card={card} isLoading={isLoading && currentCardId === card.id} key={card.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
