import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface DrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
  children: React.ReactNode;
  title: string;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, toggleDrawer, children, title }) => {
  return (
    <>
        {/* Overlay */}
        <AnimatePresence>
            {isOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
                onClick={toggleDrawer}
            />
            )}
        </AnimatePresence>

        {/* Drawer */}
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg z-50 overflow-y-auto"
                >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">{title}</h2>
                        <button onClick={toggleDrawer} aria-label="Close configuration drawer">
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    {children}
                </div>
                </motion.div>
            )}
        </AnimatePresence>
    </>
  );
};