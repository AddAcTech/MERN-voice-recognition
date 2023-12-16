import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Comandos = () => {
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    const fetchAllComands = async () => {
      try {
        const res = await axios.get("http://localhost:8800/comandos");
        setCommands(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllComands();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/comandos/" + id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="flex flex-col items-center mt-3 p-4">
        <h1 className="font-bold text-5xl text-[#18181b]">Lista de Comandos</h1>
        <button className="bg-green-400 p-2 rounded-md mt-2 text-[#18181b] font-medium">
          <Link to="/add">Crear Comando</Link>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-4">
        {commands.map((command) => (
          <div
            className=" rounded-md p-4 border bg-white border-gray-300 "
            key={command.id}
          >
            <h5 className="font-bold mt-2 text-2xl text-[#18181b]">
              {command.command}
            </h5>
            <p className="mb-2 text-gray-700">{command.desc}</p>
            <div className="object-cover overflow-hidden rounded-lg">
              <img src={command.cover} className="w-full  h-48 object-cover" />
            </div>
            <div className="flex gap-2 justify-center text-white mt-2">
              <button
                className="bg-[#18181b] rounded-md p-2 "
                onClick={() => handleDelete(command.id)}
              >
                Eliminar
              </button>
              <button className="bg-[#18181b] rounded-md p-2">
                <Link to={`/update/${command.id}`}>Actualizar</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Comandos;
