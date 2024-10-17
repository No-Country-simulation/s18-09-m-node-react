import { Dashboard } from "@/components/ui/dashboard/Dashboard";

const Summary: React.FC = () => {
  const items = [
    {
      value: "Resumen de productividad",
      href: "/statistics/summary",
      selected: true,
    },
    {
      value: "Gráficos y visualizaciones",
      href: "/statistics/charts",
      selected: false,
    },
    { value: "Exportar datos", href: "/statistics/export", selected: false },
  ];

  return (
    <Dashboard title="Estadísticas" items={items}>
      <h1>Resumen de Productividad</h1>
    </Dashboard>
  );
};

export default Summary;
