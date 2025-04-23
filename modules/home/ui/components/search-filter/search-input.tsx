"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { BookmarkCheck, SearchIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface props {
  disabled?: boolean;
}

const SearchInput = ({ disabled }: props) => {
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input className="pl-8" disabled={disabled} placeholder="Search" />
      </div>
      {session.data?.user && (
        <Button className="h-12" asChild variant="elevated">
          <Link href="/library">
            <BookmarkCheck />
            Library
          </Link>
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
