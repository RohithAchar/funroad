"use client";

import { useState, useRef } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { CustomCategory } from "@/app/(app)/(home)/types";

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
    }, 50); // 50ms delay
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button
        asChild
        variant="elevated"
        className={cn(
          "rounded-full border-white hover:border-black text-base font-medium",
          isActive && "border-black"
        )}
      >
        <Link href={`/${category.slug}`}>{category.name}</Link>
      </Button>

      {isOpen && category.subcategories.length > 0 && (
        <div
          className="absolute left-0 mt-2 border rounded z-10 min-w-full w-60 shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
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
                    hoveredIndex === index ? "#000000" : "transparent",
                  color: hoveredIndex === index ? "#ffffff" : "#000000",
                  transition: "background-color 0.2s ease",
                  borderRadius: hoveredIndex === index ? "4px" : "0",
                  margin: "4px",
                  width: "calc(100% - 8px)",
                }}
              >
                {item.name}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
