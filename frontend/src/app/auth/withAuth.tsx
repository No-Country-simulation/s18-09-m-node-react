"use client";

import { Loader } from "@/components/ui/Loader";
import { appStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

/**
 * Higher-Order Component (HOC) que envuelve un componente y verifica si el usuario está autenticado.
 * Si el usuario está autenticado (es decir, tiene un token en su estado global), el componente envuelto se renderiza.
 * Si el usuario no está autenticado, se redirige a la página de login y muestra un Loader mientras tanto.
 *
 * @param WrappedComponent - El componente que será envuelto y protegido por autenticación.
 * @returns Un nuevo componente que verifica la autenticación del usuario antes de renderizar el componente envuelto.
 */

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
      const user = appStore.getState().user;
      if (user?.token) {
        setIsAuth(true);
      } else {
        toast.error(
          "Acceso denegado. Por favor, inicia sesión para continuar."
        );
        router.push("/login");
      }
    }, [router]);

    return isAuth ? <WrappedComponent {...props} /> : <Loader />;
  };

  return Wrapper;
};

export default withAuth;
