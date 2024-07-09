import { db } from "@/db";

export async function queryDbForCard({ cardName }: { cardName: string}) {
    const dbResult = await db.query.cardsTable.findMany({
        where: (cards, { eq }) => eq(cards.name, cardName),
    });

    console.log("dbResult: ", dbResult);

    if (!dbResult) {
        return
    }
    return dbResult;
}
