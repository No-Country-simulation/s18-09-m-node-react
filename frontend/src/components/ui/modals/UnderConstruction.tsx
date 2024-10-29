import { Construction } from "lucide-react";

export const UnderConstruction = () => {
  return (
    <div className="rounded-lg px-8 pt-8 pb-24 text-center">
      <Construction className="mx-auto text-[#0859A3] mb-4" size={48} />
      <h3 className="text-2xl font-bold text-[#0859A3] mb-2">
        En Construcción
      </h3>
      <p className="text-gray-600">
        Estamos trabajando para mejorar tu experiencia. Pronto tendrás acceso a
        todas tus notificaciones aquí.
      </p>
    </div>
  );
};
