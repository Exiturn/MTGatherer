"use client";
import { Card, CardHeader, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CardT, ErrorObjectT } from "@/types";
import { useEffect, Suspense } from "react";

export default function CollectionCard({
  card,
  key,
}: {
  card?: CardT;
  key?: string;
}) {
  const DEFAULT_IMAGE_URL =
    "https://cf.geekdo-images.com/CxJmNl4wR4InjqyNrMdBTw__medium/img/a68vYZcQh95vKDcmOC2bb2Q6qEE=/fit-in/500x500/filters:no_upscale():strip_icc()/pic163749.jpg";

  const checkIfDoubleSided = (card: CardT | undefined): boolean => {
    if (card?.card_faces) {
      return true;
    }
    return false;
  };

  return !card ? (
    <Card className="inline-flex flex-col w-[250px] min-h-[575px] bg-[var(--foreground)] justify-center items-center">
      Loading...
    </Card>
  ) : (
    <Card
      key={key}
      className="inline-flex flex-col w-[250px] h-[525px] bg-[var(--foreground)] relative"
    >
      <div className="absolute w-full top-[-70px] left-0">
        <div className="flex justify-center items-center py-5 gap-4 bg-[var(--background)] text-[var(--foreground)]">
          <p className="text-[16px]">Not Collected</p>
          <Checkbox id="collected" />
        </div>
      </div>

      <Suspense fallback={<figure className="w-full h-[350px]" />}>
        <figure className="w-full h-[350px]">
          <img
            src={
              checkIfDoubleSided(card) === true
                ? card?.card_faces?.[0].image_uris?.normal
                : card?.image_uris?.normal === undefined
                ? DEFAULT_IMAGE_URL
                : card?.image_uris?.normal
            }
            alt={card?.name}
            className="rounded-lg w-full"
          />
        </figure>
      </Suspense>

      <div className="flex flex-col justify-between px-6 pb-6">
        <div>
          <CardHeader>
            <h1 className="text-[21px] leading-5">{card!.name}</h1>
          </CardHeader>
          <CardDescription>
            {card?.set_name} | $
            {!card?.prices.usd === undefined
              ? "err"
              : card?.prices.usd
              ? card?.prices.usd
              : ""}
          </CardDescription>
        </div>
      </div>
    </Card>
  );
}
