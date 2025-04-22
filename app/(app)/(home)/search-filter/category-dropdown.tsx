"use client";

import { useState, useRef } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { CustomCategory } from "../types";
import { cn } from "@/lib/utils";

interface Props {
  category: CustomCategory;
  isActive?: boolean;
}

const CategoryDropdown = ({ category, isActive }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Add delay before closing to prevent accidental closes
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setHoveredIndex(null); // Reset hovered state when dropdown closes
    }, 100); // 100ms delay
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button
        variant="elevated"
        className={cn(
          "rounded-full border-white hover:border-black text-base font-medium",
          isActive && "border-black"
        )}
      >
        <Link href={`/${category.slug}`}>{category.category}</Link>
      </Button>

      {isOpen && category.subcategories.length > 0 && (
        <div
          className="absolute left-0 mt-2 border border-gray-200 rounded z-10 min-w-full w-60 shadow-lg"
          style={{ backgroundColor: category.color || "#fff" }}
        >
          {category.subcategories.length > 0 &&
            category.subcategories?.map((item, index) => (
              <Link
                key={item.id || item.slug}
                href={`/${category.slug}/${item.slug}`}
                className="block p-4 font-medium text-base underline"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  backgroundColor:
                    hoveredIndex === index
                      ? "rgba(0, 0, 0, 0.07)"
                      : "transparent",
                  transition: "background-color 0.2s ease",
                  borderRadius: hoveredIndex === index ? "4px" : "0",
                  margin: "4px",
                  width: "calc(100% - 8px)",
                }}
              >
                {item.category}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
