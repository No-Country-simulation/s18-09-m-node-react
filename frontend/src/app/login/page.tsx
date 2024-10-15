"use client";
// import Image from 'next/image'
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function validateEmail(email: string) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

function validatePassword(password: string) {
  return password.length >= 8;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError("Por favor, ingrese un email válido");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (!validatePassword(value)) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres");
    } else {
      setPasswordError("");
    }
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   if (validateEmail(email) && validatePassword(password)) {
  //     // Aquí iría la lógica de autenticación
  //     console.log('Autenticando:', email, password)
  //   } else {
  //     if (!validateEmail(email)) setEmailError('Por favor, ingrese un email válido')
  //     if (!validatePassword(password)) setPasswordError('La contraseña debe tener al menos 8 caracteres')
  //   }
  // }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Inicio de sesión</h1>
        <form className="space-y-4">
          <div>
            <Input
              name="email"
              type="email"
              placeholder="Ingrese su email"
              required
              value={email}
              onChange={handleEmailChange}
              error={emailError}
            />
          </div>
          <div>
            <Input
              name="password"
              type="password"
              placeholder="Ingrese su contraseña"
              required
              value={password}
              onChange={handlePasswordChange}
              error={passwordError}
            />
          </div>
          <Button type="submit" className="w-full relative bg-gray-700">
            Iniciar sesión
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
          <Button variant="outline" className="w-full bg-gray-600 text-white">
            Iniciar sesión con Google
          </Button>
          <Button type="submit" className="w-full">
            Iniciar sesión con Facebook
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <div className="border-t-2 s border-gray-800 flex-grow"></div>
          <span className="px-4 bg-white text-gray-800">O</span>
          <div className="border-t-2 border-gray-800 flex-grow"></div>
        </div>
        <div className="text-center text-sm">
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
