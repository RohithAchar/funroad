"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import Categories from "./categories";
import SearchInput from "./search-input";

export const SearchFilters = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      <SearchInput />
      <Categories data={data} />
    </div>
  );
};

export const SearchFilterSkeleton = () => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      <SearchInput disabled />
      <div className="flex gap-2">
        <div className="w-full h-6 bg-neutral-200 rounded-lg animate-pulse"></div>
        <div className="w-full h-6 bg-neutral-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};
