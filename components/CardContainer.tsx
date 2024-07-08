"use client";
import { CardT } from "@/types";
import CollectionCard from "./CollectionCard";
import { useState, useEffect, Suspense, useCallback } from "react";
import { fetchRandomCard, fetchSpecificCard } from "@/api";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function CardContainer({ card }: { card?: CardT }) {
  const [cards, setCards] = useState<CardT[] | null>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const handleFetchSpecificCard = async (name: string) => {
    try {
      const specificCard = await fetchSpecificCard({ cardName: name });
      setCards((prevCards) => {
        return prevCards ? [...prevCards, specificCard] : [specificCard];
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

  useEffect(() => {
    handleFetchCards();

    return () => {
      console.log("cleanup");
    };
  }, []);

  return (
    <div className="w-[100vw] flex flex-col justify-center items-center gap-y-5">
      <button
        className="w-fit bg-[var(--foreground)] text-[var(--background)] rounded-md px-4 py-2 font-medium"
        onClick={handleFetchCards}
      >
        Add new card
      </button>
      <button
        className="w-fit bg-[var(--foreground)] text-[var(--background)] rounded-md px-4 py-2 font-medium"
        onClick={() =>  handleFetchSpecificCard("Elesh Norn")}
      >
        Add specific card
      </button>
      <Link
        className="text-white py-4 px-6 bg-red-900"
        href={pathname + "?" + createQueryString("test", "test")}
      >
        TEST
      </Link>
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
