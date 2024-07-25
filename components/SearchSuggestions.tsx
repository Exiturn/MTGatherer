import { useQuery } from "@tanstack/react-query";
import { fetchSuggestions } from "@/lib";

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
    queryFn: () => fetchSuggestions({query: props.query}),
    staleTime: 30000,
  });

//   useEffect(() => {
//     handleFetchSuggestions(setSuggestions, props.query);
//     return () => {};
//   }, []);

//   useEffect(() => {
//     console.log("sg", suggestions);
//     console.log("sg2", suggestions2?.data);
//   }, [suggestions, suggestions2]);

  return (
    <div>
      <p>Query: {props.query}</p>

      {suggestions?.data?.map((suggestion: string) => (
        <p>{suggestion}</p>
      ))}
    </div>
  );
};

export default SearchSuggestions;
