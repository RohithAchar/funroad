import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

interface Props {
  items: NavbarItemProps[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NavbarSidebar = ({ items, open, onOpenChange }: Props) => {
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center">
            <SheetTitle>Menu</SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="flex flex-col h-full overflow-y-auto pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              href={item.href}
            >
              {item.children}
            </Link>
          ))}

          {session.data?.user ? (
            <div className="border-t">
              <Link
                className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                href="/admin"
              >
                Dashboard
              </Link>
            </div>
          ) : (
            <div className="border-t">
              <Link
                className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                href="/sign-in"
              >
                Sign In
              </Link>
              <Link
                className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                href="/sign-up"
              >
                Start Selling
              </Link>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarSidebar;
