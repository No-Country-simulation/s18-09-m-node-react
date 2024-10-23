import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ConfirmationProps {
  isConfirmMenuOpen: boolean;
  setIsConfirmMenuOpen: (open: boolean) => void;
  logout: () => void;
  router: ReturnType<typeof useRouter>;
  toggleUserMenu: () => void;
}

export const Confirmation: React.FC<ConfirmationProps> = ({
  isConfirmMenuOpen,
  setIsConfirmMenuOpen,
  logout,
  router,
  toggleUserMenu,
}) => {
  return (
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
              ¿Estás seguro de que quieres cerrar la sesión? Tendrás que volver a
              iniciar sesión para acceder a tu cuenta.
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
  );
};
