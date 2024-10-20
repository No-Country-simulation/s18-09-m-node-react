// import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"



export default function LoginPage() {
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
            />
          </div>
          <div>
            <Input
              name="password"
              type="password"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          <Button type="submit" className="w-full relative bg-gray-700">
            Iniciar sesión
          </Button>
        </form>
        <div className="text-center">
          <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
            ¿Ha olvidado su contraseña?
          </Link>
        </div>
        <div className="space-y-3">
          <Button variant="outline" className="w-full bg-gray-600 text-white">
            Iniciar sesión con Google
          </Button>
          <Button type='submit' className="w-full">
            Iniciar sesión con Facebook
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <div className="border-t-2 s border-gray-800 flex-grow"></div>
          <span className="px-4 bg-white text-gray-800">O</span>
          <div className="border-t-2 border-gray-800 flex-grow"></div>
        </div>
        <div className="text-center text-sm">
          ¿Eres nuevo en este sitio?{' '}
          <Link href="/register" className=" m-2 text-black font-semibold hover:underline">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  )
}