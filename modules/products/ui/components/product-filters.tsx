"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import PriceFilter from "./price-filter";
import { useProductFilters } from "../../hooks/use-product-filters";

interface ProductFilterProps {
  title: string;
  clasName?: string;
  children: React.ReactNode;
}

const ProductFilter = ({ title, clasName, children }: ProductFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const Icon = isOpen ? ChevronDownIcon : ChevronUpIcon;

  return (
    <div className={cn("p-4 border-b flex flex-col gap-2", clasName)}>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="font-medium">{title}</p>
        <Icon className="size-5" />
      </div>
      {isOpen && children}
    </div>
  );
};

const ProductFilters = () => {
  const [filters, setFilters] = useProductFilters();

  const onChange = (key: keyof typeof filters, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="border rounded-md bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <p className="font-medium">Filters</p>
        <button className="underline" onClick={() => {}} type="button">
          Clear
        </button>
      </div>
      <ProductFilter title="Price" clasName="border-b-0">
        <PriceFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinPriceChange={(value) => onChange("minPrice", value)}
          onMaxPriceChange={(value) => onChange("maxPrice", value)}
        />
      </ProductFilter>
    </div>
  );
};

export default ProductFilters;
