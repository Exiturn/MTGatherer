"use client"
import { Card, CardHeader, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CardT } from "@/types";
import { useEffect } from "react";

export default function CollectionCard({ card }: { card: CardT }) {
  const randomCard = card;

  useEffect(() => {
    console.log(randomCard);
  }, [randomCard]);

  return (
    <Card className="inline-flex flex-col w-[300px] bg-[var(--foreground)]">
      <figure className="w-full">
        <img
          src={randomCard!.image_uris.normal}
          alt={randomCard!.name}
          width={295}
          height={400}
          className="rounded-t-md w-full"
        />
      </figure>

      <div className="flex flex-col">
        <CardHeader>
          <h1 className="text-[26px] leading-10">{randomCard!.name}</h1>
        </CardHeader>
        <CardDescription className="px-6">{randomCard!.set_name} | ${randomCard!.prices.usd_foil}</CardDescription>
      </div>

      <div className="flex justify-start items-center px-6 py-5 gap-4">
        <p className="text-[16px]">Not Collected</p>
        <Checkbox id="collected" />
      </div>
    </Card>
  );
}
