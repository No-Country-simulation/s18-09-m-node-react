import { AnimatePresence, motion } from "framer-motion";
import { NavigationItems } from "./NavigationItems";
import { CrossButton } from "./CrossButton";
import { appStore } from "@/store";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Confirmation } from "../userMenu/Confirmation";
import { LogoutButton } from "../userMenu/LogoutButton";

type Props = {
  isMenuOpen: boolean;
  toggleDrawer: () => void;
};

export const NavigationDrawer = ({ isMenuOpen, toggleDrawer }: Props) => {
  const [isConfirmMenuOpen, setIsConfirmMenuOpen] = useState(false);
  const logout = appStore((state) => state.logout);
  const router = useRouter();
  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {(isMenuOpen || isConfirmMenuOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed
                       -inset-6
                       bg-black
                       bg-opacity-50
                       backdrop-blur-sm
                       z-40"
            onClick={toggleDrawer}
          />
        )}
      </AnimatePresence>

      {/* Confirmation Menu */}
      <Confirmation
        isConfirmMenuOpen={isConfirmMenuOpen}
        setIsConfirmMenuOpen={setIsConfirmMenuOpen}
        logout={logout}
        router={router}
        toggleUserMenu={toggleDrawer}
      />

      <AnimatePresence>
        {isMenuOpen && !isConfirmMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed
                       top-0 right-0
                       w-full sm:w-[360px]
                       h-full bg-[#DFF7F2]
                       shadow-lg z-50
                       overflow-y-auto
                       rounded-2xl"
          >
            <CrossButton onClick={toggleDrawer} />
            <NavigationItems />
            <LogoutButton setIsConfirmMenuOpen={setIsConfirmMenuOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
