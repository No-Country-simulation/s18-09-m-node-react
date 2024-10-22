"use client";

import { Drawer } from "@/components/ui/userMenu/Drawer";
import { DrawerConfig } from "@/components/ui/userMenu/Configuration";
import { UserIcon } from "@/svg/UserIcon";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const PrivateNav = () => {
  //drawer
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

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
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
      >
        <DrawerConfig/>
      </Drawer>
    </nav>
  );
};
