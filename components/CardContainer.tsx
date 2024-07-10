"use client";
import { CardT, ErrorObjectT } from "@/types";
import CollectionCard from "./CollectionCard";
import { useState, useEffect, Suspense, useCallback, FormEvent } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { check } from "drizzle-orm/mysql-core";

export default function CardContainer({ card }: { card?: CardT }) {
  const [cards, setCards] = useState<CardT[] | null>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const checkIfErrorObj = (obj: CardT | ErrorObjectT) => {
    if (obj.object === "error") {
      return "error";
    } else if (obj.object === "card") {
      return "card";
    }
  };

  const handleFetchCard = async (name?: string) => {
    const url = name ? `/api/getCard?cardName=${name}` : "/api/getCard";

    try {
      const res = await fetch(url);
      const card = await res.json();
      
      if (checkIfErrorObj(card) === "error") {
        console.log("error obj", card);
        return;
      }
      setCards((prevCards) => {
        return prevCards ? [...prevCards, card] : [card];
      });
    } catch (e) {
      console.error(e);
    }
  };

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
    console.log(cardName);
    handleFetchCard(cardName);
  };

  useEffect(() => {
    handleFetchCard();
    return () => {
      console.log("cleanup");
    };
  }, []);

  return (
    <div className="w-[100vw] flex flex-col justify-center items-center gap-y-5">
      <div className="flex gap-5 w-full justify-center items-center">
        <button
          className="w-fit bg-[var(--foreground)] text-[var(--background)] rounded-md px-4 py-2 font-medium"
          onClick={() => handleFetchCard()}
        >
          Add new card
        </button>

        <form className="flex gap-2" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="e.g Venerated Rotpriest"
            name="cardName"
          />
          <button
            type="submit"
            className="w-fit bg-[var(--foreground)] text-[var(--background)] rounded-md px-4 py-2 font-medium"
          >
            Search
          </button>
        </form>
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
