"use client";
import { CardT } from "@/types";
import CollectionCard from "./CollectionCard";
import { useState, useEffect, Suspense, FormEvent, useRef } from "react";
import { handleFetchCard } from "@/lib/helpers";
import CardSearchBar from "./CardSearchBar";

export default function CardContainer({ card }: { card?: CardT }) {
  const [cards, setCards] = useState<CardT[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cardName = formData.get("cardName") as string;
    handleFetchCard(setCards, cardName);

    const cardNameInput = event.currentTarget.querySelector<HTMLInputElement>(
      "input[name='cardName']"
    );

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    if (cardNameInput) {
      cardNameInput.value = "";
    }
  };

  useEffect(() => {
    handleFetchCard(setCards);
    return () => {};
  }, []);

  return (
    <div className="w-[100vw] flex flex-col justify-center items-center gap-y-5">
      <div className="flex gap-5 w-full justify-center">
        <button
          className="w-fit h-fit bg-[var(--foreground)] text-[var(--background)] rounded-md px-4 py-2 font-medium"
          onClick={() => handleFetchCard(setCards)}
        >
          Add random card
        </button>

        <CardSearchBar submitHandler={handleSubmit} inputRef={inputRef} />
      </div>

      <div className="pt-[7rem] flex flex-wrap justify-center items-center w-[90vw] gap-y-[7.5rem]">
        {cards?.map((card, index) => (
          <div key={card.name} className="mx-3">
            <Suspense fallback={<CollectionCard />}>
              <CollectionCard card={card} cardKey={card.name} />
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
}
