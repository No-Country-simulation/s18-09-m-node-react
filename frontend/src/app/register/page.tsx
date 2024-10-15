"use client"
import { useState } from 'react'
import useFormState from "@/hooks/useFormState";
import useFetchData from "@/hooks/useFetchData";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Facebook, Mail, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { toast } from "sonner";

export default function RegisterForm() {
  // const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const { fetchData } = useFetchData();
  const router = useRouter();
  const { formState, setFormState } = useFormState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    const response = await fetchData("registerUser", formState);

    if (response.status) {
      router.push("/register/success")
    } else {
      toast.error("No se pudo crear el usuario");
    }
  }
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

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Registrate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-6">
            <p className="text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Iniciar sesión
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Ingrese su email"
                value={formState.email}
                onChange={setFormState}
                required
              />

            </div>

            {/* password */}

            <div className="space-y-2 relative">
              <label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </label>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Ingrese su contraseña"
                value={formState.password}
                onChange={setFormState}
                required
                error={validatePassword(formState.password)}
              />
              <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* confirm password */}
            
            <div className="space-y-2 relative">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Repetir Contraseña
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Ingrese su contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                error={formState.password !== confirmPassword ? "Las contraseñas no coinciden" : undefined}
              />
              <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>

            </div>
            <Button type="submit" className="w-full">
              Registrate
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <div className="flex items-center w-full my-4">
            <Separator className="flex-1" />
            <span className="mx-4 text-sm text-muted-foreground">o conéctate con</span>
            <Separator className="flex-1" />
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" size="icon">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Facebook className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}