import { fetchRandomCard } from "@/api";
import CollectionCard from "@/components/CollectionCard";
import CardContainer from "@/components/CardContainer";

export default async function Home() {
  return (
    <main className="flex min-h-screen h-fit flex-col items-center justify-between p-24 bg-[var(--background)] overflow-x-hidden">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm flex flex-col gap-4">
        <h1 className="font-medium text-3xl text-[var(--foreground)]">
          <span className="text-[rgb(201,56,20)]">MTG</span>atherer
        </h1>
        <CardContainer />
      </div>
    </main>
  );
}
