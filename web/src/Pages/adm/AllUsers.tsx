import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/intex";
import { useNavigate } from "react-router-dom";
import sockett from "../../common/io/io";

export default function AllUsers() {
  type dataUser = {
    cpf: string;
    nome: string;
    email: string;
    senha: string;
    sexo: string;
    endereco: string;
    tipo: string;
    telefone: string;
    numerosComprados: {
      id: number;
      numero: number;
      rifaId: number;
      usuarioCpf: string;
    };
  };

  const [dataUsers, setDataUsers] = useState<dataUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userConecteds, setUserConecteds] = useState([]);
  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
  }>;

  const cpf = User[0]?.cpf;

  useEffect(() => {
    const url = `http://localhost:8080/allUsers/${cpf}`;
    axios.get(url).then((response) => {
      const data = response.data;
      setDataUsers(data.users);
    });

    sockett.emit("authenticate", cpf);
    sockett.on("allUserConected", (dados: any) => {
      // console.log('Recebeu usuariosConectados:', dados);

      setUserConecteds(dados.usuarios.connectedUsers);
    });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = dataUsers.filter((user) =>
    user.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const Userr = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
  }>;

  const typeUser = Userr[0]?.tipo;

  const navigation = useNavigate();

  useEffect(() => {
    if (typeUser !== "admin") {
      navigation("/");
    }
  }, [typeUser]);

  // const valores = Object.values()

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>
      <h1>
        Usuários logados nesse momento: {Object.keys(userConecteds).length}
      </h1>

      <div className="mb-4">
        <label htmlFor="search" className="mr-2">
          Busca:
        </label>
        <input
          type="text"
          id="search"
          onChange={handleSearch}
          value={searchTerm}
          className="p-2 border border-gray-300"
        />
      </div>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-b">CPF</th>
            <th className="py-2 px-4 border-b">Nome</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Sexo</th>
            <th className="py-2 px-4 border-b">Endereço</th>
            <th className="py-2 px-4 border-b">Tipo</th>
            <th className="py-2 px-4 border-b">Telefone</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.cpf} className="border-b text-center">
              <td className="py-2 px-4">{user.cpf}</td>
              <td className="py-2 px-4">{user.nome}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.sexo}</td>
              <td className="py-2 px-4">{user.endereco}</td>
              <td className="py-2 px-4">{user.tipo}</td>
              <td className="py-2 px-4">{user.telefone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
