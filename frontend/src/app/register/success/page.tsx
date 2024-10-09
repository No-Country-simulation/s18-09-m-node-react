import { CheckIcon } from "@/app/svg/CheckIcon";
import { Button } from "@/components/ui/button";
import React from "react";

const RegisterSuccess: React.FC = () => {
  return (
    <section
      className="flex
                 min-h-screen
                 flex-col
                 items-center
                 justify-center
                 bg-white p-4"
    >
      <CheckIcon />

      <h1
        className="mt-[9px]
                   mb-[48px]
                   w-[600px]
                   text-center
                   text-[40px]
                   font-bold
                   leading-[46px]"
      >
        ¡Registro exitoso!
      </h1>

      <div className="mb-[90px]">
        <p
          className="mb-[41px]
                     max-w-[923px]
                     text-center
                     font-roboto
                     text-2xl
                     font-normal
                     leading-[28.13px]"
        >
          Te enviamos un email para confirmar tu cuenta. Si no lo encuentras en
          tu bandeja de entrada, revisa en correo no deseado o spam.
        </p>

        <a
          href="#"
          className="block w-full
                     text-right
                     no-underline
                     text-[20px]
                     text-center
                     text-2xl
                     font-roboto
                     leading-[63px]
                     text-black
                     font-[700]
                     hover:text-blue-600
                     transition-colors duration-300"
        >
          Reenviar email de confirmación
        </a>
      </div>

      <div className="w-[454px]">
        <Button asChild className="w-full">
          <a href="/">Ir a la página de inicio</a>
        </Button>
      </div>
    </section>
  );
};

export default RegisterSuccess;
