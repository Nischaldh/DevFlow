"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const pathname = usePathname();
  const userId = 1;
  return (
    <>
      {sidebarLinks.map((items) => {
        const isActive =
          (pathname.includes(items.route) && items.route.length > 1) ||
          pathname === items.route;
        if (items.route === "/profile") {
          if (userId) items.route = `${items.route}/${userId}`;
          else return null;
        }
        const LinkComponent = (
          <Link
            href={items.route}
            key={items.label}
            className={cn(
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300_light900",
              "flex items-center justify-start gap-4 bg-transparent p-4"
            )}
          >
            <Image
              src={items.imgURL}
              width={20}
              height={20}
              alt={items.label}
              className={cn({ "invert-colors": !isActive })}
            />
            <p
              className={cn(
                isActive ? "base-bold" : "base-medium",
                !isMobileNav && "max-lg:hidden"
              )}
            >
              {items.label}
            </p>
          </Link>
        );
        return isMobileNav ? (
          <SheetClose asChild key={items.route}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={items.route}>LinkComponent</React.Fragment>
        );
      })}
    </>
  );
};

export default NavLinks;
