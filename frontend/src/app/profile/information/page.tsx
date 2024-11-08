import ProfileInfoForm from "@/components/ProfileInfo";
import { Dashboard } from "@/components/ui/dashboard/Dashboard";

const ProfileInformation: React.FC = () => {
  const items = [
    {
      value: "Información Personal",
      href: "/profile/information",
      selected: true,
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
  return (
    <Dashboard title="Perfil" items={items}>
      <ProfileInfoForm />
    </Dashboard>
  );
};

export default ProfileInformation;
