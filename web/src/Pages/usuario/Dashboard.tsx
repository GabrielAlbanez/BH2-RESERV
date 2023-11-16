import React, { useEffect } from "react";
import { useAppSelector } from "../../store/intex";
import { useNavigate } from "react-router-dom";
import { useTema } from "../../common/context/Tema";

export default function Dashboard() {
  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
  }>;


  const navigator = useNavigate();
  const typeUser = User[0]?.tipo;

  useEffect(() => {
    if (typeUser !== "admin") {
      navigator("/");
    }
  }, [typeUser]);

  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  return (
    <div
      className={` w-full h-[91vh] transition-all duration-1000 flex items-center justify-center flex-col gap-10 ${
        pegarTema === "dark" ? "bg-[#202020] text-white" : "bg-[#CEF3FF]"
      }`}
    >
      Dashboard
    </div>
  );
}
