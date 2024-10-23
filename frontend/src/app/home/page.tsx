/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Edit2, X } from "lucide-react";
import services from "@/services";
{
  /*import WelcomeModal from "@/components/ui/WelcomeModal"; */
}

type TimerMode = "pomodoro" | "52-17" | "pausas-activas";

interface TimerConfig {
  workDuration: number;
  breakDuration: number;
  description: JSX.Element;
}

const initialTimerConfigs: Record<TimerMode, TimerConfig> = {
  pomodoro: {
    workDuration: 25 * 60,
    breakDuration: 5 * 60,
    description: (
      <div className="max-w-[1200px] bg-white relative px-8 py-8 b border-solid border-2 border-slate-300 min-h-[200px] mt-5 transition-all duration-300">
        <span className="font-bold">
          Maximiza tu productividad con intervalos de enfoque y descansos
          estratégicos.
        </span>
        <button className="absolute bottom-20 right-4 bg-green-50 p-2 rounded-xl shadow-lg shadow-gray-500/50">
          <Edit2 className="h-7 w-7 text-blue-500" />
        </button>
      </div>
    ),
  },
  "52-17": {
    workDuration: 52 * 60,
    breakDuration: 17 * 60,
    description: (
      <div className="max-w-[1200px] bg-white relative px-8 py-8 b border-solid border-2 border-slate-300 min-h-[200px] mt-5 transition-all duration-300">
        <span className="font-bold">
          Optimiza tu rendimiento con sesiones largas y descansos estratégicos.
        </span>
        <button className="absolute bottom-20 right-4 bg-green-50 p-2 rounded-xl shadow-lg shadow-gray-500/50">
          <Edit2 className="h-7 w-7 text-blue-500" />
        </button>
      </div>
    ),
  },
  "pausas-activas": {
    workDuration: 60 * 60,
    breakDuration: 10 * 60,
    description: (
      <div className="max-w-[1200px] bg-white relative px-8 py-8 b border-solid border-2 border-slate-300 min-h-[200px] mt-5 transition-all duration-300">
        <span className="font-bold">
          Incorpora pausas activas en tu rutina laboral y marca una diferencia
          significativa.
        </span>
        <button className="absolute bottom-20 right-4 bg-green-50 p-2 rounded-xl shadow-lg shadow-gray-500/50">
          <Edit2 className="h-7 w-7 text-blue-500" />
        </button>
      </div>
    ),
  },
};

