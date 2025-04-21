"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CustomCategory } from "../types";
import Link from "next/link";

interface Props {
  category: CustomCategory;
  isActive?: boolean;
}

const CategoryDropdown = ({ category, isActive }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-4 py-2 rounded-full bg-white hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[4px] border border-transparent hover:border-black transition-all">
        {category.category}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        {category.subcategories.length > 0 &&
          category.subcategories?.map((item) => (
            <Link href={`/${category.slug}/${item.slug}`}>
              <DropdownMenuItem
                key={item.id}
                className="p-4 w-full rounded-none font-medium text-base underline"
              >
                {item.category}
              </DropdownMenuItem>
            </Link>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryDropdown;
