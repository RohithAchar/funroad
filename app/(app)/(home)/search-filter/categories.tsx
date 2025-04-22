import { usePathname } from "next/navigation";

import { CustomCategory } from "../types";
import CategoryDropdown from "./category-dropdown";

interface Props {
  data: CustomCategory[];
}

const all: CustomCategory = {
  id: "all",
  category: "All",
  slug: "all",
  color: "#fff",
  subcategories: [],
  // Add the missing properties
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const Categories = ({ data }: Props) => {
  const pathname = usePathname();
  return (
    <div className="flex gap-2">
      <CategoryDropdown category={all} isActive={pathname === "/"} />
      {data.map((item) => (
        <div key={item.id}>
          <CategoryDropdown category={item} isActive={pathname === item.slug} />
        </div>
      ))}
    </div>
  );
};

export default Categories;
