import CardContainer from "@/components/CardContainer";
import { auth } from "@/auth/auth";
import QueryClientContextProvider from "@/components/QueryClientContextProvider";

export default async function Home() {
  const session = await auth();

  console.log(session);

  return (
    <QueryClientContextProvider>
      <main className="flex min-h-screen h-fit flex-col items-center justify-between p-24 bg-[var(--background)] overflow-x-hidden">
        <div className="z-10 w-full items-center justify-between text-sm flex flex-col gap-4">
          <h1 className="font-medium text-3xl text-[var(--foreground)]">
            <span className="text-[#c93814]">MTG</span>atherer
          </h1>
          <CardContainer />
        </div>
      </main>
    </QueryClientContextProvider>
  );
}
