"use client"
import { useState } from 'react'
import useFormState from "@/hooks/formState";
import useFetchData from "@/hooks/useFetchData";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Facebook, Mail } from 'lucide-react'
import Link from 'next/link'
import { toast } from "sonner";

export default function RegisterForm() {
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
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
    const response = await fetchData("registerUser",  formState );
    
    if (response.status) {
      router.push("/register/success")
    } else {
      toast.error("No se pudo crear el usuario");
    }
  }

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
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Ingrese su contraseña"
                value={formState.password}
                onChange={setFormState}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Repetir Contraseña
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Ingrese su contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
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