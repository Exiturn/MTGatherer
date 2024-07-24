"use client";
import { useState, useEffect } from "react";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { handleFetchSuggestions } from "@/lib/helpers";

type SearchSuggestionsProps = {
  query?: string;
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

const SearchSuggestions = (props: SearchSuggestionsProps) => {
  const {
    data: suggestions2,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["suggestions", props.query],
    queryFn: () => fetch(`/api/suggestions?query=${props.query}`).then(res => res.json()),
  });

  const [suggestions, setSuggestions] = useState<string[]>([]);

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

      {suggestions2?.data?.map((suggestion: string) => (
        <p>{suggestion}</p>
      ))}
    </div>
  );
};

export default SearchSuggestions;
