import { Dashboard } from "@/components/ui/dashboard/Dashboard";

const Profile: React.FC = () => {
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
      selected: false,
    },
  ];
  return <Dashboard title="Perfil" items={items}></Dashboard>;
};

export default Profile;
