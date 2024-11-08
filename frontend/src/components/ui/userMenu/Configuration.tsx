import { useState } from "react";
import { X,ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SpotifyLogo } from "@/svg/SpotifyLogo";
import { Sound } from "@/svg/SoundIcon";
import { Time } from "@/svg/TimeIcon";
import { Fondo } from "@/svg/FondoIcon";
import { Separator } from "../separator";
import { useEffect} from "react";
import { Loader } from "@/components/ui/Loader";
import montaniaPinoImg from "@/img/montanias-pino.jpg";
import amanecerImg from "@/img/amanecer.jpg";
import montaniaGrisImg from "@/img/montanias-gris.jpg";
import montaniaCelesteImg from "@/img/montanias-celeste.jpg";
import montaniaRosaImg from "@/img/montanias-rosa.jpg";
import celesteImg from "@/img/celeste.jpg";
import verdeImg from "@/img/verde.jpg";
import maderaImg from "@/img/madera.jpg";
import arcoirisImg from "@/img/arcoiris.jpg";
import pastoImg from "@/img/pasto.jpg";

interface ConfigurationProps {
  toggleOptions: () => void;
}

const colorOptions = [
  { id: 1, bg: "bg-[#0390f1]" },
  { id: 2, bg: "bg-[#ecd3c6]" },
  { id: 3, bg: "bg-[#2cb8a7]" },
  { id: 4, bg: "bg-[#26b5a5]" },
  { id: 5, bg: "bg-[#cccafe]" },
  { id: 6, bg: "bg-[#e4bad7]" },
  { id: 7, bg: "bg-[#08b0f6]" },
  { id: 8, bg: "bg-[#7668fa]" }, // Peach
  { id: 9, bg: "bg-[#c1e2fb]" }, // Light purple
  { id: 10, bg: "bg-[#e2b8c7]" },
];

const setBgColor = (color: string) => {
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = color;
  localStorage.setItem("bgColor", color);
  localStorage.removeItem("bgImage");
};

const imageOptions = [
  { id: 1, src: montaniaPinoImg.src, alt: "montañas", isBlack:true},
  { id: 2, src: amanecerImg.src, alt: "amanecer", isBlack:false},
  { id: 3, src: montaniaGrisImg.src, alt: "montañas gris", isBlack:true},
  { id: 4, src: montaniaCelesteImg.src, alt: "montaña celeste", isBlack:true},
  { id: 5, src: montaniaRosaImg.src, alt: "montaña rosa", isBlack:true},
  { id: 6, src: celesteImg.src, alt: "celeste", isBlack:true},
  { id: 7, src: verdeImg.src, alt: "verde", isBlack:true},
  { id: 8, src: maderaImg.src, alt: "madera", isBlack:true},
  { id: 9, src: arcoirisImg.src, alt: "arcoiris", isBlack:true},
  { id: 10, src: pastoImg.src, alt: "pasto", isBlack:true},
];

const setBgImage = (imageUrl: string) => {
  document.body.style.backgroundImage = `url(${imageUrl})`;
  document.body.style.backgroundColor = "";
  localStorage.setItem("bgImage", imageUrl);
  localStorage.removeItem("bgColor");
};


