import React from "react";
import { Input } from "./ui/input";
import SearchSuggestions from "./SearchSuggestions";

type CardSearchBarPropsT = {
    submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
}

const CardSearchBar = (props: CardSearchBarPropsT) => {
  return (
    <>
      <form className="flex gap-2" onSubmit={props.submitHandler}>
        <Input
          type="text"
          placeholder="e.g Venerated Rotpriest"
          name="cardName"
        />
        <button
          type="submit"
          className="w-fit bg-[var(--foreground)] text-[var(--background)] rounded-md px-4 py-2 font-medium"
        >
          Search
        </button>
      </form>
      <SearchSuggestions query={`Atraxa`} />
    </>
  );
};

export default CardSearchBar;
