"use client";
import { Drawer } from "@/components/Drawer";
import { AppLogo } from "@/svg/AppLogo";
import { LoginIcon } from "@/svg/LoginIcon";
import { Menu } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export const Header = () => {
  //drawer
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

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
          <div
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
          </div>
        </div>
      </div>
    </header>
  );
};
