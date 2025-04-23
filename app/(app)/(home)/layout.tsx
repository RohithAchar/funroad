import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import Footer from "@/modules/home/ui/components/footer";
import { Suspense } from "react";

import Navbar from "@/modules/home/ui/components/navbar";
import {
  SearchFilters,
  SearchFilterSkeleton,
} from "@/modules/home/ui/components/search-filter";

interface props {
  children: React.ReactNode;
}

const Layout = async ({ children }: props) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFilterSkeleton />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
