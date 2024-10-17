"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ArrowLeftRight, Menu, Edit2, X } from "lucide-react";
{/*import WelcomeModal from "@/components/ui/WelcomeModal"; */}
import { Drawer } from '@/components/Drawer'

type TimerMode = "pomodoro" | "52-17" | "pausas-activas";

interface TimerConfig {
  workDuration: number;
  breakDuration: number;
  description: JSX.Element;
}

const timerConfigs: Record<TimerMode, TimerConfig> = {
  pomodoro: {
    workDuration: 0.1 * 60,
    breakDuration: 0.1 * 60,
    description: (
      <div className="relative px-6 py-4">
        <span className="font-bold">
          Maximiza tu productividad con intervalos de enfoque y descansos
          estratégicos.
        </span>
        <br />
        <span className="font-bold">
          La Técnica Pomodoro divide tu tiempo de trabajo en sesiones de 25
          minutos de concentración plena, seguidas de 5 minutos de descanso.
        </span>
        <br />
        Este ciclo te ayuda a mantener la motivación, reducir la procrastinación
        y evitar el agotamiento, permitiéndote lograr más en menos tiempo
        mientras cuidas tu bienestar mental.
        <button className="absolute bottom-4 right-4 bg-pink-50 p-2 rounded-md">
          <Edit2 className="h-4 w-4 text-purple-600" />
        </button>
      </div>
    ),
  },
  "52-17": {
    workDuration: 52 * 60,
    breakDuration: 17 * 60,
    description: (
      <div className="relative px-6 py-4">
        <span className="font-bold">
          Optimiza tu rendimiento con sesiones largas y descansos estratégicos.
        </span>
        <br />
        <span className="font-bold">
          La Técnica 52/17 propone trabajar durante 52 minutos de concentración
          profunda, seguidos de 17 minutos de descanso.
        </span>
        <br />
        Este método te permite mantener un enfoque sostenido en tareas
        importantes, mientras los descansos regulares te ayudan a renovar
        energías y prevenir el agotamiento.
        <button className="absolute bottom-4 right-4 bg-pink-50 p-2 rounded-md">
          <Edit2 className="h-4 w-4 text-purple-600" />
        </button>
      </div>
    ),
  },
  "pausas-activas": {
    workDuration: 55 * 60,
    breakDuration: 5 * 60,
    description: (
      <div className="relative px-6 py-4">
        Incorpora breves pausas de actividad física durante tu jornada laboral.
        <button className="absolute bottom-4 right-4 bg-pink-50 p-2 rounded-md">
          <Edit2 className="h-4 w-4 text-purple-600" />
        </button>
      </div>
    ),
  },
};

export default function Home() {
  const [time, setTime] = useState(52 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>("52-17");
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [buttonText, setButtonText] = useState("Meditar");

  const showSystemNotification = useCallback((message: string) => {
    if (Notification.permission === "granted") {
      new Notification(message, {
        body: "Descansa tus ojos. Estira tus piernas. Respira. Relájate.",
      });
    }
  }, []);

  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const resetTimer = useCallback(() => {
    const config = timerConfigs[mode];
    setTime(config.workDuration);
    setIsWorkTime(true);
  }, [mode]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsRunning(false);
    setIsWorkTime(true);
    setTime(timerConfigs[newMode].workDuration);
  };

  const buttonOptions = useMemo(
    () => ["Meditar", "Estiramientos", "Respirar"],
    []
  );

  const getRandomButtonText = useCallback(() => {
    return buttonOptions[Math.floor(Math.random() * buttonOptions.length)];
  }, [buttonOptions]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isWorkTime) {
      setIsWorkTime(false);
      setTime(timerConfigs[mode].breakDuration);
      setShowNotification(true);
      showSystemNotification("¡Es hora de tu break!");
      setIsRunning(false); // Pause until notification is closed
      setButtonText(getRandomButtonText());
    } else if (time === 0 && !isWorkTime) {
      resetTimer(); // Reset to work time
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    isRunning,
    time,
    mode,
    isWorkTime,
    getRandomButtonText,
    showSystemNotification,
    resetTimer,
  ]);

  const closeNotification = () => {
    setShowNotification(false);
    setIsRunning(true);
  };

  //modal
  // const [isModalOpen, setIsModalOpen] = useState(true); // Inicialmente el modal está abierto

  // const handleCloseModal = () => {
  //   // setIsModalOpen(false); // Cerrar el modal
  // };

  //drawer
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = () => setIsOpen(!isOpen)
  
  return (
    <div className="min-h-screen bg-white">
      <header className="container mx-auto flex justify-between items-center p-4 border-b">
        <div className="text-2xl font-bold border border-gray-300 px-2">
          Logo
        </div>
        <div className="flex gap-4">
          <ArrowLeftRight className="h-5 w-5" />
          <button
          onClick={toggleDrawer}
          className="right-4 z-50"
          aria-label="Toggle configuration drawer"
          >
            <Menu className="h-5 w-5" />
         </button>
         <Drawer title="Configuración" isOpen={isOpen} toggleDrawer={toggleDrawer} />
        </div>
      </header>

      <main className="text-2xl md:container md:mx-auto px-4 py-8 max-w-2xl">
        <h2 className="text-center mb-8 text-gray-600">
          Escoge la opción que más se ajuste a tu estilo de trabajo y comienza a
          maximizar tu productividad y bienestar
        </h2>

        <div className="flex justify-around mb-4 bg-pink-50 py-4 px-5">
          <button
            className={`text-md  ${
              mode === "pomodoro"
                ? "text-purple-600 font-bold"
                : "text-gray-600"
            }`}
            onClick={() => switchMode("pomodoro")}
          >
            Técnica Pomodoro
          </button>
          <button
            className={`text-md ${
              mode === "52-17" ? "text-purple-600 font-bold" : "text-gray-600"
            }`}
            onClick={() => switchMode("52-17")}
          >
            Técnica 52/17
          </button>
          <button
            className={`text-md  ${
              mode === "pausas-activas"
                ? "text-purple-600 font-bold"
                : "text-gray-600"
            }`}
            onClick={() => switchMode("pausas-activas")}
          >
            Técnica Pausas Activas
          </button>
        </div>
        <span className="text-xd text-gray-600 mb-8">
          {timerConfigs[mode].description}
        </span>

        <div className=" text-center mb-8">
          <div className="container mx-auto bg-gray-100 rounded-2xl p-8 w-80 text-center">
            <div className="py-4 px-5 text-8xl font-bold mb-6">
              {formatTime(time)}
            </div>
          </div>
          <button
            onClick={toggleTimer}
            className="mt-5 bg-gray-200 text-gray-800 px-8 p-2 rounded-full text-md font-semibold"
          >
            {isRunning ? "PAUSE" : "START"}
          </button>
          <p className="text-center text-2xl text-gray-600 mt-5">
            {isWorkTime ? "¡Es hora de Enfocarse!" : "Es hora de tu break"}
          </p>
        </div>
      </main>
      {showNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end p-4">
          <div className="bg-white border border-gray-300 shadow-lg p-4 rounded-lg max-w-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h3 className="font-bold">¡Es hora de tu break!</h3>
              </div>
              <button onClick={closeNotification}>
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <p className="text-gray-600 mt-2">
              Descansa tus ojos. Estira tus piernas. Respira. Relájate.
            </p>
            <button className="bg-blue-400 text-white">{buttonText}</button>
          </div>
        </div>
      )}
      {/*<WelcomeModal isOpen={isModalOpen} onClose={handleCloseModal} />*/}
    </div>
  );
}
