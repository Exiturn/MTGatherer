import { fetchSuggestions } from "@/lib";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    try {
        const suggestions = await fetchSuggestions({ query });
        return Response.json(suggestions);
    } catch (error: any) {
        return Response.json({ error: error.message });
    }
}