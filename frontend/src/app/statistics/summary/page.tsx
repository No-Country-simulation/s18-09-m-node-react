'use client';

import { Dashboard } from "@/components/ui/dashboard/Dashboard";
import Table from "@/components/ui/Table";


import { useState } from 'react'

const estadisticasData = [
  { fecha: '15/10/24', totalPausas: 6, tiempoTotalTrabajado: '6 hrs 32 min', duracionPausas: '1 hrs 28 min' },
  { fecha: '14/10/24', totalPausas: 7, tiempoTotalTrabajado: '5 hrs 58 min', duracionPausas: '2 hrs 13 min' },
  { fecha: '13/10/24', totalPausas: 5, tiempoTotalTrabajado: '7 hrs 11 min', duracionPausas: '1 hrs 48 min' },
  { fecha: '12/10/24', totalPausas: 6, tiempoTotalTrabajado: '6 hrs 23 min', duracionPausas: '1 hrs 37 min' },
]
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
  
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(estadisticasData.length / 10);

  return (
    <Dashboard title="Estadísticas" items={items}>
    
    <div className="container mx-auto py-10">
    <Table
        data={estadisticasData}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>  
      
  
    </Dashboard>
  );
};

export default Summary;
