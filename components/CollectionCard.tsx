"use client";
import { Card, CardHeader, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CardT } from "@/types";
import { useEffect, Suspense } from "react";

export default function CollectionCard({
  card,
  key,
}: {
  card?: CardT;
  key?: string;
}) {
  const randomCard = card;

  useEffect(() => {
    console.log(randomCard);
  }, [randomCard]);

  return !card ? (
    <Card className="inline-flex flex-col w-[250px] h-[525px] bg-[var(--foreground)] justify-center items-center">
      Loading...
    </Card>
  ) : (
    <Card
      key={key}
      className="inline-flex flex-col w-[250px] min-h-[525px] bg-[var(--foreground)]"
    >
      <Suspense fallback={<figure className="w-full h-[350px]" />}>
        <figure className="w-full h-[350px]">
          <img
            src={randomCard?.image_uris?.normal === undefined ? "" : randomCard?.image_uris?.normal}
            alt={randomCard?.name}
            className="rounded-t-md w-full"
          />
        </figure>
      </Suspense>

      <div className="flex flex-col justify-between min-h-[175px] px-6">
        <div>
          <CardHeader>
            <h1 className="text-[21px] leading-5">{randomCard!.name}</h1>
          </CardHeader>
          <CardDescription className="">
            {randomCard!.set_name} | ${randomCard!.prices.usd_foil}
          </CardDescription>
        </div>

        <div className="flex justify-start items-center py-5 gap-4">
          <p className="text-[16px]">Not Collected</p>
          <Checkbox id="collected" />
        </div>
      </div>
    </Card>
  );
}
