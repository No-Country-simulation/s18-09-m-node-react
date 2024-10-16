"use client";

import { appStore } from "@/store";

export const Loader = () => {
  const isLoaderVisible = appStore((state) => state.isLoaderVisible);

  if (!isLoaderVisible) return;

  return (
    <div className="fixed inset-0 z-[400] flex flex-col items-center justify-center bg-white">
      <div className="mb-8 h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 md:h-20 md:w-20"></div>
      <h2 className="mb-4 text-center font-roboto text-2xl font-normal leading-[28.13px] md:text-3xl">
        Cargando...
      </h2>
      <p className="w-full max-w-[454px] px-4 text-center font-roboto text-lg font-normal leading-[21.09px] text-gray-600 md:text-xl">
        Esto puede tomar unos segundos, por favor espera.
      </p>
    </div>
  );
};
