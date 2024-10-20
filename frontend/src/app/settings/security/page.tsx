import { Dashboard } from "@/components/ui/dashboard/Dashboard";

const Security: React.FC = () => {
  const items = [
    {
      value: "Notificaciones",
      href: "/settings/notifications",
      selected: false,
    },
    {
      value: "Seguridad",
      href: "/settings/security",
      selected: true,
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
      selected: false,
    },
  ];
  return (
    <Dashboard title="Configuración" items={items}>
      <h1>Seguridad</h1>
    </Dashboard>
  );
};

export default Security;
