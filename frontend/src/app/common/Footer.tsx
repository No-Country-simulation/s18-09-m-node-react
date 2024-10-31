import Link from "next/link";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Twitter, Instagram, Youtube, Linkedin, Send } from "lucide-react";
import { XLogo } from "@/svg/XLogo";
import { InstagramLogo } from "@/svg/InstagramLogo";
import { YouTubeLogo } from "@/svg/YouTubeLogo";
import { LinkedinLogo } from "@/svg/LinkedinLogo";
import { EmailLogo } from "@/svg/EmailLogo";

export default function Footer() {
  return (
    <footer className="border-t border-t-[1px] border-t-[#D9D9D9] bg-[#DFF7F2] xl:mx-[40px]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <XLogo />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <InstagramLogo />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <YouTubeLogo />
              <span className="sr-only">YouTube</span>
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-600">
              <LinkedinLogo />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2 text-[#0859A3]">
                Sobre Break&Focus
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-[#1E1E1E] text-[16px] font-inter hover:text-gray-600"
                  >
                    Equipo
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[#1E1E1E] text-[16px] font-inter hover:text-gray-600"
                  >
                    Oportunidades laborales
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-[#0859A3]">Recursos</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-[#1E1E1E] text-[16px] font-inter hover:text-gray-600"
                  >
                    Conoce mas sobre cada Técnica
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[#1E1E1E] text-[16px] font-inter hover:text-gray-600"
                  >
                    Recursos para la productividad
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:max-w-[320px]">
            <h3 className="font-semibold mb-2 text-[#0859A3]">
              Suscríbete a nuestro informativo
            </h3>
            <p className="text-[14px] font-roboto text-[#1E1E1E] mb-4">
              Está atento a últimas novedades y actualizaciones de nuestra
              plataforma.
            </p>
            <form className="flex space-x-2">
              {/*<Input type="email" placeholder="E-Mail" className="flex-grow" />
              <Button type="submit" variant="outline">
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>*/}
              <div className="relative w-full">
                <input
                  type="email"
                  className="w-full h-[32px] border border-[#D9D9D9] focus:outline-none hover:outline-none rounded-none pl-[16px] text-left text-[14px] font-roboto font-normal leading-[22px]"
                  placeholder="E-mail"
                />
                <button type="button" className="absolute right-2 top-1">
                  <EmailLogo />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
