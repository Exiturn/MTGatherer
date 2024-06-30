import { fetchRandomCard } from "@/api";
import CollectionCard from "@/components/CollectionCard";

export default async function Home() {
  const randomCard = await fetchRandomCard();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[var(--background)]">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <h1 className="font-medium text-3xl text-[var(--foreground)]">
          <span className="text-[rgb(201,56,20)]">MTG</span>atherer
        </h1>
        <CollectionCard card={randomCard} />
        <h1 className="text-[var(--foreground)] text-[48px] leading-10">{randomCard!.name}</h1>
      </div>
    </main>
  );
}
