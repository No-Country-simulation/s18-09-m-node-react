"use client";

import { LoginIcon } from "@/svg/LoginIcon";
import Link from "next/link";

export const PublicNav = () => {
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
    </nav>
  );
};
