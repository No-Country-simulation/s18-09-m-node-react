import { X, UserIcon, SettingsIcon } from "lucide-react";
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
      </nav>
    </div>
  );
};
