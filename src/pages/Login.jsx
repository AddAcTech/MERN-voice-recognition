import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const goTo = useNavigate();
  const handleClick = () => {
    goTo("/comandos");
  };
  return (
    <div className="h-screen flex items-center max-w-lg mx-auto">
      <div className="bg-white rounded-md shadow-md shadow-gray-300 p-4">
        <h2 className="font-bold text-3xl text-[#18181b] mb-2 ">Bienvenido</h2>
        <p className="text-[#18181b]">
          Esta pagina, fue diseñada para usar el stack MERN, y el reconocimiento
          de voz con TensorflowJS.
        </p>
        <p className="my-2 text-[#18181b]">
          Esta limitada a comandos en ingles (numeros del 0 al 9, up, down,
          left, right, yes, no)
        </p>
        <ul className="list-disc list-inside text-[#18181b]">
          <li>Presiona el boton 'Dictar'</li>
          <li>Dicta el comando al microfono</li>
          <li>Elige la descripción y link de imagen.</li>
          <li>Presiona en 'Crear' (o Actualizar)</li>
        </ul>
        <div className="flex justify-center items-center mt-3">
          <button
            className="bg-[#18181b] rounded-md py-2 px-4 text-white"
            onClick={handleClick}
          >
            Ir a la pagina principal
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
