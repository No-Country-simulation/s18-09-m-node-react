"use client";

import { UserMenu } from "@/components/UserMenu";
import { UserIcon } from "@/svg/UserIcon";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const PrivateNav = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <nav
      className="flex
                 items-center
                 space-x-6"
    >
      {" "}
      {/* Aumenté el espacio aquí */}
      <Link
        href={"/profile"}
        className="p-2
                   rounded-full
                   text-gray-400
                   hover:text-gray-500
                   focus:outline-none
                   focus:ring-2
                   focus:ring-offset-2
                   focus:ring-blue-500"
      >
        <span className="sr-only">Perfil</span>
        <UserIcon />
      </Link>
      <button
        type="button"
        className="p-2
                   rounded-full
                   text-gray-400
                   hover:text-gray-500
                   focus:outline-none
                   focus:ring-2
                   focus:ring-offset-2
                   focus:ring-blue-500"
        onClick={toggleUserMenu}
      >
        <span className="sr-only">Menú</span>
        <Menu
          className="h-6 w-6
                     text-[#0859A3]"
        />
      </button>
      <UserMenu
        isUserMenuOpen={isUserMenuOpen}
        toggleUserMenu={toggleUserMenu}
      />
    </nav>
  );
};
