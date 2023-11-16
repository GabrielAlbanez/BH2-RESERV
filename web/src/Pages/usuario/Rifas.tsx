import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";

import axios from "axios";
import { useAppSelector } from "../../store/intex";

export default function Rifas() {
  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
  }>;

  type DataNumerosComprados = {
    numerosComprados: [
      {
        numero: number;
        rifa: {
          id: number;
          imgRifa: string;
          nome: string;
          preco: number;
          descricao: string;
          sorteado : boolean;
          ong: {
            nome: string
          }
        };

   
      }
    ];
  };

  const [dataNumerosComprados, setDataNumerosComprados] = useState<DataNumerosComprados[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await axios.post("http://localhost:8080/getAllRifasByCpfUser", {
          cpf: User[0]?.cpf,
        });
        setDataNumerosComprados(req.data.message);
      } catch (error) {
        console.error("Erro ao obter números comprados:", error);
      }
    };

    fetchData();
  }, [User[0]?.cpf,dataNumerosComprados]);

  console.log(dataNumerosComprados)

  return (
    <>
      <h1 className="text-3xl text-center">Minhas rifas</h1>

      {dataNumerosComprados && dataNumerosComprados[0]?.numerosComprados.length > 0 ? (
        <div className="h-[91vh] w-full flex gap-5 flex-wrap items-center justify-center">
          {dataNumerosComprados.map((numero, outerIndex) => (
            <React.Fragment key={outerIndex}>
              {numero.numerosComprados.map((valor, innerIndex) => (
                <div key={innerIndex} className="m-4 w-[300px] cursor-pointer">
                  <div className="max-w-sm rounded overflow-hidden shadow-xl mx-auto shadow-fuchsia-500 hover:shadow-2xl hover:scale-110 transition-all hover:shadow-fuchsia-500">
                    <img
                      src={require(`../../uploadsImgRifas/${valor.rifa.imgRifa.slice(24)}`)}
                      alt=""
                      className="w-full h-48 object-cover"
                    />
                    <div className="px-6 py-4">
                      {/* <h1 className="font-bold text-xl mb-2">Número: {valor.numero}</h1> */}
                      <QRCode  value={JSON.stringify({
                        "nome " : valor.rifa.nome,
                        "numero" : valor.numero,
                        "preço" : valor.rifa.preco,
                        "ong" : valor.rifa.ong.nome
                        
                      })} />
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[91vh] w-full text-3xl">
          <h1>Você ainda não comprou nenhuma rifa</h1>
        </div>
      )}
    </>
  );
}
