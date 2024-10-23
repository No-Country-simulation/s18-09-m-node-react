"use client";

import { Dashboard } from "@/components/ui/dashboard/Dashboard";
import Table from "@/components/ui/Table";
import services from "@/services";
import { appStore } from "@/store";
import { SessionI, StatsDataI } from "@/types";
import {
  formatDateToDDMMYY,
  formatDurationFromMinutes,
} from "@/utils/formatUtils";

import { useEffect, useState } from "react";

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
  //const totalPages = Math.ceil(estadisticasData.length / 10);

  const [data, setData] = useState<StatsDataI[] | null>(null);
  const sessions = appStore((state) => state.sessions);
  const setSessions = appStore((state) => state.setSessions);
  const userId = appStore((state) => state.user?.userData?._id);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) setError(false);
    if (!userId) return;
    if (data) return;
    if (sessions) {
      setData(mapSessionData(sessions));
      return;
    }
    fetchData();
  }, [sessions, data, userId]);

  const fetchData = async () => {
    try {
      const response = await services.getSessions(userId);
      setSessions(response.data);
      setData(mapSessionData(response.data));
    } catch (error) {
      setError(true);
      console.error("Error fetching sessions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const mapSessionData = (data: SessionI[]) => {
    return data.map((item: SessionI) => {
      return {
        start_time: formatDateToDDMMYY(item.start_time),
        real_break_count: item.real_break_count,
        real_focus_time: formatDurationFromMinutes(item.real_focus_time),
        real_break_time: formatDurationFromMinutes(item.real_break_time),
      };
    });
  };

  if (isLoading)
    return (
      <Dashboard title="Estadísticas" items={items}>
        <div className="container mx-auto py-10">
          <h2>Cargando...</h2>
        </div>
      </Dashboard>
    );

  if (error)
    return (
      <Dashboard title="Estadísticas" items={items}>
        <div className="container mx-auto py-10">
          <h2>Error al intentar cargar las sesiones.</h2>
        </div>
      </Dashboard>
    );

  return (
    <Dashboard title="Estadísticas" items={items}>
      <div className="container mx-auto py-10">
        {!data || (data.length === 0 && <h2>No hay elementos que mostrar</h2>)}
        {data && (
          <Table
            data={data}
            currentPage={currentPage}
            totalPages={Math.ceil(data.length / 10)}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </Dashboard>
  );
};

export default Summary;
