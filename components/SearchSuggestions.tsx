import { useQuery } from "@tanstack/react-query";
import { fetchSuggestions } from "@/lib";
import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";

type SearchSuggestionsPropsT = {
  query?: string | null;
};
//   query: string | undefined,
//   setSuggestions: Dispatch<React.SetStateAction<string[]>>
// ) => {
//   try {
//     const res = await fetch(`/api/suggestions?query=${query}`);
//     const data = await res.json();
//     setSuggestions(data.data);
//   } catch (e) {
//     console.error(e);
//   }
// };

const SearchSuggestions = (props: SearchSuggestionsPropsT) => {
  const {
    data: suggestions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["suggestions", props.query],
    queryFn: () => fetchSuggestions({ query: props.query }),
    staleTime: 30000,
  });

  return (
    <CommandList>
      <CommandGroup
        className={!props.query ? "hidden" : "block"}
        heading="Suggestions"
      >
        {suggestions?.data?.map((suggestion: string, key: number) => (
          <CommandItem key={`${suggestion}-${Math.random()}`} className="mr-2">
            {suggestion}
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandList>
  );
};

export default SearchSuggestions;
