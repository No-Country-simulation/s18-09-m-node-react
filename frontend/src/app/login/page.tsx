"use client";

import { useState } from "react";
import Link from "next/link";
import useFormState from "@/hooks/useFormState";
import useFetchData from "@/hooks/useFetchData";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { appStore } from "@/store";

const validatePassword = (password: string) => {
  const errors = [];

  if (password.length < 8) {
    errors.push("La contraseña debe tener al menos 8 caracteres");
  }

  if (!/\d/.test(password)) {
    errors.push("La contraseña debe tener al menos un número");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("La contraseña debe tener al menos una mayúscula");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("La contraseña debe tener al menos una minúscula");
  }

  if (!/[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(password)) {
    errors.push("La contraseña debe tener al menos un carácter especial");
  }

  return errors.length > 0 ? errors[0] : undefined;
};

export default function LoginPage() {
  const { formState, setFormState } = useFormState({ email: "", password: "" });
  const { fetchData } = useFetchData();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = false;

  const showLoader = appStore((state) => state.showLoader);
  const hideLoader = appStore((state) => state.hideLoader);

  const setUser = appStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    showLoader();
    const { status, response } = await fetchData("loginUser", formState);

    if (status) {
      console.log(response);
      const { _id, email, role } = response.data;
      const token = response.token;

      toast.success("Usuario correcto");
      // setUser(response);
      setUser({
        token,
        userData: {
          _id,
          email,
          role,
        },
      });
      router.push("home");
    } else {
      toast.error("Usuario incorrecto");
      hideLoader();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Inicio de sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              name="email"
              type="email"
              placeholder="Ingrese su email"
              required
              value={formState.email}
              onChange={setFormState}
              // error={emailError}
            />
          </div>
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Ingrese su contraseña"
              required
              value={formState.password}
              onChange={setFormState}
              error={validatePassword(formState.password)}
            />

          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <span className="text-sm">Mostrar contraseña</span>
          </div>
          
          <Button
            type="submit"
            className="w-full relative"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}

            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1"></div>
          </Button>
        </form>

        <div className="text-center">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            ¿Ha olvidado su contraseña?
          </Link>
        </div>
        <div className="space-y-3">
          <Button variant="outline" className="w-full">
            Iniciar sesión con Google
          </Button>

          <Button variant="outline" className="w-full">
            Iniciar sesión con Facebook
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="px-4 bg-white text-gray-500">O</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>
        <div className="text-center text-sm">
          ¿Eres nuevo en este sitio?{" "}
          <Link href="/register" className="text-blue-600 hover:underline" />
          ¿Eres nuevo en este sitio?{" "}
          <Link
            href="/register"
            className=" m-2 text-black font-semibold hover:underline"
          >
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
}
