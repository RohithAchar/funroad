import { usePathname } from "next/navigation";

import CategoryDropdown from "./category-dropdown";
import { CustomCategory } from "@/app/(app)/(home)/types";

interface Props {
  data: CustomCategory[];
}

const all: CustomCategory = {
  id: "all",
  name: "All",
  slug: "/",
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
          <CategoryDropdown
            category={item}
            isActive={pathname.split("/")[1] === item.slug}
          />
        </div>
      ))}
    </div>
  );
};

export default Categories;
