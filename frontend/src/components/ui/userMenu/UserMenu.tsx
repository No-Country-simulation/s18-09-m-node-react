"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { appStore } from "@/store";
import { useRouter } from "next/navigation";
import { Confirmation } from "./Confirmation";
// import { LogoutButton } from "./LogoutButton";

interface UserMenuProps {
  isMenuOpen: boolean;
  toggleUserMenu: () => void;
  children: React.ReactNode;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  isMenuOpen,
  toggleUserMenu,
  children,
}) => {
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
            className="fixed -inset-6 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={toggleUserMenu}
          />
        )}
      </AnimatePresence>

      {/* Confirmation Menu */}
      <Confirmation
        isConfirmMenuOpen={isConfirmMenuOpen}
        setIsConfirmMenuOpen={setIsConfirmMenuOpen}
        logout={logout}
        router={router}
        toggleUserMenu={toggleUserMenu}
      />

      {/* User Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && !isConfirmMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full sm:w-96 h-full bg-[#DFF7F2] shadow-lg z-50 overflow-y-auto"
          >
            {children}
            {/* <LogoutButton setIsConfirmMenuOpen={setIsConfirmMenuOpen} /> */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
