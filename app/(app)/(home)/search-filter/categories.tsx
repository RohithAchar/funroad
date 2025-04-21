import { CustomCategory } from "../types";
import CategoryDropdown from "./category-dropdown";

interface Props {
  data: CustomCategory[];
}

const Categories = ({ data }: Props) => {
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
