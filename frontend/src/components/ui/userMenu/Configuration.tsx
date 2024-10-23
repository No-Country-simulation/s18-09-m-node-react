import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SpotifyLogo } from "@/svg/SpotifyLogo";

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

const imageOptions = [
  {
    id: 1,
    src: "https://www.xtrafondos.com/thumbs/webp/1_10205.webp",
    alt: "Nature",
  },
  {
    id: 2,
    src: "https://www.xtrafondos.com/thumbs/webp/1_8607.webp",
    alt: "City",
  },
  {
    id: 3,
    src: "https://www.xtrafondos.com/thumbs/webp/1_12610.webp",
    alt: "Abstract",
  },
  {
    id: 4,
    src: "https://www.xtrafondos.com/thumbs/webp/1_5931.webp",
    alt: "Texture",
  },
  {
    id: 5,
    src: "https://www.xtrafondos.com/thumbs/webp/1_7819.webp",
    alt: "Texture",
  },
  {
    id: 6,
    src: "https://www.xtrafondos.com/thumbs/webp/1_8359.webp",
    alt: "Texture",
  },
  {
    id: 7,
    src: "https://www.xtrafondos.com/thumbs/webp/1_12754.webp",
    alt: "Texture",
  },
  {
    id: 8,
    src: "https://www.xtrafondos.com/thumbs/webp/1_12163.webp",
    alt: "Texture",
  },
  {
    id: 9,
    src: "https://www.xtrafondos.com/thumbs/webp/1_7888.webp",
    alt: "Texture",
  },
  {
    id: 10,
    src: "https://www.xtrafondos.com/thumbs/webp/1_3148.webp",
    alt: "Texture",
  },
];

export const Configuration: React.FC = () => {
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

  return (
    <>
      {/* Configuración de tiempo */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Tiempo (minutos)</h3>
        <div className="flex gap-4">
          {/* Configuración del enfoque */}
          <div>
            <label htmlFor="focus-time" className="block text-sm mb-1">Enfoque</label>
            <input type="number" id="focus-time" className="w-20 p-2 border rounded" defaultValue={52} />
          </div>
          {/* Configuración del descanso */}
          <div>
            <label htmlFor="break-time" className="block text-sm mb-1">Descanso</label>
            <input type="number" id="break-time" className="w-20 p-2 border rounded" defaultValue={17} />
          </div>
        </div>
      </div>

      {/* Configuración de sonido */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Sonido</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="alarm-sound" className="block text-sm mb-1">Sonido de Alarma</label>
            <select id="alarm-sound" className="w-full p-2 border rounded">
              <option>Birds</option>
            </select>
          </div>
          <div>
            <label htmlFor="focus-music" className="block text-sm mb-1">Música para enfocarme</label>
            <div className="flex items-center gap-2">
              <input type="text" id="focus-music" className="flex-grow p-2 border rounded" placeholder="Arma tu lista en" readOnly />
              <SpotifyLogo />
            </div>
          </div>
          <div>
            <label htmlFor="break-music" className="block text-sm mb-1">Música para el break</label>
            <div className="flex items-center gap-2">
              <input type="text" id="break-music" className="flex-grow p-2 border rounded" placeholder="Arma tu lista en" readOnly />
              <SpotifyLogo />
            </div>
          </div>
        </div>
      </div>

      {/* Configuración de fondo */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Fondo</h3>
        <div className="flex gap-4">
          {/* Botón para seleccionar colores */}
          <button onClick={toggleColorGrid} className="flex-1 p-2 border rounded flex justify-between items-center">
            <span>Colores</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isColorGridVisible ? "rotate-180" : ""}`} />
          </button>

          {/* Botón para seleccionar imágenes */}
          <button onClick={toggleImageGrid} className="flex-1 p-2 border rounded flex justify-between items-center">
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
                    onClick={() => setSelectedColor(color.id)}
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
                    onClick={() => setSelectedImage(image.id)}
                  >
                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};