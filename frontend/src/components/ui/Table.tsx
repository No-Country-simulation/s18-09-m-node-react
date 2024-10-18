import React from 'react'
// import { ChevronLeft, ChevronRight } from 'lucide-react'

interface EstadisticasData {
  fecha: string
  totalPausas: number
  tiempoTotalTrabajado: string
  duracionPausas: string
}

interface TableProps {
  data: EstadisticasData[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Table({
  data,
  // currentPage,
  // totalPages,
  // onPageChange
}: TableProps) {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total de pausas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiempo total trabajado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duración de pausas</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.fecha}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.totalPausas}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tiempoTotalTrabajado}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.duracionPausas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center space-x-2 mt-4">
        

        {/* <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 border rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`px-3 py-1 border rounded text-sm font-medium ${
              currentPage === i + 1
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 bg-white hover:bg-gray-50'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 border rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>*/} 
      </div>
    </div>
  )
}