import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useCallback } from "react"
import { usePathname, useSearchParams } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const createQueryString = useCallback(
//   (name: string, value: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set(name, value);

//     return params.toString();
//   },
//   [searchParams]
// );