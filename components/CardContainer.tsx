"use client";
import { CardT, ErrorObjectT } from "@/types";
import CollectionCard from "./CollectionCard";
import { useState, useEffect, Suspense, useCallback, FormEvent } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { handleFetchCard } from "@/lib/helpers";
import SearchSuggestions from "./SearchSuggestions";
import CardSearchBar from "./CardSearchBar";

export default function CardContainer({ card }: { card?: CardT }) {
  const [cards, setCards] = useState<CardT[]>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cardName = formData.get("cardName") as string;
    handleFetchCard(setCards, cardName);

    const cardNameInput = event.currentTarget.querySelector<HTMLInputElement>(
      "input[name='cardName']"
    );
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
      <div className="flex gap-5 w-full justify-center items-center">
        <button
          className="w-fit bg-[var(--foreground)] text-[var(--background)] rounded-md px-4 py-2 font-medium"
          onClick={() => handleFetchCard(setCards)}
        >
          Add random card
        </button>

        <CardSearchBar submitHandler={handleSubmit} />
      </div>

      <div className="pt-[7rem] flex flex-wrap justify-center items-center w-[90vw] gap-y-[7.5rem]">
        {cards?.map((card, index) => (
          <div key={card.name} className="mx-3">
            <Suspense fallback={<CollectionCard />}>
              <CollectionCard card={card} key={`${card.id}-${index}`} />
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
}
