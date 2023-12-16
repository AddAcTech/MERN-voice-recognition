import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as speech from "@tensorflow-models/speech-commands"; //npm i @tensorflow-models/speech-commands @tensorflow/tfjs

function Update() {
  const [model, setModel] = useState(null);
  const [labels, setLabels] = useState(null);
  const [voiceCommand, setVoiceCommand] = useState(""); // Estado para el comando de voz
  const commId = location.pathname.split("/")[2];

  const cargarModelo = async () => {
    const recognizer = speech.create("BROWSER_FFT");
    console.log("Carga Completada");
    await recognizer.ensureModelLoaded();
    console.log(recognizer.wordLabels());
    setModel(recognizer);
    setLabels(recognizer.wordLabels());
  };

  useEffect(() => {
    cargarModelo();
  }, []);

  function argMax(arr) {
    return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
  }

  const recognizeCommands = async () => {
    console.log("Escuchando...");
    await model.listen(
      (result) => {
        console.log(result);

        setVoiceCommand(labels[argMax(Object.values(result.scores))]); // Actualizar el estado con el comando de voz
      },
      { includeSprectogram: true, probabilityThreshold: 0.7 }
    );
    setTimeout(() => model.stopListening(), 2e3);
  };

  const goTo = useNavigate();

  const [command, setCommand] = useState({
    desc: "",
    command: "",
    cover: "",
  });

  const handleChange = (e) => {
    setCommand((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newCommand = {
        ...command,
        command: voiceCommand, // Utilizar el valor de voiceCommand como el comando
      };
      await axios.put("http://localhost:8800/comandos/" + commId, newCommand);
      goTo("/comandos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="justify-center items-center flex flex-col bg-white w-fit p-4 rounded-md shadow-md shadow-gray-300">
        <h1 className="font-bold text-[#18181b] text-3xl">
          Actualizar Comando
        </h1>
        <div className="text-light">
          <button
            className="bg-green-400 p-2 rounded-md mt-2 text-[#18181b] font-bold text-xl"
            onClick={recognizeCommands}
          >
            Dictar comando
          </button>
        </div>
        <div className="mt-2 flex flex-col gap-3">
          <input
            type="text"
            placeholder="Comando"
            value={voiceCommand} // Establecer el valor del comando de voz
            name="command"
            className="bg-gray-200 p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Descripción"
            onChange={handleChange}
            name="desc"
            className="bg-gray-200 p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Link de Imagen"
            onChange={handleChange}
            name="cover"
            className="bg-gray-200 p-2 rounded-md"
          />
        </div>
        <button
          className="bg-[#18181b] rounded-md p-2 text-white mt-3 w-24"
          onClick={handleClick}
        >
          Crear
        </button>
      </div>
    </div>
  );
}

export default Update;
