import { NextApiRequest, NextApiResponse } from "next";
import { fetchRandomCard, fetchSpecificCard } from "@/lib";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cardName = searchParams.get("cardName");

  try {
    if (cardName) {
      const res = await fetchSpecificCard({ cardName });
      return Response.json(res);
    } else {
      const card = await fetchRandomCard();
      return Response.json(card);
    }
  } catch (error: any) {
    return Response.json({ error: error.message });
  }
}
