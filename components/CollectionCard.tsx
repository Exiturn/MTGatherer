"use client";
import { Card, CardHeader, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CardT } from "@/types";
import { useEffect, Suspense } from "react";

export default function CollectionCard({
  card,
  isLoading,
  key,
}: {
  card?: CardT;
  isLoading?: boolean;
  key?: string;
}) {
  const randomCard = card;

  useEffect(() => {
    console.log(randomCard);
  }, [randomCard]);

  return !card ? (
    <Card className="inline-flex flex-col w-[250px] min-h-[550px] bg-[var(--foreground)] justify-center items-center">
      Loading...
    </Card>
  ) : (
    <Card
      key={key}
      className="inline-flex flex-col w-[250px] min-h-[550px] bg-[var(--foreground)]"
    >
      <figure className="w-full">
        <Suspense fallback={<div className="w-full h-full">Loading...</div>}>
          <img
            src={randomCard!.image_uris.normal}
            alt={randomCard!.name}
            className="rounded-t-md w-full"
          />
        </Suspense>
      </figure>

      <div className="flex flex-col">
        <CardHeader>
          <h1 className="text-[26px] leading-8">{randomCard!.name}</h1>
        </CardHeader>
        <CardDescription className="px-6">
          {randomCard!.set_name} | ${randomCard!.prices.usd_foil}
        </CardDescription>
      </div>

      <div className="flex justify-start items-center px-6 py-5 gap-4">
        <p className="text-[16px]">Not Collected</p>
        <Checkbox id="collected" />
      </div>
    </Card>
  );
}
