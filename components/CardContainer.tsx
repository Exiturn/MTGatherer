"use client";
import { CardT } from "@/types";
import CollectionCard from "./CollectionCard";
import { useState, useEffect, Suspense } from "react";
import { fetchRandomCard } from "@/api";

export default function CardContainer({ card }: { card?: CardT }) {
  const [cards, setCards] = useState<CardT[] | null>([]);

  const handleFetchCards = async () => {
    try {
      const randCard = await fetchRandomCard();
      setCards((prevCards) => {
        return prevCards ? [...prevCards, randCard] : [randCard];
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    handleFetchCards();

    return () => {
      console.log("cleanup")
    }
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
            {/* <Suspense fallback={<CollectionCard />}>
              <CollectionCard card={card} key={card.id} />
            </Suspense> */}
            <CollectionCard card={card} key={card.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
