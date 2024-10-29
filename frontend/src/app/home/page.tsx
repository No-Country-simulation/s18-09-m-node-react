"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import services from "@/services";
import { Configuration } from "@/components/ui/userMenu/Configuration";
import { UserMenu } from "@/components/ui/userMenu/UserMenu";
import Message from "@/components/Message";
import { Edit2 } from "lucide-react";

       

import withAuth from "@/app/(auth)/withAuth";

// import withAuth from "@/app/auth/withAuth";
import { appStore } from "@/store";
{
  /*import WelcomeModal from "@/components/ui/WelcomeModal"; */
}

const factor = 60; // 1 = seconds | 60 = minute

function Home() {
  const [timer, setTimer] = useState(25 * factor);
  const [breakTime, setBreakTime] = useState(5 * factor);
  const [currentTechnique, setCurrentTechnique] = useState<Technique >();
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [session, setSession] = useState(1);
  const [buttonText, setButtonText] = useState("Meditar");
  // const [fetchError, setFetchError] = useState<string | null>(null);
  const fetchCalled = useRef(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const localTechniques = [{
    name: "Pomodoro",
    _id: "613b1fcf8f1d1e2f4a12b3c7",
    focus_time: 25,
    break_time: 5,
    long_break_time: 15,
    cycles_before_long_break: 0,
    active_pause: false,
    description: "Maximiza tu productividad con intervalos de enfoque y descansos estratégicos. La Técnica Pomodoro divide tu tiempo de trabajo en sesiones de 25 minutos de concentración plena, seguidas de 5 minutos de descanso. Este ciclo te ayuda a mantener la motivación, reducir la procrastinación y evitar el agotamiento, permitiéndote lograr más en menos tiempo mientras cuidas tu bienestar mental. Luego de 4 ciclos, tendrás un descanso largo de 15 minutos.",
  },
  {
    name: "Técnica 52/17",
    _id: "613b1fcf8f1d1e2f4a12b3c8",
    focus_time: 52,
    break_time: 17,
    long_break_time: 30,
    cycles_before_long_break: 3,
    active_pause: false,
    description: "Optimiza tu rendimiento con sesiones largas y descansos estratégicos. La Técnica 52/17 propone trabajar durante 52 minutos de concentración profunda, seguidos de 17 minutos de descanso. Este método te permite mantener un enfoque sostenido en tareas importantes, mientras los descansos regulares te ayudan a renovarenergías y prevenir el agotamiento. A su vez, luego de 3 ciclos 52/17, tendrás en descanso largo de 30'"
  },
  {
    name: "Pausa Activa",
    _id: "613b1fcf8f1d1e2f4a12b3c9",
    focus_time: 25,
    break_time: 5,
    long_break_time: 15,
    cycles_before_long_break: 4,
    active_pause: true,
    description : "Recarga tu energía en pocos minutos. Realizar breves ejercicios durante la jornada laboral ayuda a reducir el estrés, mejorar la concentración y evitar la fatiga. Dedica unos minutos a estiramientos, respiración profunda o movimientos ligeros para revitalizar tu cuerpo y mente. ¡Incorpora estas pausas en tu rutina diaria para mantener un equilibrio saludable entre trabajo y bienestar!"
  }];

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
    _id: string;
    focus_time: number;
    break_time: number;
    long_break_time: number;
    cycles_before_long_break: number;
    active_pause: boolean;
    description: string;
  }

  const [techniques, setTechniques] = useState([] as Technique[]);
  // Calling the API to update timerConfigs
  useEffect(() => {
    if (!fetchCalled.current) {
      fetchCalled.current = true; // Garantiza que no se realicen múltiples llamadas

      const fetchData = async () => {
        try {
          const response = await services.getTechniques();
          setTechniques(Object.values(response.data.data)); // convierte el objeto en un arreglo
        } catch {
          // console.error("Error al obtener las técnicas:", apiError);
          // setFetchError("Para registrar tu progreso, deberías iniciar sesión");
          setTechniques(localTechniques);
          // console.log("local", localTechniques[0]);
        }
      };

      fetchData();
    }
  }, [localTechniques, techniques]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };


  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };


  const buttonOptions = useMemo(
    () => ["Meditar", "Estiramientos", "Respirar"],
    []
  );

  const getRandomButtonText = useCallback(() => {
    return buttonOptions[Math.floor(Math.random() * buttonOptions.length)];
  }, [buttonOptions]);

  const { user } = appStore.getState();
  const userId = user?.userData?._id
  const techniqueid = currentTechnique?._id

  useEffect(() => {

    let interval: NodeJS.Timeout | null = null;
    const expected_total_time = currentTechnique?.focus_time ?? 0 + (currentTechnique?.break_time ?? 0);
    const startTime = Date.now();
    
    console.log(userId, techniqueid)
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0 && isWorkTime) {
      setIsWorkTime(false);
      if (currentTechnique && session < currentTechnique?.cycles_before_long_break) {
        setTimer(currentTechnique?.break_time ?? 5);
        setBreakTime(currentTechnique?.break_time ?? 5);
        setButtonText(getRandomButtonText());
        showSystemNotification("¡Es hora de tu break corto!");
      } else {
        setTimer(currentTechnique?.long_break_time ?? 15);
        setBreakTime(currentTechnique?.long_break_time ?? 15);
        setButtonText("Es hora de un largo descanso");
        showSystemNotification("¡Es hora de tu break largo!");
        setSession(1);
      }
      setShowNotification(true);
      setIsRunning(false); // Pause until notification is closed
    } else if (timer === 0 && !isWorkTime) {

      setIsWorkTime(true);
      setTimer(currentTechnique?.focus_time ?? 25);  
      
      setSession(session + 1);
      setIsRunning(false);
      const end_time = Date.now();
      const real_focus_time = end_time - startTime;
      const real_break_time = expected_total_time - real_focus_time;
      const real_break_count = Math.floor(real_break_time / breakTime);
      const score = real_focus_time / expected_total_time;
      const data = {
        user_id: userId,
        technique_id: techniqueid,
        start_time: new Date(startTime),
        end_time: new Date(end_time),
        expected_total_time,
        real_focus_time,
        real_break_time,
        real_break_count,
        finished: true,
        score,
      };
      services
        .createSession(data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timer, isWorkTime, getRandomButtonText, showSystemNotification, techniques, breakTime, currentTechnique?.focus_time, currentTechnique, session, userId, techniqueid]);

  const closeNotification = () => {
    setShowNotification(false);
    setIsRunning(true);
  };

  //UserMenu -> Configuration
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  //modal
  // const [isModalOpen, setIsModalOpen] = useState(true); // Inicialmente el modal está abierto

  // const handleCloseModal = () => {
  // // setIsModalOpen(false); // Cerrar el modal
  // };

  // console.log(techniques)

  function handleTime(technique: Technique): void {
    setCurrentTechnique(technique);
    // console.log(currentTechnique)
    setTimer(technique.focus_time * factor);
    setBreakTime(technique.break_time * factor);
    setIsWorkTime(true);
  }
  console.log(techniques)


 
  return (
    <div className="min-h-screen  flex flex-col items-center justify-around p-4">
      <button className="absolute bottom-20 right-4 bg-green-50 p-2 rounded-xl shadow-lg shadow-gray-500/50" onClick={toggleUserMenu}>
        <Edit2 className="h-7 w-7 text-blue-500" />
      </button>
      <UserMenu
        isMenuOpen={isUserMenuOpen}
        toggleUserMenu={toggleUserMenu}
      >
        <Configuration toggleOptions={toggleUserMenu} />
      </UserMenu>
      <main className="text-2xl md:container md:mx-auto px-4 py-8 max-w-2xl ">


        {/* Techniques container */}

        <div className="flex flex-col justify-center mb-6 space-x-6 bg-transparent">
          <div className="flex justify-evenly  border-b-2 border-blue-500">

            {techniques.map((technique) => (
              <button
                key={technique.name}
                className={`text-lg pb-2 ${
                  currentTechnique?.name === technique.name
                    ? "border-b-4 border-blue-500 "
                    : "text-gray-800"
                }`}
                onClick={() => handleTime(technique)}
                title={technique.description}
              >
                {technique.name}
              </button>
            ))}
          </div>

        </div>


        {/* Timer container */}

        <div className="text-center mt-10 ">
          <div className="container mx-auto mb-5 bg-gradient-to-r from-green-400 to-blue-300 py-12 rounded-2xl shadow-md max-w-[600px]">
            <p className=" text-8xl font-extrabold text-white">
              {formatTime(timer)}
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

      {/* Show Message component */}

      {showNotification && <Message buttonText={buttonText} closeNotification={closeNotification} />
      }
      {/*<WelcomeModal isOpen={isModalOpen} onClose={handleCloseModal} />*/}
    </div>
  );
}
export default Home;