import React from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import { Category } from "@/payload-types";

import Navbar from "./navbar";
import Footer from "./footer";
import SearchFilters from "./search-filter";

interface props {
  children: React.ReactNode;
}

const Layout = async ({ children }: props) => {
  const payload = await getPayload({ config });

  const data = await payload.find({
    collection: "categories",
    depth: 1,
    where: {
      parent: {
        exists: false,
      },
    },
  });

  const formatedData = data.docs.map((doc) => {
    return {
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
        ...(doc as Category),
        subcategories: undefined,
      })),
    };
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formatedData} />
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
