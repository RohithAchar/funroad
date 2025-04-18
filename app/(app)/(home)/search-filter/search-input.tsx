import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface props {
  disabled?: boolean;
}

const SearchInput = ({ disabled }: props) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input className="pl-8" disabled={disabled} placeholder="Search" />
      </div>
    </div>
  );
};

export default SearchInput;
