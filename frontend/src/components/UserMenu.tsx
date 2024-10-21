"use client";

import { X, User, BarChart, Settings, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { appStore } from "@/store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface MenuProps {
  title: string;
  isUserMenuOpen: boolean;
  toggleUserMenu: () => void;
}

export const UserMenu: React.FC<MenuProps> = ({
  title,
  isUserMenuOpen,
  toggleUserMenu,
}) => {
  const [isConfirmMenuOpen, setIsConfirmMenuOpen] = useState(false);
  const logout = appStore((state) => state.logout);
  const router = useRouter();

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {(isUserMenuOpen || isConfirmMenuOpen) && (
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

      {/* Drawer */}
      <AnimatePresence>
        {isConfirmMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => {
                    setIsConfirmMenuOpen(false);
                  }}
                  aria-label="Close confirmation drawer"
                  className="ml-auto"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <h2 className="text-[18px] mb-4 font-bold">Cerrar sesión</h2>

              {/* Confirmation Message */}
              <div className="text-lg font-light mb-6">
                ¿Estás seguro de que quieres cerrar la sesión? Tendrás que
                volver a iniciar sesión para acceder a tu cuenta.
              </div>

              {/* Confirmation Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setIsConfirmMenuOpen(false);
                    logout();
                    router.push("/login");
                    toast.success("Has cerrado sesión correctamente.");
                  }}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Sí, cerrar sesión
                </button>
                <button
                  onClick={() => {
                    toggleUserMenu();
                    setIsConfirmMenuOpen(false);
                  }} // Asegúrate de que este botón cierre solo el menú de confirmación
                  className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isUserMenuOpen &&
          !isConfirmMenuOpen && ( // Verifica que isConfirmMenuOpen sea falso
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-4">
                  <div>
                    <h2>Mi cuenta</h2>
                    <span className="text-[14px] font-[400] font-inter">
                      {title}
                    </span>
                  </div>
                  <button
                    onClick={toggleUserMenu}
                    aria-label="Close configuration drawer"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Menu Links */}
                <nav className="space-y-4">
                  <Link
                    href="/profile"
                    onClick={toggleUserMenu}
                    className="flex items-center gap-4 text-lg font-light hover:text-blue-500"
                  >
                    <User className="h-5 w-5" />
                    Mi perfil
                  </Link>

                  <Link
                    href="/statistics"
                    onClick={toggleUserMenu}
                    className="flex items-center gap-4 text-lg font-light hover:text-blue-500"
                  >
                    <BarChart className="h-5 w-5" />
                    Estadísticas
                  </Link>

                  <Link
                    href="/settings"
                    onClick={toggleUserMenu}
                    className="flex items-center gap-4 text-lg font-light hover:text-blue-500"
                  >
                    <Settings className="h-5 w-5" />
                    Configuración
                  </Link>

                  <button
                    onClick={() => {
                      setIsConfirmMenuOpen(true);
                      toggleUserMenu();
                    }}
                    className="flex items-center gap-4 text-lg font-light hover:text-red-500"
                  >
                    <LogOut className="h-5 w-5" />
                    Cerrar sesión
                  </button>
                </nav>
              </div>
            </motion.div>
          )}
      </AnimatePresence>
    </>
  );
};
