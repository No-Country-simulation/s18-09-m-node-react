"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HomeBrackground from "@/img/home.png";
import Image from "next/image";

export default function Home() {

  return (
    <div className="h-screen relative flex flex-col md:flex-row">
      <div className="absolute inset-0 z-0 md:hidden">
        <Image
          src={HomeBrackground}
          alt="Oficina con persona trabajando"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
      <div className="flex-1 md:flex-none md:w-1/3">
        <div className="relative z-10 max-w-md w-full p-6 text-center bg-white rounded-lg shadow-xl mx-auto md:mx-0 md:ml-10">
          <h1 className="text-2xl md:text-3xl font-bold font-roboto text-tertiary">¡Bienvenido!</h1>
          <p className="mb-4 text-gray-600 text-sm md:text-base">
            Con <span className="font-bold">Break&Focus</span>, gestiona tu tiempo de forma inteligente,
            <span className="font-bold">alternando entre trabajo concentrado y pausas activas.</span>
          </p>
          <p className="mb-6 text-gray-600 text-sm md:text-base">
            ¿Empiezas hoy a trabajar mejor y sentirte bien?
          </p>
          <Link href="/home">
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded">
              Empezar Ahora
            </Button>
          </Link>
        </div>
      </div>
      <div className="hidden md:flex-1 md:flex">
        <Image
          src={HomeBrackground}
          alt="Oficina con persona trabajando"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
    </div>

  );
}
