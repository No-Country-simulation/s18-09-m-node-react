import { StatsDataI } from "@/types";
import React from "react";
// import { ChevronLeft, ChevronRight } from 'lucide-react'

/*interface EstadisticasData {
  fecha: string
  totalPausas: number
  tiempoTotalTrabajado: string
  duracionPausas: string
}*/

interface TableProps {
  //data: StatsDataI[]
  data: StatsDataI[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Table({
  data,
}: // currentPage,
// totalPages,
// onPageChange
TableProps) {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#E4E4E7]">
              <th className="px-6 py-3 font-inter text-left text-xs font-[17px] text-[#71717A] tracking-wider font-[600]">
                Fecha
              </th>
              <th className="px-6 py-3 font-inter text-center text-xs font-[17px] text-[#71717A] tracking-wider font-[600]">
                Total de pausas
              </th>
              <th className="px-6 py-3 font-inter text-center text-xs font-[17px] text-[#71717A] tracking-wider font-[600]">
                Tiempo total trabajado
              </th>
              <th className="px-6 py-3 font-inter text-end text-xs font-[17px] text-[#71717A] tracking-wider font-[600]">
                Duración de pausas
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#E4E4E7] text-[#09090B] font-[500] font-inter text-[14px] border-b border-[#E4E4E7]">
            {data.map((item, index) => (
              <tr key={index} className={"bg-white"}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.start_time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {item.real_break_count}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {item.real_focus_time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-end">
                  {item.real_break_time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center space-x-2 mt-4"></div>
    </div>
  );
}
