import { Dashboard } from "@/components/ui/dashboard/Dashboard";

const UsageHistory: React.FC = () => {
  const items = [
    {
      value: "Información Personal",
      href: "/profile/information",
      selected: false,
    },
    {
      value: "Preferencias de configuración",
      href: "/profile/configuration-preferences",
      selected: false,
    },
    {
      value: "Historial de uso",
      href: "/profile/usage-history",
      selected: true,
    },
  ];
  return (
    <Dashboard title="Perfil" items={items}>
      <h1>Historial de uso</h1>
    </Dashboard>
  );
};

export default UsageHistory;
