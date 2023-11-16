import React, { useState } from "react";
import { useTema } from "../../common/context/Tema";
import axios from "axios";
import { useAppSelector } from "../../store/intex";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RifasOngs() {
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  const [dataRegisterRifa, setDataRegisterRifa] = useState({
    nome: "",
    preco: "0.00",
    descricaon: "",
  });

  const [imgRifa, setImgRifa] = useState<File | null>(null);


  const ong = useAppSelector((state) => state.AuthToken.dataOng) as Array<{
    cnpj: string;
  }>;


  localStorage.setItem('cnpjOng',ong[0]?.cnpj)

  const navigator = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setDataRegisterRifa((rifas) => ({
      ...rifas,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImgRifa(e.target.files[0]);
    }
    console.log(imgRifa);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Converter "preco" em um número de ponto flutuante
    const preco = parseFloat(dataRegisterRifa.preco);
  
    // Verificar se a conversão para float foi bem-sucedida
    if (isNaN(preco)) {
      console.log("Preço inválido. Por favor, insira um número válido.");
      return;
    }
  
    console.log(dataRegisterRifa);
    console.log(imgRifa);
  
    const formData = new FormData();
  
    formData.append("nome", dataRegisterRifa.nome);
    formData.append("descricaon", dataRegisterRifa.descricaon);
  

    formData.append("preco", dataRegisterRifa.preco);
    formData.append("cnpj",ong[0]?.cnpj)
  
    if (imgRifa) {
      formData.append("imgRifa", imgRifa);
    }
  
    try {
      const request = await axios.post(`http://localhost:8080/createRifas`, formData);
  
      const responseData = request.data;
  
      console.log(responseData);
      


     if("error" in responseData) {
      const notify = () => {
        toast(`${responseData.error}`, {
          icon: `${pegarTema === "dark" ? "🌑" : " 🌞"}`,
          style: {
            borderRadius: "10px",
            background: `${pegarTema === "dark" ? "#333" : "white"}`,
            color: `${pegarTema === "dark" ? "white" : "black"}`,
          },
        });
      };

      notify();
    }

    else {
      const notify = () => {
        toast(`Rifa criada com sucesso`, {
          icon: `${pegarTema === "dark" ? "🌑" : " 🌞"}`,
          style: {
            borderRadius: "10px",
            background: `${pegarTema === "dark" ? "#333" : "white"}`,
            color: `${pegarTema === "dark" ? "white" : "black"}`,
          },
        });
      };
      setTimeout(()=>{
       
        navigator('/HomeOng')

      },3000)
      // window.location.reload()
      notify();
      
      // window.location.reload()
      ;
    }


















    } catch (error) {
      console.log('Falha ao registrar uma rifa', error);
    }
  }

    


  

  return (
    <div
      className={` w-full h-[91vh] transition-all duration-1000 flex justify-center items-center flex-col gap-16  ${
        pegarTema === "dark" ? "bg-[#202020] text-white" : "bg-[#CEF3FF]"
      }`}
    >
      <h1 className="text-center text-4xl">Criar Rifas</h1>
      <form onSubmit={handleSubmit} className="flex  w-[50%] h-[80%] shadow-xl border-fuchsia-500 border-[1px] rounded-3xl flex-col items-center justify-center px-22 py-20 gap-12 ">
        <div className="flex gap-2 flex-col ">
          <label htmlFor="">Imagen do Premio da Rifa</label>
          <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh]  2xl:h-[6vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
            <input
              onChange={handleFileChange}
              type="file"
              id="imgRifa"
              accept="image/*"
              className="w-[93%] rounded-full h-[100%] border-white outline-0 bg-transparent p-3"
            />
          </div>
        </div>

        <div className="flex gap-2 flex-col ">
          <label htmlFor="">Nome Da Rifa</label>
          <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh]  2xl:h-[6vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
            <input
              name="nome"
              type="text"
              value={dataRegisterRifa.nome}
              onChange={handleInputChange}
              placeholder="name@example.com.."
              className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
            />
          </div>
        </div>

        <div className="flex gap-2 flex-col ">
          <label htmlFor="">Descirção da Rifa</label>
          <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh]  2xl:h-[6vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
            <input
              name="descricaon"
              type="text"
              value={dataRegisterRifa.descricaon}
              onChange={handleInputChange}
              placeholder="name@example.com.."
              className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
            />
          </div>
        </div>

        <div className="flex gap-2 flex-col ">
          <label htmlFor="">Preço do numero de Cada Rifa</label>
          <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh]  2xl:h-[6vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
            <input
              name="preco"
              type="number"
              value={dataRegisterRifa.preco}
              onChange={handleInputChange}
              placeholder="name@example.com.."
              className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
            />
          </div>
        </div>

        <div>
          <button type="submit">Criar Rifa </button>
        </div>
      </form>
    </div>
  );
}
