"use client";
import Link  from "next/link";
import { Button } from "@/components/ui/button";
import HomeBrackground from "@/img/home.png";
import Image from "next/image";
import { useEffect} from "react";
import { useMediaQuery } from 'react-responsive';
import MobileLayout from "@/components/MobileLayout";

export default function Home() {

  // const [isMobile, setIsMobile] = useState(false);
  const isMobile = false;
  const isMobileScreen = useMediaQuery({ query: '(max-width: 500px)' }); // Detect screens less than 400px wide
  //Fondo personalizado
  useEffect(() => {
    const savedImage = localStorage.getItem("bgImage");
    const savedColor = localStorage.getItem("bgColor");
  
    if (savedImage) {
      document.body.style.backgroundImage = `url(${savedImage})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";
    } else if (savedColor) {
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundColor = savedColor;
    }
  }, []);

  return (
    <div className=" relative min-h-screen">
    {/* Conditionally render content based on screen size */}
    {isMobileScreen ? (
        <MobileLayout />
      ) : (
        <div>
        <div className={`absolute inset-0 z-0 ${isMobile ? 'w-full h-[520px]' : 'w-[200vh] h-[520px] sm:w-full md:w-full md:h-full'}`}>
          <Image
            src={HomeBrackground}
            alt="Oficina con persona trabajando"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
        </div>
        <div className="relative z-10 max-w-md w-full p-6 text-center bg-white rounded-lg shadow-xl ml-4 md:ml-16 lg:ml-24 ">
        <h1 className="text-3xl  font-bold font-roboto text-tertiary">¡Bienvenido!</h1>
        <p className="mb-4 text-gray-600">
        Con <span className="font-bold">Break&Focus</span>, gestiona tu tiempo de forma inteligente,
        <span className="font-bold">alternando entre trabajo concentrado y pausas activas.</span>
        </p>
        <p className="mb-6 text-gray-600">
          ¿Empiezas hoy a trabajar mejor y sentirte bien?
        </p>
        <Link href="/home">
          <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded">
            Empezar Ahora
          </Button>
        </Link>
      </div>
      </div>
      )}
    
  </div> 
  );
}
