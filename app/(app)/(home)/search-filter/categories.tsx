import CategoryDropdown from "./category-dropdown";
import { CustomCategory } from "../types";

interface props {
  data: CustomCategory[];
}

const Categories = ({ data }: props) => {
  return (
    <div className="flex gap-2">
      {data.map((item) => (
        <div key={item.id}>
          <CategoryDropdown category={item} />
        </div>
      ))}
    </div>
  );
};

export default Categories;