export const Configuration: React.FC<ConfigurationProps> = ({ toggleOptions }) => {
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isColorGridVisible, setIsColorGridVisible] = useState(false);
  const [isImageGridVisible, setIsImageGridVisible] = useState(false);

  const toggleColorGrid = () => {
    setIsColorGridVisible(!isColorGridVisible);
    setIsImageGridVisible(false);
  };

  const toggleImageGrid = () => {
    setIsImageGridVisible(!isImageGridVisible);
    setIsColorGridVisible(false);
  };

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
    <>
      <div className="p-6">
        <div className="flex justify-end items-center mb-6">
          <button onClick={toggleOptions} aria-label="Close user menu">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Configuración de tiempo */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Time/>
            <h3 className="h-[56px] font-roboto flex text-[#2563eb] items-center gap-4 text-lg font-light">
              Tiempo (minutos)
            </h3>
          </div>
          <div className="flex gap-4">
            {/* Configuración del enfoque */}
            <div>
              <label htmlFor="focus-time" className="h-[20px] font-roboto flex text-[#4A4459] items-center text-md font-light mb-1">
                Enfoque
              </label>
              <input type="number" id="focus-time" className="font-roboto text-[#4A4459] w-20 p-2 border rounded" defaultValue={52} />
            </div>
            
            {/* Configuración del descanso */}
            <div>
              <label htmlFor="break-time" className="h-[20px] font-roboto flex text-[#4A4459] items-center text-md font-light mb-1">
                Descanso
              </label>
              <input type="number" id="break-time" className="font-roboto text-[#4A4459] w-20 p-2 border rounded" defaultValue={17} />
            </div>
          </div>
        </div>

        <Separator/>
        {/* Configuración de sonido */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Sound/>
            <h3 className="h-[56px] font-roboto flex text-[#2563eb] items-center text-lg font-light">
              Sonido
            </h3>
          </div>
        
          <div className="space-y-4">
            <div>
              <label htmlFor="alarm-sound" className="h-[20px] font-roboto flex text-[#4A4459] items-center text-md font-light mb-1">
                Sonido de Alarma
              </label>
              <select id="alarm-sound" className="font-roboto text-[#4A4459] w-full p-2 border rounded">
                <option>Birds</option>
              </select>
            </div>
            <div>
              <label htmlFor="focus-music" className="h-[20px] font-roboto flex text-[#4A4459] items-center text-md font-light mb-1">Música para enfocarme</label>
              <div className="flex items-center gap-2">
                <input type="text" id="focus-music" className="flex-grow p-2 border rounded" placeholder="Arma tu lista en" readOnly />
                <SpotifyLogo />
              </div>
            </div>
            <div>
              <label htmlFor="break-music" className="h-[20px] font-roboto flex text-[#4A4459] items-center text-md font-light mb-1">Música para el break</label>
              <div className="flex items-center gap-2">
                <input type="text" id="break-music" className="flex-grow p-2 border rounded" placeholder="Arma tu lista en" readOnly />
                <SpotifyLogo />
              </div>
            </div>
          </div>
        </div>
        
        <Separator/>
        {/* Configuración de fondo */}
        <div>
          <div className="flex items-center gap-2">
            <Fondo/>
            <h3 className="h-[56px] font-roboto flex text-[#2563eb] items-center gap-4 text-lg font-light">Fondo</h3>
          </div>
          <div className="flex gap-4">
            {/* Botón para seleccionar colores */}
            <button onClick={toggleColorGrid} className="bg-white font-roboto text-[#4A4459] flex-1 p-2 border rounded flex justify-between items-center">
              <span>Colores</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isColorGridVisible ? "rotate-180" : ""}`} />
            </button>

            {/* Botón para seleccionar imágenes */}
            <button onClick={toggleImageGrid} className="bg-white font-roboto text-[#4A4459] flex-1 p-2 border rounded flex justify-between items-center">
              <span>Imágenes</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isImageGridVisible ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Grid de colores */}
          <AnimatePresence>
            {isColorGridVisible && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <div className="grid grid-cols-5 gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.id}
                className={`w-full aspect-square rounded-md ${color.bg} border-2 ${selectedColor === color.id ? "border-blue-500" : "border-transparent"}`}
                onClick={() => {
                  setSelectedColor(color.id);
                  setBgColor(color.bg.replace('bg-', '').replace('[', '').replace(']', ''));
                }}
                aria-label={`Select color ${color.id}`}
              />
            ))}
          </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid de imágenes */}
          <AnimatePresence>
            {isImageGridVisible && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <div className="grid grid-cols-5 gap-2">
                  {imageOptions.map((image) => (
                    <button
                      key={image.id}
                      className={`w-full aspect-square rounded-md overflow-hidden border-2 ${selectedImage === image.id ? "border-blue-500" : "border-transparent"}`}
                      onClick={() => {

                        setSelectedImage(image.id);
                        setBgImage(image.src); // Establece la imagen de fondo y la guarda en localStorage
                      }}
                    >
                      <Loader />
                      <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};