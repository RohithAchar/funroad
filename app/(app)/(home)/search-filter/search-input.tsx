"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

interface props {
  disabled?: boolean;
}

const SearchInput = ({ disabled }: props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input className="pl-8" disabled={disabled} placeholder="Search" />
      </div>
    </div>
  );
};

export default SearchInput;
