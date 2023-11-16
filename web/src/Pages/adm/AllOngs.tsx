import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../store/intex';
import { useNavigate } from 'react-router-dom';

export default function AllOngs() {
  type dataOng = {
    Voluntarios: [];
    cnpj: string;
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    endereco: string;
    redesSociais: string;
    aprovado: boolean;
    Logo: string;
    rifas: [
      {
        id: number;
        imgRifa: string;
        nome: string;
        preco: string;
        descricao: string;
        CpfUsuario: null;
        idOng: string;
      }
    ];
    trabalhos: [];
  };

  const [dataOng, setDataOng] = useState<dataOng[]>([]);

  const [buscarData, setBuscarData] = useState('');

  useEffect(() => {
    const url = 'http://localhost:8080/allOngs';
    axios.get(url).then((response) => {
      const data = response.data;
      setDataOng(data.ongs);
    });
  }, []);

  console.log(dataOng);


  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuscarData(event.target.value);
  };

  const filteredOngs = dataOng.filter((ong) =>
  ong.nome.toLowerCase().includes(buscarData.toLowerCase())
  );

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
      <h2 className="text-2xl font-bold mb-4">Lista de ongs</h2>
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
            <th className="py-2 px-4 border-b">CNPJ</th>
            <th className="py-2 px-4 border-b">Nome</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Telefone</th>
            <th className="py-2 px-4 border-b">Endereço</th>
            <th className="py-2 px-4 border-b">Redes Sociais</th>
            <th className='py-2 px-4 border-b'>Rifas</th>
            <th className='py-2 px-4 border-b'>Preco</th>
          </tr>
        </thead>
        <tbody>
          {filteredOngs.map((ong,index) => (
            <tr key={ong.cnpj} className="border-b text-center" >
              <td className="py-2 px-4">{ong.cnpj}</td>
              <td className="py-2 px-4">{ong.nome}</td>
              <td className="py-2 px-4">{ong.email}</td>
              <td className="py-2 px-4">{ong.telefone}</td>
              <td className="py-2 px-4">{ong.endereco}</td>
              <td className="py-2 px-4">{ong.redesSociais}</td>
              <td className="py-2 px-4 ">{dataOng[0]?.rifas.map((rifa)=>
               <div className=''>
               <p>{rifa.nome}</p>
               </div>
              )}</td>
               <td className="py-2 px-4 ">{dataOng[0]?.rifas.map((rifa)=>
               <div className=''>
               <p>{rifa.preco}</p>
               </div>
              )}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
