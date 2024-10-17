'use client'

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: '¡Bienvenido a FocusBreak!',
    content: (
      <>
        <p className="mb-4">Mejora tu productividad y bienestar, un descanso a la vez.</p>
        <p className="mb-4">
          Con FocusBreak, gestiona tu tiempo de forma inteligente, alternando entre trabajo concentrado y pausas activas
          que revitalizan tu cuerpo y mente. Personaliza tus bloques de tiempo y descubre cómo lograr un equilibrio perfecto
          entre productividad y descanso.
        </p>
        <p>¡Empieza hoy a trabajar mejor y sentirte bien!</p>
      </>
    ),
  },
  {
    title: '¿Listo para empezar?',
    content: (
      <>
        <ul className="space-y-4 mb-6">
          <li className="flex items-start">
            <span className="mr-2 mt-1">✓</span>
            <span>
              <strong>Organiza tu Jornada</strong>
              <br />
              Comienza tu día con un solo clic. Inicia y finaliza tu jornada laboral, y deja que Break & Focus te ayude a gestionar tu tiempo de forma eficiente.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 mt-1">✓</span>
            <span>
              <strong>Configura tus Tiempos</strong>
              <br />
              Personaliza tus bloques de trabajo y descanso según tu ritmo. ¿Prefieres la Técnica Pomodoro o intervalos personalizados? Tú eliges.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 mt-1">✓</span>
            <span>
              <strong>Actívate con Pausas Saludables</strong>
              <br />
              Recibe recomendaciones de pausas activas: estiramientos, ejercicios y respiración para cuidar tu cuerpo mientras trabajas.
            </span>
          </li>
        </ul>
        <p className="text-center mb-4">
          Tu camino hacia un equilibrio más saludable entre trabajo y descanso comienza aquí.
        </p>
      </>
    ),
  },
];

export default function WelcomeModal() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    // Open the modal on the first page load
    setIsModalOpen(true);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden relative z-50">
              {/* Fondo oscuro semi-transparente */}
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" aria-hidden="true"></div>
              
              {/* Contenido del modal */}
              <div className="relative bg-white p-8 z-50 rounded-lg shadow-lg">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mb-4 text-center">
                      <div className="inline-block border border-gray-300 px-8 py-2">Logo</div>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-center">{slides[currentSlide].title}</h2>
                    <div className="mb-8">{slides[currentSlide].content}</div>
                    {currentSlide === 0 && (
                      <div className="flex justify-center mb-6">
                        <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                          <ImageIcon size={48} className="text-gray-400" />
                        </div>
                      </div>
                    )}
                    {currentSlide === slides.length - 1 && (
                      <Button
                        className="w-full"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Empezar Ahora
                      </Button>
                    )}
                    <div className="flex items-center justify-between mt-6">
                      {currentSlide > 0 ? (
                        <Button variant="outline" size="icon" onClick={prevSlide}>
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                      ) : (
                        <div className="w-9"></div>
                      )}
                      <div className="flex justify-center space-x-2">
                        {slides.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              currentSlide === index ? 'bg-primary' : 'bg-secondary'
                            }`}
                          />
                        ))}
                      </div>
                      {currentSlide < slides.length - 1 ? (
                        <Button variant="outline" size="icon" onClick={nextSlide}>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      ) : (
                        <div className="w-9"></div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
  
}