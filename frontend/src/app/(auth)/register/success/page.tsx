import { CheckIcon } from "@/svg/CheckIcon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const RegisterSuccess: React.FC = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <CheckIcon />

      <h1
        className="mt-[11px] mb-12 w-full text-center text-[28px] font-bold leading-[34px] text-[#0859A3] 
                   md:w-[600px] md:text-[40px] md:leading-[46px]"
      >
        ¡Registro exitoso!
      </h1>

      <div className="mb-12 md:mb-[90px]">
        <p
          className="mb-8 max-w-[340px] text-center font-roboto text-lg font-normal leading-6 
                     md:mb-[41px] md:max-w-[762px] md:text-[24px] md:leading-[28.13px]"
        >
          Te enviamos un email para confirmar tu cuenta. Si no lo encuentras en
          tu bandeja de entrada, revisa en correo no deseado o spam.
        </p>

        <a
          href="#"
          className="block w-full text-center no-underline text-[16px] font-bold leading-[24px] text-black 
                     hover:text-blue-600 transition-colors duration-300 
                     md:text-right md:text-[20px] md:leading-[28px]"
        >
          Reenviar email de confirmación
        </a>
      </div>

      <div className="w-full max-w-[300px] md:max-w-[454px]">
        <Button asChild variant="customBlue" size="lg" className="w-full">
          <Link href="/">Ir a la página de inicio</Link>
        </Button>
      </div>
    </section>
  );
};

export default RegisterSuccess;
