"use client";
import { CardT } from "@/types";
import CollectionCard from "./CollectionCard";
import { useState, useEffect, Suspense, useCallback } from "react";
import { fetchRandomCard, fetchSpecificCard } from "@/api";
import { usePathname, useSearchParams } from "next/navigation";

export default function CardContainer({ card }: { card?: CardT }) {
  const [cards, setCards] = useState<CardT[] | null>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFetchCard = async (name?: string) => {
    if (!name) {
      try {
        const res = await fetch("/api");
        if (res.ok) {
          const data = await res.json();
          console.log("hfc fired: ", data);
          setCards((prevCards) => {
            return prevCards ? [...prevCards, data] : [data];
          });
        }
      } catch (e) {
        console.error(e);
      }
    } else if (name) {
      try {
        const specificCard = await fetchSpecificCard({ cardName: name });
        setCards((prevCards) => {
          return prevCards ? [...prevCards, specificCard] : [specificCard];
        });
      } catch (e) {
        console.error(e);
      }
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

  useEffect(() => {
    handleFetchCard();
    return () => {
      console.log("cleanup");
    };
  }, []);

  return (
    <div className="w-[100vw] flex flex-col justify-center items-center gap-y-5">
      <button
        className="w-fit bg-[var(--foreground)] text-[var(--background)] rounded-md px-4 py-2 font-medium"
        onClick={() => handleFetchCard()}
      >
        Add new card
      </button>
      <button
        className="w-fit bg-[var(--foreground)] text-[var(--background)] rounded-md px-4 py-2 font-medium"
        onClick={() => handleFetchCard("Venerated Rotpriest")}
      >
        Add specific card
      </button>
      <div className="pt-5 flex flex-wrap justify-center items-center w-[90vw] gap-y-10">
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
