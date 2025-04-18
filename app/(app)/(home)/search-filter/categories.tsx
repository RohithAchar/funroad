import { Category } from "@/payload-types";
import CategoryDropdown from "./category-dropdown";

interface props {
  data: any;
}

const Categories = ({ data }: props) => {
  return (
    <div className="flex gap-4">
      {data.map((item: Category) => (
        <div key={item.id}>
          <CategoryDropdown category={item} />
        </div>
      ))}
    </div>
  );
};

export default Categories;
