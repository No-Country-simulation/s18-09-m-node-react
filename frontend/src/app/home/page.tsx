"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ArrowLeftRight, Menu, Edit2, X } from "lucide-react";
{
  /*import WelcomeModal from "@/components/ui/WelcomeModal"; */
}
import { Drawer } from "@/components/Drawer";

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
      <div className="max-w-[1200px] relative px-8 py-8 b border-solid border-2 border-slate-300 min-h-[180px] mt-5 ">
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
        <button className="absolute bottom-20 right-4 bg-violet-100 p-2 rounded-xl shadow-lg shadow-gray-500/50">
          <Edit2 className="h-7 w-7 text-indigo-500" />
        </button>
      </div>
    ),
  },
  "52-17": {
    workDuration: 52 * 60,
    breakDuration: 17 * 60,
    description: (
      <div className="max-w-[1200px] relative px-8 py-8 b border-solid border-2 border-slate-300 min-h-[180px] mt-5">
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
        <button className="absolute bottom-20 right-4 bg-violet-100 p-2 rounded-xl shadow-lg shadow-gray-500/50 ">
          <Edit2 className="h-7 w-7 text-indigo-500" />
        </button>
      </div>
    ),
  },
  "pausas-activas": {
    workDuration: 55 * 60,
    breakDuration: 5 * 60,
    description: (
      <div className="max-w-[1200px] relative px-8 py-8 b border-solid border-2 border-slate-300 min-h-[180px] mt-5">
        Incorpora breves pausas de actividad física durante tu jornada laboral.
        <button className="absolute bottom-20 right-4 bg-violet-100 p-2 rounded-xl shadow-lg shadow-gray-500/50">
          <Edit2 className="h-7 w-7 text-indigo-500" />
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
  const [hoveredMode, setHoveredMode] = useState<TimerMode | null>(null);

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

  const handleWrapperMouseEnter = () => {};

  const handleWrapperMouseLeave = () => {
    setHoveredMode(null);
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
  // // setIsModalOpen(false); // Cerrar el modal
  // };

  //drawer
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-around p-4">
      <header className="flex mt-2 gap-4">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
          Break&focus
        </h1>
        <div className="flex justify_around items-center mt-4 gap-4">
          <ArrowLeftRight className="h-6 w-6 text-gray-700" />
          <button
            onClick={toggleDrawer}
            className="relative z-50"
            aria-label="Toggle configuration drawer"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          <Drawer
            title="Configuración"
            isOpen={isOpen}
            toggleDrawer={toggleDrawer}
          />
        </div>
      </header>

      <main className="text-2xl md:container md:mx-auto px-4 py-8 max-w-2xl ">
        <div
          className="flex flex-col justify-center mb-6 space-x-6 bg-transparent"
          onMouseEnter={handleWrapperMouseEnter}
          onMouseLeave={handleWrapperMouseLeave}
        >
          <div className="flex justify-evenly bg-violet-100">
            <button
              className={`text-lg pb-2  ${
                mode === "pomodoro"
                  ? "border-b-2 border-purple-500 text-purple-600 font-semibold"
                  : "text-gray-500"
              }`}
              onMouseEnter={() => setHoveredMode("pomodoro")} // Hover triggers for Pomodoro
              onClick={() => switchMode("pomodoro")}
            >
              Técnica Pomodoro
            </button>
            <button
              className={`text-lg pb-2 ${
                mode === "52-17"
                  ? "border-b-2 border-purple-500 text-purple-600 font-semibold"
                  : "text-gray-500"
              }`}
              onMouseEnter={() => setHoveredMode("52-17")}
              onClick={() => switchMode("52-17")}
            >
              Técnica 52/17
            </button>
            <button
              className={`text-lg pb-2 ${
                mode === "pausas-activas"
                  ? "border-b-2 border-purple-500 text-purple-600 font-semibold"
                  : "text-gray-500"
              }`}
              onMouseEnter={() => setHoveredMode("pausas-activas")}
              onClick={() => switchMode("pausas-activas")}
            >
              Técnica Pausas Activas
            </button>
          </div>
          {hoveredMode && (
            <span className="text-lg text-gray-600">
              {timerConfigs[hoveredMode].description}
            </span>
          )}
        </div>

        <div className="text-center mt-10 ">
          <div className="container mx-auto mb-5 bg-gradient-to-r from-green-400 to-blue-300 py-12 rounded-2xl shadow-md max-w-[600px]">
            <p className=" text-8xl font-extrabold text-white">
              {formatTime(time)}
            </p>
          </div>
          <button
            onClick={toggleTimer}
            className="text-center mt-5 mb-7 bg-gradient-to-b from-green-400 to-blue-400 text-white font-semibold
                        text-2xl p-4 rounded-full shadow-lg h-[180px] w-[180px]"
          >
            {isRunning ? "PAUSE" : "COMENZAR"}
          </button>
          <p className="text-xl font-semibold text-blue-600 mt-5">
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