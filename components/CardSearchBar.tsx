"use client";
import { useCallback } from "react";
import { Input } from "./ui/input";
import SearchSuggestions from "./SearchSuggestions";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

type CardSearchBarPropsT = {
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
};

const CardSearchBar = (props: CardSearchBarPropsT) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <form className="flex gap-2" onSubmit={props.submitHandler}>
        <Input
          type="text"
          placeholder="e.g Venerated Rotpriest"
          name="cardName"
          onChange={(e) =>
            router.push(
              pathname + `?` + createQueryString("q", e.target.value)
            )
          }
        />
        <button
          type="submit"
          className="w-fit bg-[var(--foreground)] text-[var(--background)] rounded-md px-4 py-2 font-medium"
        >
          Search
        </button>
      </form>
      <SearchSuggestions query={searchParams.get("q")} />
    </>
  );
};

export default CardSearchBar;
