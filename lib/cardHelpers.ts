import { CardT, ErrorObjectT } from "@/types";
import { Dispatch } from 'react';

const checkIfErrorObj = (obj: CardT | ErrorObjectT) => {
    if (obj.object === "error") {
      return "error";
    } else if (obj.object === "card") {
      return "card";
    }
  };

export const handleFetchCard = async (
  setCards: Dispatch<React.SetStateAction<CardT[]>>,
  cardName?: string
) => {
  const url = cardName ? `/api/getCard?cardName=${cardName}` : `/api/getCard`;
  try {
    const res = await fetch(url);
    const card = await res.json();

    if (checkIfErrorObj(card) === "error") {
      console.log("error obj", card.details);
      return;
    }
    setCards((prevCards) => {
      return prevCards ? [...prevCards, card] : [card];
    });
  } catch (e) {
    console.error(e);
  }
};
