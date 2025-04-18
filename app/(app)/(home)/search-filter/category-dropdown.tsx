import { Category } from "@/payload-types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Props {
  category: Category;
  isActive?: boolean;
}

const CategoryDropdown = ({ category, isActive }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="elevated"
          className="rounded-full border-0 hover:border"
        >
          {category.category}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 w-60">
        {category.subcategories?.map((item: Category) => (
          <DropdownMenuItem
            key={item.id}
            className="p-4 w-full rounded-none font-medium text-base underline"
          >
            {item.category}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryDropdown;
