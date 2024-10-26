import React from 'react'
import { X } from "lucide-react"

interface MessageProps {
    closeNotification: () => void
    buttonText: string
}

const Message = ({closeNotification, buttonText}: MessageProps) => {
  return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end p-4">
          <div className="bg-white border border-gray-300 shadow-lg p-4 rounded-lg max-w-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h3 className="font-bold">¡Es hora de tu break!</h3>
              </div>
              <button onClick={closeNotification}>
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <p className="text-gray-600 mt-2">
              Descansa tus ojos. Estira tus piernas. Respira. Relájate.
            </p>
            
              <button className="bg-green-500 text-white mt-2">
                {buttonText}
              </button>
            
          </div>
        </div>

  )
}

export default Message