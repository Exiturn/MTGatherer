"use client";
import { useCallback } from "react";
import SearchSuggestions from "./SearchSuggestions";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { useDebounce } from "@/lib/hooks/debounceHook";
import { Command, CommandInput, CommandList } from "@/components/ui/command";

type CardSearchBarPropsT = {
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
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

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQueryString = createQueryString("q", e.target.value);
      router.push(pathname + `?` + newQueryString);
    },
    [createQueryString, pathname, searchParams]
  );

  const debouncedInputChange = useDebounce(handleInputChange, 750);

  return (
    <>
      <form className="flex gap-2" onSubmit={props.submitHandler}>
        <Command className="w-[400px]">
          <CommandInput
            placeholder="e.g Venerated Rotpriest"
            name="cardName"
            onChangeCapture={debouncedInputChange}
            ref={props.inputRef}
          />
          <CommandList></CommandList>
        </Command>
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
