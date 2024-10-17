import { Dashboard } from "@/components/ui/dashboard/Dashboard";

const Charts: React.FC = () => {
  const items = [
    {
      value: "Resumen de productividad",
      href: "/statistics/summary",
      selected: false,
    },
    {
      value: "Gráficos y visualizaciones",
      href: "/statistics/charts",
      selected: true,
    },
    { value: "Exportar datos", href: "/statistics/export", selected: false },
  ];
  return (
    <Dashboard title="Estadísticas" items={items}>
      <h1>Gráficos y visualizaciones</h1>
    </Dashboard>
  );
};

export default Charts;
