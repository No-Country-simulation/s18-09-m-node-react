"use client";

import { LogOut } from "lucide-react";
import { appStore } from "@/store";
import { toast } from "sonner";

type Props = {
  setIsConfirmMenuOpen: (value: boolean) => void;
};

export const LogoutButton = ({ setIsConfirmMenuOpen }: Props) => {
  const isUserLoggedIn = appStore.getState().user != null;
  // console.log("isUserLoggedIn", isUserLoggedIn)
  if (!isUserLoggedIn) {
    toast.error("Deberías iniciar sesión primero");
  }
  
  return (
    <div className="w-full py-[6px]">
      <button
      disabled={!isUserLoggedIn}
        onClick={() => {
          setIsConfirmMenuOpen(true);
        }}
        className={`text-white
                   font-roboto
                   m-auto
                   w-[272px]
                   h-[44px]
                   ${isUserLoggedIn ? "bg-[#47A896]" : "bg-[#757575]"}
                   hover:bg-[#54c7a8]
                   text-lg
                   font-light
                   flex justify-center
                   items-center
                   rounded-[4px]
                   gap-4
                   transition-colors
                   duration-300
                   ease-in-out`}
      >
        <LogOut className="h-5 w-5" />
        <span>Cerrar sesión</span>
      </button>
    </div>
  );
};
