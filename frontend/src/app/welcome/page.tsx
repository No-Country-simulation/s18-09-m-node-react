'use client'
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function OnboardingCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <div className="relative">
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
          {currentSlide === 1 && (
            <Link href="/home">
              <button className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors" >
                Empezar Ahora
              </button>
            </Link>
          )}
          <div className="flex items-center justify-between mt-6">
            {currentSlide > 0 ? (
              <button
                onClick={prevSlide}
                className="bg-white rounded-full p-1 shadow-md"
              >
                <ChevronLeft size={24} />
              </button>
            ) : (
              <div className="w-10"></div>
            )}
            <div className="flex justify-center space-x-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentSlide === index ? 'bg-gray-800' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            {currentSlide < slides.length - 1 ? (
              <button
                onClick={nextSlide}
                className="bg-white rounded-full p-1 shadow-md"
              >
                <ChevronRight size={24} />
              </button>
            ) : (
              <div className="w-10"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}