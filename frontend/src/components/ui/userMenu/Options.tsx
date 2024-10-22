import { X, LogOut, UserIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { StatsIcon } from "@/svg/StatsIcon";

interface OptionsProps {
    toggleOptions: () => void;

}

export const Options: React.FC<OptionsProps> = ({ toggleOptions }) => {
  return (
    <div className="p-6">
      <div className="flex justify-end items-center mb-6">
        <button onClick={toggleOptions} aria-label="Close user menu">
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Menu Links */}
      <nav className="space-y-4">
        <Link
          href="/profile"
          onClick={toggleOptions}
          className="h-[56px] font-roboto flex text-[#4A4459] items-center gap-4 text-lg font-light hover:text-blue-500"
        >
          <UserIcon />
          Perfil de Usuario
        </Link>

        <Link
          href="/statistics"
          onClick={toggleOptions}
          className="h-[36px] font-roboto flex text-[#4A4459] items-center gap-4 text-lg font-light hover:text-blue-500"
        >
          <StatsIcon />
          Estadísticas
        </Link>

        <Link
          href="/settings"
          onClick={toggleOptions}
          className="h-[56px] font-roboto flex text-[#4A4459] items-center gap-4 text-lg font-light hover:text-blue-500"
        >
          <SettingsIcon />
          Configuración
        </Link>

        <div className="w-full py-[6px]">
          <button
            onClick={() => {
            
              toggleOptions();
            }}
            className="text-white
                     font-roboto
                     m-auto
                     w-[272px]
                     h-[44px]
                     bg-[#47A896]
                     hover:bg-[#54c7a8]
                     text-lg
                     font-light
                     flex justify-center
                     items-center
                     rounded-[4px]
                     gap-4
                     transition-colors
                     duration-300
                     ease-in-out"
          >
            <LogOut className="h-5 w-5" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
