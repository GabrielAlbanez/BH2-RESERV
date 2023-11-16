import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useParams } from "react-router-dom";
import { useTema } from "../../common/context/Tema";
import toast from "react-hot-toast";
import { useAppSelector } from "../../store/intex";

export default function Ongs() {
  const { cnpj } = useParams();

  const cnpjFormatado =
    cnpj?.slice(0, 2) +
    "." +
    cnpj?.slice(2, 5) +
    "." +
    cnpj?.slice(5, 8) +
    "/" +
    cnpj?.slice(8, 12) +
    "-" +
    cnpj?.slice(12);

  type dataOng = {
    nome: string;
    Logo: string;
    trabalhos: [];
    Voluntarios: [];
    rifas: [
      {
        descricao: string;
        idOng: number;
        imgRifa: string;
        nome: string;
        preco: string;
        id: number;
        sorteado : boolean;
      }
    ];
    endereco: string;
    redesSociais: string;
    telefone: string;
  };
  const [dataReq, setDataReq] = useState({
    cnpjOng: cnpjFormatado,
  });
  const [dataOng, setDataOng] = useState<dataOng[]>([]);

  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
  }>;

  const getByDataOngsForCnpj = async () => {
    const request = await axios.post(
      "http://localhost:8080/getByRifaForCnpjOng",
      dataReq
    );
    // console.log('dados da req',request.data)
    setDataOng(request.data.dataOng);
  };

  useEffect(() => {
    getByDataOngsForCnpj();
  }, [cnpj]);

  const url = dataOng[0]?.Logo.slice(16);

  console.log(url);

  console.log("rifas", dataOng[0]?.rifas);

  const urlsImgRifas = dataOng[0]?.rifas.map((data) => data.imgRifa.slice(24));

  console.log(urlsImgRifas);

  const notify = (message: string) => {
    toast(`${message}`, {
      icon: `${pegarTema === "dark" ? "✔" : " ✔"}`,
      style: {
        borderRadius: "10px",
        background: `${pegarTema === "dark" ? "#333" : "white"}`,
        color: `${pegarTema === "dark" ? "white" : "black"}`,
      },
    });
  };

  const SaveNumberRifa = async (idRifa: number) => {
    console.log("cpf dentro da função ", User[0]?.cpf);

    const req = await axios.post("http://localhost:8080/byRifas", {
      cpf: User[0]?.cpf,
      id: idRifa,
      numero: Math.floor(Math.random() * 131312321),

      
    });

    notify(req.data.message);
    console.log("data", req.data);
  };


  const verySortRifa = (sorteado : boolean)=>{
      if(sorteado === true){
        notify('essa rifa ja foi sorteada')
      } else {
        notify('essa rifa ainda n foi sorteada')
      }
  }

  return (
    <div
      className={`  transition-all duration-1000  ${
        pegarTema === "dark" ? "bg-[#202020] text-white " : "bg-[#CEF3FF]"
      }  w-full sm:h-[91vh] h-[100%] `}
    >
      {dataOng.length > 0 ? (
        <div className="h-full w-full">
          <section className="w-full  h-[20%] flex  gap-2 items-center justify-center pt-7">
            <img
              src={require(`../../uploads/${url}`)}
              alt=""
              className="w-20 h-20 rounded-full mr-4"
            />
            <p className="text-2xl ">{dataOng[0].nome}</p>
          </section>
          <section className="w-full flex justify-between pt-16 h-[70%] flex-col gap-10 sm:gap-0 sm:flex-row ">
            <div
              className={` transition-all duration-1000 w-[100%] sm:w-[50%] h-full flex flex-col  gap-20 sm:gap-32 items-center    sm:border-r-[1px] ${
                pegarTema === "dark" ? "border-white" : "border-black"
              }`}
            >
              <h2 className="text-3xl">Informaçoes Ong</h2>
              <div className="w-full h-full flex flex-col gap-10 justify-start items-center  text-md sm:text-xl">
                <p>Nome: {dataOng[0].nome}</p>
                <p>Endereço: {dataOng[0].endereco}</p>
                <p>Redes Socias: {dataOng[0].redesSociais}</p>
                <p>Telefone: {dataOng[0].telefone}</p>
              </div>
            </div>
            <h1 className="text-center pt-10 text-2xl visible sm:hidden">
              Rifas
            </h1>
            <div className=" w-full sm:w-[50%] h-full flex  justify-center gap-10 flex-wrap items-center ">
              {dataOng[0].rifas.length > 0 ? (
                <>
                  {dataOng[0]?.rifas.map((data, index) => (
                    
                    <div
                      onMouseEnter={()=>{verySortRifa(data.sorteado)}}
                      className={`max-w-sm rounded-xl shadow-lg   ${
                        pegarTema === "dark" ? "shadow-fuchsia-500" : ""
                        
                      } w-[60%] h-[50%] p-4 overflow-hidden sm:overflow-visible   gap-20 hover:scale-105 transition-all duration-400 cursor-pointer hover:shadow-fuchsia-500 hover:shadow-2xl
                      ${data.sorteado === true ? ' opacity-50 hover:opacity-100' : 'opacity-100'}
                      `}
                    >
                      {data.sorteado === true ? (<div className="flex flex-col justify-center items-center h-full w-full">
                      
                        <div className="w-[100%]  flex sm:gap-20 items-center justify-center sm:justify-center sm:items-center">
                        <img
                          src={require(`../../uploadsImgRifas/${urlsImgRifas[index]}`)}
                          alt=""
                          className=" w-[50%] h-[60%]  sm:w-[80%] sm:h-[90%] rounded-2xl   "
                        />{" "}
                       
                      </div>
                      <div className=" px-6 py-3 sm:py-9 text-center sm:text-start  flex justify-center items-center  flex-col gap-5 sm:gap-0">
                        <h1>Essa rifa ja foi sorteada</h1>
                      </div>
                      
                      </div>) : (<>
                        <div className="w-[100%]  flex sm:gap-20 items-center justify-center sm:justify-center sm:items-center">
                        <img
                          src={require(`../../uploadsImgRifas/${urlsImgRifas[index]}`)}
                          alt=""
                          className=" w-[50%] h-[60%]  sm:w-[30%] sm:h-[40%]   "
                        />{" "}
                        <button
                          onClick={() => {
                            SaveNumberRifa(data.id);
                          }}
                          className="rounded-full bg-fuchsia-500 px-2 py-3 hover:shadow-2xl hover:shadow-fuchsia-500 hover:scale-110 transition"
                        >
                          comprar rifa
                        </button>
                      </div>
                      <div className=" px-6 py-3 sm:py-9 text-center sm:text-start  flex  flex-col gap-5 sm:gap-0">
                        <div className="  font-bold text-xl mb-2">
                          {data.nome}
                        </div>
                        <p className=" text-base hidden sm:block">
                          {data.descricao}
                        </p>

                        <div>
                          <p>valor da Rifa: {data.preco}</p>
                        </div>
                      </div></>)}

                 
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <h1 className="text-2xl">
                    essa ong nao tem rifas disponiveis ainda
                  </h1>
                </>
              )}
            </div>
          </section>
        </div>
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
