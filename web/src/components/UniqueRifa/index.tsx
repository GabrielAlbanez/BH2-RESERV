import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { useTema } from "../../common/context/Tema";

export default function UniqueRifa() {
  const { id } = useParams();

  type dataOng = {
    imgRifa: string;
    nome: string;
    preco: number;
    descricao: string;
    NumeroComprado: [{
      numero :string
    }];
  };

  const [dataRifa, setDataRifa] = useState<dataOng[]>([]);

  const getaDataRifaById = async () => {
    axios.get(`http://localhost:8080/getByidRifa/${id}`).then((response) => {
      setDataRifa(response.data.rifa);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      getaDataRifaById();
    }, 1000);
  }, [dataRifa]);

  const url = dataRifa.map((valor) => valor.imgRifa.slice(24));

  console.log(dataRifa);


  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  const numerosComprados = dataRifa[0]?.NumeroComprado
  

  return (
    <div className={`  transition-all duration-1000  ${
        pegarTema === "dark" ? "bg-zinc-950 text-white" : "bg-[#CEF3FF]"
      } `}>
      {dataRifa.length > 0 ? (
        dataRifa.map((valor, index) => (
          <div
            key={index}
            className="xl:h-[91vh] w-full flex justify-between items-center px-40 gap-16  "
          >
            <section className="h-full flex items-center justify-center flex-col  gap-10">
              <div className="flex flex-col items-center justify-center gap-5">
                <h1 className="text-5xl underline">Premio</h1>
                <h2 className="text-3xl">{valor.nome}</h2>
              </div>
              <picture className="w-[100%] h-[70%]">
                <img
                  src={require(`../../uploadsImgRifas/${url}`)}
                  alt=""
                  className="shadow-fuchsia-500 shadow-2xl w-full h-full object-cover"
                />
              </picture>
            </section>
            <section className="w-[50%] h-full  flex flex-col justify-center items-center">
              <div className="h-[20%] flex items-center justify-end">
                <h1 className="text-4xl  underline">Numeros Comprados</h1>
              </div>
              <div className="h-[90%] w-full  flex justify-center ">
                <p>{valor.NumeroComprado.map((numero)=>(
                  <h1>{numero.numero}</h1>
                ))}</p>
              </div>
            </section>
          </div>
        ))
      ) : (
        <div className="xl:h-[91vh] w-full flex flex-col items-center justify-center gap-6">
          <h1 className="text-3xl">Carregando Dados</h1>


          <div className="animate-spin h-5   flex flex-col justify-center items-center  ">
            <ImSpinner2 />
          </div>
        </div>
      )}
    </div>
  );
}
