import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/intex";
import { useNavigate } from "react-router-dom";

export default function AllRifas() {
  type dataRifa = {
    id: number;
    imgRifa: string;
    nome: string;
    preco: string;
    descricao: string;
    CpfUsuario: string;
    idOng: string;
    ong: {
      cnpj: string;
      nome: string;
      email: string;
      senha: string;
      telefone: string;
      endereco: string;
      redesSociais: string;
      aprovado: boolean;
      Logo: string;
    };
    NumeroComprado: [
      {
        id: number;
        numero: number;
        rifaId: number;
        usuarioCpf: string;
      }
    ];
  };

  const [dataRifa, setDataRifa] = useState<dataRifa[]>([]);

  const [buscarData, setBuscarData] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuscarData(event.target.value);
  };

  const filteredRifas = dataRifa.filter((rifa) =>
    rifa.nome.toLowerCase().includes(buscarData.toLowerCase())
  );

  useEffect(() => {
    const url = "http://localhost:8080/getAllRifas";
    axios.get(url).then((response) => {
      const data = response.data;
      setDataRifa(data.rifas);
    });
  }, []);

  console.log(dataRifa);


  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
  }>;

  const typeUser = User[0]?.tipo;


  const navigation = useNavigate()

  useEffect(()=>{
    if(typeUser !== 'admin'){
          navigation('/')
    }
  },[typeUser])

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Rifas List</h2>
      <div className="mb-4">
        <label htmlFor="search" className="mr-2">
          Busca:
        </label>
        <input
          type="text"
          id="search"
          onChange={handleSearch}
          value={buscarData}
          className="p-2 border border-gray-300"
        />
      </div>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nome</th>
            <th className="py-2 px-4 border-b">Preço</th>
            <th className="py-2 px-4 border-b">Descrição</th>
            <th className="py-2 px-4 border-b">ID da Ong</th>
            <th className="py-2 px-4 border-b">Numeros Comprados</th>
            <th className="py-2 px-4 border-b">Cpf User</th>
          </tr>
        </thead>
        <tbody>
          {filteredRifas.map((rifa) => (
            <tr key={rifa.id} className="border-b text-center">
              <td className="py-2 px-4">{rifa.id}</td>
              <td className="py-2 px-4">{rifa.nome}</td>
              <td className="py-2 px-4">{rifa.preco}</td>
              <td className="py-2 px-4">{rifa.descricao}</td>
              <td className="py-2 px-4">{rifa.idOng}</td>
              <td className="py-2 px-4 ">
                {dataRifa[0]?.NumeroComprado.map((numero) => (
                  <div className="">
                    <p>{numero.numero}</p>
                  </div>
                ))}
              </td>

              <td className="py-2 px-4 ">
                {dataRifa[0]?.NumeroComprado.map((numero) => (
                  <div className="">
                    <p>{numero.usuarioCpf}</p>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
