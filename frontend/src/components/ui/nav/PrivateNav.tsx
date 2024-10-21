"use client";

import { Drawer } from "@/components/Drawer";
import { UserMenu } from "@/components/UserMenu";
import { UserIcon } from "@/svg/UserIcon";
import { Menu } from "lucide-react";
import { useState } from "react";

type Props = {
  username?: string;
};

export const PrivateNav = ({ username }: Props) => {
  //drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
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
        <span className="sr-only">Perfil</span>
        <UserIcon />
      </button>
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
        onClick={toggleDrawer}
      >
        <span className="sr-only">Menú</span>
        <Menu
          className="h-6 w-6
                     text-[#0859A3]"
        />
      </button>
      <Drawer
        title="Configuración"
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
      />
      <UserMenu
        title={username ? username : "youremail@mail.com"}
        isUserMenuOpen={isUserMenuOpen}
        toggleUserMenu={toggleUserMenu}
      />
    </nav>
  );
};
