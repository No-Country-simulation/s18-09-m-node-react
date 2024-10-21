"use client";

import { Drawer } from "@/components/Drawer";
import { LoginIcon } from "@/svg/LoginIcon";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const PublicNav = () => {
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
        href={"/login"}
        className="p-2
                         rounded-full
                         text-gray-400
                         hover:text-gray-500
                         focus:outline-none
                         focus:ring-2
                         focus:ring-offset-2
                         focus:ring-blue-500"
      >
        <span className="sr-only">Iniciar Sesión</span>
        <div className="relative">
          <LoginIcon />
          <div
            className="absolute
                             w-[66px]
                             text-[11px]
                             text-[#0859A3]
                             font-roboto
                             font-[400]
                             -left-[19px]
                             -bottom-[20px]"
          >
            Iniciar Sesión
          </div>
        </div>
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
      />
    </nav>
  );
};
