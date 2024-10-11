"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ArrowLeftRight, Menu, Edit2 } from "lucide-react";

type TimerMode = "pomodoro" | "52-17" | "pausas-activas";

interface TimerConfig {
  workDuration: number;
  breakDuration: number;
  description: JSX.Element;
}

const timerConfigs: Record<TimerMode, TimerConfig> = {
  pomodoro: {
    workDuration: 25 * 60,
    breakDuration: 5 * 60,
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
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>("52-17");
  const [isWorkTime, setIsWorkTime] = useState(true);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const resetTimer = useCallback(() => {
    const config = timerConfigs[mode];
    setTime(isWorkTime ? config.workDuration : config.breakDuration);
  }, [mode, isWorkTime]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsRunning(false);
    setIsWorkTime(true);
    setTime(timerConfigs[newMode].workDuration);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsWorkTime((prev) => !prev);
      resetTimer();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, time, resetTimer]);

  return (
    <div className="min-h-screen bg-white">
      <header className="container mx-auto flex justify-between items-center p-4 border-b">
        <div className="text-2xl font-bold border border-gray-300 px-2">
          Logo
        </div>
        <div className="flex gap-4">
          <ArrowLeftRight className="h-5 w-5" />
          <Menu className="h-5 w-5" />
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
            {isWorkTime ? "¡Es hora de Enfocarse!" : "¡Tiempo de descanso!"}
          </p>
        </div>
      </main>
    </div>
  );
}
