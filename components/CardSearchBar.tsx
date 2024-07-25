"use client";
import { useCallback, useState } from "react";
import { Input } from "./ui/input";
import SearchSuggestions from "./SearchSuggestions";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { useDebounce } from "@/lib/hooks/debounceHook";

type CardSearchBarPropsT = {
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
};

const CardSearchBar = (props: CardSearchBarPropsT) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState("");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      const newQueryString = createQueryString("q", e.target.value);
      router.push(pathname + `?` + newQueryString);
    },
    [createQueryString, pathname, searchParams]
  );

  const debouncedInputChange = useDebounce(handleInputChange, 1000);

  return (
    <>
      <form className="flex gap-2" onSubmit={props.submitHandler}>
        <Input
          type="text"
          placeholder="e.g Venerated Rotpriest"
          name="cardName"
          onChange={debouncedInputChange}
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