export default function Home() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>("pomodoro");
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [timerConfigs, setTimerConfigs] = useState(initialTimerConfigs);
  const [showNotification, setShowNotification] = useState(false);
  const [buttonText, setButtonText] = useState("Meditar");
  const [hoveredMode, setHoveredMode] = useState<TimerMode | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null); // Manejo de errores
  const fetchCalled = useRef(false); // Control del ciclo de fetch

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

  interface Technique {
    name: string;
    focus_time: number;
    break_time: number;
    long_break_time: number;
    cycles_before_long_break: number;
    active_pause: boolean;
    description: string;
  }
  // Calling the API to update timerConfigs
  useEffect(() => {
    if (!fetchCalled.current) {
      fetchCalled.current = true; // Garantiza que no se realicen múltiples llamadas

      const fetchData = async () => {
        try {
          const response = await services.getTechniques();
          const techniquesArray: Technique[] = response.data.data;

          const techniquesMap = techniquesArray.reduce(
            (map: Record<string, Technique>, technique: Technique) => {
              map[technique.name] = technique;
              return map;
            },
            {}
          );

          const updatedTimerConfigs: Record<TimerMode, TimerConfig> = {
            pomodoro: {
              workDuration: (techniquesMap["Pomodoro"]?.focus_time || 25) * 60,
              breakDuration: (techniquesMap["Pomodoro"]?.break_time || 5) * 60,
              description: (
                <div className="max-w-[1200px] bg-white relative px-8 py-8 border-solid border-2 border-slate-300 min-h-[200px] mt-5 transition-all duration-300">
                  <span className="font-bold">
                    {techniquesMap["Pomodoro"]?.description ||
                      "Maximiza tu productividad con intervalos de enfoque y descansos estratégicos."}
                  </span>
                  <button className="absolute bottom-20 right-4 bg-green-50 p-2 rounded-xl shadow-lg shadow-gray-500/50">
                    <Edit2 className="h-7 w-7 text-blue-500" />
                  </button>
                </div>
              ),
            },
            "52-17": {
              workDuration:
                (techniquesMap["52/17 Technique"]?.focus_time || 52) * 60,
              breakDuration:
                (techniquesMap["52/17 Technique"]?.break_time || 17) * 60,
              description: (
                <div className="max-w-[1200px] bg-white relative px-8 py-8 border-solid border-2 border-slate-300 min-h-[200px] mt-5 transition-all duration-300">
                  <span className="font-bold">
                    {techniquesMap["52/17 Technique"]?.description ||
                      "Optimiza tu rendimiento con sesiones largas y descansos estratégicos."}
                  </span>
                  <button className="absolute bottom-20 right-4 bg-green-50 p-2 rounded-xl shadow-lg shadow-gray-500/50">
                    <Edit2 className="h-7 w-7 text-blue-500" />
                  </button>
                </div>
              ),
            },
            "pausas-activas": {
              workDuration:
                (techniquesMap["Active Pause"]?.focus_time || 25) * 60,
              breakDuration:
                (techniquesMap["Active Pause"]?.break_time || 5) * 60,
              description: (
                <div className="max-w-[1200px] bg-white relative px-8 py-8 border-solid border-2 border-slate-300 min-h-[200px] mt-5 transition-all duration-300">
                  <span className="font-bold">
                    {techniquesMap["Active Pause"]?.description ||
                      "Incorpora pausas activas en tu rutina laboral y marca una diferencia significativa."}
                  </span>
                  <button className="absolute bottom-20 right-4 bg-green-50 p-2 rounded-xl shadow-lg shadow-gray-500/50">
                    <Edit2 className="h-7 w-7 text-blue-500" />
                  </button>
                </div>
              ),
            },
          };

          setTimerConfigs(updatedTimerConfigs);
        } catch (apiError) {
          console.error("Error al obtener las técnicas:", apiError);
          setFetchError("Error al actualizar las técnicas.");
        }
      };

      fetchData();
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
  }, [mode, timerConfigs]);

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
    timerConfigs,
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

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-around p-4">
      <main className="text-2xl md:container md:mx-auto px-4 py-8 max-w-2xl ">
        {fetchError && (
          <div className="bg-red-300 text-red-800 p-4 rounded-md mb-6">
            {fetchError}
          </div>
        )}
        <div
          className="flex flex-col justify-center mb-6 space-x-6 bg-transparent"
          onMouseEnter={handleWrapperMouseEnter}
          onMouseLeave={handleWrapperMouseLeave}
        >
          <div className="flex justify-evenly bg-green-100 border-b-2 border-blue-500">
            <button
              className={`text-lg pb-2  ${
                mode === "pomodoro"
                  ? "border-b-2 border-blue-400 text-blue-600 font-semibold"
                  : "text-gray-800"
              }`}
              onMouseEnter={() => setHoveredMode("pomodoro")} // Hover triggers for Pomodoro
              onClick={() => switchMode("pomodoro")}
            >
              Técnica Pomodoro
            </button>
            <button
              className={`text-lg pb-2 ${
                mode === "52-17"
                  ? "border-b-2 border-blue-400 text-blue-600 font-semibold"
                  : "text-gray-800"
              }`}
              onMouseEnter={() => setHoveredMode("52-17")}
              onClick={() => switchMode("52-17")}
            >
              Técnica 52/17
            </button>
            <button
              className={`text-lg pb-2 ${
                mode === "pausas-activas"
                  ? "border-b-2 border-blue-400 text-blue-600 font-semibold"
                  : "text-gray-800"
              }`}
              onMouseEnter={() => setHoveredMode("pausas-activas")}
              onClick={() => switchMode("pausas-activas")}
            >
              Técnica Pausas Activas
            </button>
          </div>
          {hoveredMode && (
            <span className="flex flex justify-center text-lg text-gray-600">
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
            {mode === "pausas-activas" && (
              <button className="bg-green-500 text-white mt-2">
                {buttonText}
              </button>
            )}
          </div>
        </div>
      )}
      {/*<WelcomeModal isOpen={isModalOpen} onClose={handleCloseModal} />*/}
    </div>
  );
}
