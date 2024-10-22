import { Dashboard } from "@/components/ui/dashboard/Dashboard";

const Settings: React.FC = () => {
  const items = [
    {
      value: "Notificaciones",
      href: "/settings/notifications",
      selected: false,
    },
    {
      value: "Seguridad",
      href: "/settings/security",
      selected: false,
    },
    { value: "Preguntas Frecuentes", href: "/settings/faq", selected: false },
    {
      value: "Tutoriales y Guías",
      href: "/settings/tutorials-and-guides",
      selected: false,
    },
    {
      value: "Contacto soporte",
      href: "/settings/contact-support",
      selected: true,
    },
  ];
  return (
    <Dashboard title="Configuración" items={items}>
      <h1>Contacto soporte</h1>
    </Dashboard>
  );
};

export default Settings;