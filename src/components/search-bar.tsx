"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const term = event.target.value;

    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <input
      className="mx-2 w-full rounded-xl bg-neutral p-3 text-neutralContent focus-visible:outline-none md:w-1/2"
      type="text"
      placeholder="Search for prompts..."
      onChange={handleSearchTermChange}
      defaultValue={searchParams.get("query")?.toString()}
    />
  );
}
