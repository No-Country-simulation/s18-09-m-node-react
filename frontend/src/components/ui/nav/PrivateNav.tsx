"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { NavigationDrawer } from "../drawer/NavigationDrawer";

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
      {/*<Link
        href={"/profile"}
        className="p-2
                   rounded-full
                   text-gray-400
                   hover:text-gray-500
                   focus:outline-none"
      >
        <span className="sr-only">Perfil</span>
        <UserIcon />
      </Link>*/}
      <button
        type="button"
        className="p-2
                   rounded-full
                   text-gray-400
                   hover:text-gray-500
                   focus:outline-none"
        onClick={toggleUserMenu}
      >
        <span className="sr-only">Menú</span>
        <Menu
          className="h-6 w-6
                     text-[#0859A3]"
        />
      </button>
      {isUserMenuOpen && (
        <NavigationDrawer
          isMenuOpen={isUserMenuOpen}
          toggleDrawer={toggleUserMenu}
        />
      )}
    </nav>
  );
};
