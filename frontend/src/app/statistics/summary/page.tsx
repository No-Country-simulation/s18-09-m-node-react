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
import { AxiosError } from "axios";

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

  const mapSessionData = (data: SessionI[] | null) => {
    if (!data) return null;
    return data.map((item: SessionI) => {
      return {
        start_time: formatDateToDDMMYY(new Date(item.start_time)),
        real_break_count: item.real_break_count,
        real_focus_time: formatDurationFromMinutes(item.real_focus_time),
        real_break_time: formatDurationFromMinutes(item.real_break_time),
      };
    });
  };

  const sessions = appStore((state) => state.sessions);
  const setSessions = appStore((state) => state.setSessions);
  const userId = appStore((state) => state.user?.userData?._id);
  const [data, setData] = useState<StatsDataI[] | null>(mapSessionData(sessions));
  const [error, setError] = useState(false);
  let isLoading = !data && !error;

  useEffect(() => {
    if (!userId) return;
    if (data && sessions) return;

    if (!sessions) fetchData();
    if (sessions) setData(mapSessionData(sessions))
  }, [sessions, data, userId]);

  const fetchData = async () => {
    try {
      const response = await services.getSessions(userId);
      setSessions(response.data.data);
      setData(mapSessionData(response.data.data))
    } catch (error) {
      if (error instanceof AxiosError
        && error.response?.data.message === errorObject.message
        && error.response?.data.success === errorObject.success
      ) {
        setSessions([])
      } else {
        setError(true);
        console.error("Error fetching sessions:", error);
      }
    }
  };

  return (
    <Dashboard title="Estadísticas" items={items}>
      <div className="container mx-auto py-10">

        {isLoading && renderLoading()}

        {error && renderError()}

        {data?.length === 0 && renderNoSessions()}

        {data && data?.length !== 0 && (
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

const errorObject = {
  "message": "Sessions not found.",
  "success": false
}

const renderLoading = () => {
  return <h2>Cargando Datos...</h2>;
};

const renderError = () => {
  return <h2>Error al intentar cargar las sesiones.</h2>;
};

const renderNoSessions = () => {
  return <h2>No hay sesiones guardadas.</h2>;
};
