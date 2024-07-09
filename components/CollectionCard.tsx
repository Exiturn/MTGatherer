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
  const DEFAULT_IMAGE_URL =
    "https://cf.geekdo-images.com/CxJmNl4wR4InjqyNrMdBTw__medium/img/a68vYZcQh95vKDcmOC2bb2Q6qEE=/fit-in/500x500/filters:no_upscale():strip_icc()/pic163749.jpg";

  const checkIfDoubleSided = (card: CardT | undefined): boolean => {
    if (card?.card_faces) {
      return true;
    }
    return false;
  };

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
            src={
              checkIfDoubleSided(randomCard) === true
                ? randomCard?.card_faces?.[0].image_uris?.normal
                : randomCard?.image_uris?.normal === undefined
                ? DEFAULT_IMAGE_URL
                : randomCard?.image_uris?.normal
            }
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
          <CardDescription>
            {randomCard!.set_name} | ${randomCard!.prices.usd ? randomCard!.prices.usd : ""}
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
