import React, { FC } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetPassword: (email: string) => void;
}

const ResetPasswordModal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onResetPassword,
}) => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onResetPassword(email);
    onClose();
  };

  if (!isOpen) return null; // If the modal isn't open, don't render anything

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="reset-email" className="block text-sm font-medium">
              Ingrese su correo electrónico
            </label>
            <Input
              id="reset-email"
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
