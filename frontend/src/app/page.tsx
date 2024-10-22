import { Button } from "@/components/ui/button";
import  HomeBrackground from "@/svg/main.svg";
import Image from "next/image";

export default function Home() {
  return (
    
    <div className=" bg-white relative">
    <div >
      <Image
        src={ HomeBrackground }
        alt="Fondo de oficina"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      
    </div>
    
    <div className="relative z-10">
     
      
      <main className="container px-4 py-8  flex items-center text-center min-h-[calc(70vh-80px)]">
        <div className=" ml-52 mt-1 max-w-xl min-h-[calc(60vh-80px)] space-y-6">
          <h1 className=" text-3xl  font-bold font-roboto text-tertiary">¡Bienvenido!</h1>
          <p className="text-xl text-cemter font-roboto  text-black">
            Con <span className="font-bold">Break&Focus</span>, gestiona tu tiempo de forma inteligente, <span className="font-bold">alternando entre trabajo concentrado y pausas activas.</span>
          </p>
          <p className="text-lg font-roboto font-semibold text-black">
            ¿Empiezas hoy a trabajar mejor y sentirte bien?
          </p>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg text-lg">
            Empezar Ahora
          </Button>
        </div>
      </main>
    </div>
  </div>
    
  );
}
