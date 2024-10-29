"use client";
import { PrivateNav } from "@/components/ui/nav/PrivateNav";
import { PublicNav } from "@/components/ui/nav/PublicNav";
import { appStore } from "@/store";
import { AppLogo } from "@/svg/AppLogo";
import Link from "next/link";

export const Header = () => {
  const user = appStore((state) => state.user);
  const token = user?.token;

  return (
    <header className="bg-white shadow-sm">
      <div
        className="max-w-7xl
                   mx-auto
                   px-4
                   sm:px-6 lg:px-8
                   border-b-[1px]
                   border-[#19B69A]"
      >
        <div
          className="flex
                     justify-between
                     items-center
                     py-4"
        >
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <AppLogo />
            </Link>
          </div>
          {token ? <PrivateNav /> : <PublicNav />}
        </div>
      </div>
    </header>
  );
};
