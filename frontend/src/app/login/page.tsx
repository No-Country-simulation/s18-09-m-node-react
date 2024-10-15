'use client'

import { useState } from 'react'
import Link from 'next/link'
import useFormState from "@/hooks/useFormState";
import useFetchData from "@/hooks/useFetchData";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function validateEmail(email: string) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(email)
}

function validatePassword(password: string) {
  return password.length >= 8
}



export default function LoginPage() {
  const { formState, setFormState } = useFormState({ email: "", password: "" });
  const { fetchData } = useFetchData();
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [user, setUser] = useState(null);
  const [fields, setFields] = useState([]);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [password, setPassword] = useState('');

  

  // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value
  //   setEmail(value)
  //   setPassword(e.target.value);
  //   if (!validateEmail(value)) {
  //     setEmailError('Por favor, ingrese un email válido')
  //   } else {
  //     setEmailError('')
  //   }
  // }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { status, response } = await fetchData("loginUser", formState );

    if (status) {
      console.log(response);
      toast.success("Usuario correcto");
      setUser(response);
      setLoginSuccess(true);
      router.push("home");

      const getFields = await fetchData("loginUser",response.user.id);

      getFields.status
        ? setFields(getFields.response.campos)
        : console.error("No se pudieron traer los campos");
    } else toast.error("Usuario incorrecto");

    setLoginError("");
  };

  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value
  //   setPassword(value)
  //   if (!validatePassword(value)) {
  //     setPasswordError('La contraseña debe tener al menos 8 caracteres')
  //   } else {
  //     setPasswordError('')
  //   }
  // }

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
              error={emailError}
              
            />
          </div>
          <div>
            <Input
              name="password"
              type="password"
              placeholder="Ingrese su contraseña"
              required
              value={formState.password}
              onChange={setFormState}
              error={passwordError}
              
            />
          </div>
          <Button type="submit" className="w-full relative" disabled={isLoading} >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
              
            </div>
          </Button>
        </form>
        {loginError && (
          <div className="text-red-500 text-sm text-center">{loginError}</div>
        )}
        {loginSuccess && (
          <div className="text-green-500 text-sm text-center">Inicio de sesión exitoso</div>
        )}
        <div className="text-center">
          <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
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
          ¿Eres nuevo en este sitio?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  )
}


