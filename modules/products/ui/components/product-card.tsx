"use client";

import { generateTenantURL } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: string;
  name: string;
  imageUrl?: string | null;
  tenantSubdomain: string;
  tenantImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
  price: number;
}

const ProductCard = ({
  id,
  name,
  imageUrl,
  tenantSubdomain,
  tenantImageUrl,
  reviewRating,
  reviewCount,
  price,
}: ProductCardProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    router.push(generateTenantURL(tenantSubdomain));
  };

  return (
    <Link href={`/products/${id}`}>
      <div className="hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow border rounded-md bg-white overflow-hidden h-full flex flex-col">
        <div className="relative aspect-square">
          <Image
            alt={name}
            fill
            src={imageUrl || "/images.jpeg"}
            className="object-cover"
          />
        </div>
        <div className="p-4 border-y flex flex-col gap-3 flex-1">
          <h2 className="text-lg font-medium line-clamp-4">{name}</h2>
          <div className="flex items-center gap-2" onClick={handleClick}>
            {tenantImageUrl && (
              <Image
                alt={tenantSubdomain}
                src={tenantImageUrl}
                className="rounded-full border shrink-0 size-[16px]"
                width={16}
                height={16}
              />
            )}
            <p className="text-sm underline font-medium">{tenantSubdomain}</p>
          </div>
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <StarIcon className="size-3.5 fill-black" />
              <p className="text-sm font-medium">
                {reviewRating} ({reviewCount})
              </p>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="relative px-2 py-1 border bg-pink-400 w-fit">
            <p className="text-sm font-medium">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }).format(price)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

export const ProductCardSkeleton = () => {
  return (
    <div className="border rounded-md bg-white overflow-hidden h-full flex flex-col">
      <div className="relative aspect-square">
        <div className="absolute inset-0 bg-gray-100 opacity-50" />
        <div className="absolute inset-0 bg-gray-200 opacity-50" />
      </div>
      <div className="p-4 border-y flex flex-col gap-3 flex-1">
        <div className="h-4 w-full rounded-md bg-gray-100 animate-pulse" />
        <div className="h-4 w-full rounded-md bg-gray-100 animate-pulse" />
      </div>
      <div className="p-4">
        <div className="relative px-2 py-1 border bg-pink-400 w-fit">
          <div className="h-4 w-full rounded-md bg-gray-100 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
