import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'
import Movil from "@/img/HomeBg.webp"

export default function MobileLayout() {
    
  return (
    <>
    <div className=" flex flex-col items-center justify-center">
    
        
        <div className="w-full ml-11 h-[600px] mt-36">
          <Image
            src={Movil}
            alt="Oficina con persona trabajando"
            quality={100}
            priority
          />
        </div>
        <div className="flex flex-col text-start mr-24 mt-[-600px]  p-4 text-[12px] ">
        <p className=" mb-4 text-gray-600">
        Con <span className="font-bold">Break&Focus</span>, gestiona tu tiempo de forma inteligente,
        <span className="font-bold">alternando entre trabajo concentrado y pausas activas.</span>
        </p>
        <p className="mb-6 mr-8 text-gray-600 font-extrabold">
          ¿Empiezas hoy a trabajar mejor y sentirte bien?
        </p>
        
      </div>
      
      </div>
      <div className='mt-72 p-4'>
        <Link href="/home">
        <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded">
          Empezar Ahora
        </Button>
        </Link>

        </div>
      </>
  
  
  )
}
