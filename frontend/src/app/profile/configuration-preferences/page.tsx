import { Dashboard } from "@/components/ui/dashboard/Dashboard";

const ConfigPreferences: React.FC = () => {
  const items = [
    {
      value: "Información Personal",
      href: "/profile/information",
      selected: false,
    },
    {
      value: "Preferencias de configuración",
      href: "/profile/configuration-preferences",
      selected: true,
    },
    {
      value: "Historial de uso",
      href: "/profile/usage-history",
      selected: false,
    },
  ];
  return (
    <Dashboard title="Perfil" items={items}>
      <h1>Preferencias de configuración</h1>
    </Dashboard>
  );
};

export default ConfigPreferences;
