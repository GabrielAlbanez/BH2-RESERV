import React, { useEffect, useState } from "react";
import { useTema } from "../../common/context/Tema";
import { useAppSelector } from "../../store/intex";
import { LogUser, saveDataUser } from "../../store/slices/AuthToken";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import sockett from "../../common/io/io";

export default function Account() {
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
  const logedUser = useAppSelector((state) => state.AuthToken.isLoged);

  const notify = () => {
    toast(`${"usuario Deslogado"}`, {
      icon: `${pegarTema === "dark" ? "🌑" : " 🌞"}`,
      style: {
        borderRadius: "10px",
        background: `${pegarTema === "dark" ? "#333" : "white"}`,
        color: `${pegarTema === "dark" ? "white" : "black"}`,
      },
    });
  };

  const navigator = useNavigate();

  const logOut = () => {
    notify();
    setTimeout(() => {
      localStorage.setItem("token", "");
      localStorage.setItem("isLoged", "false");
      navigator("/");
      sockett.disconnect();
      window.location.reload();
    }, 1000);
  };

  type dataNuemerosComprados = {
    id: Number;
    numero: number;
    rifaId: Number;
    usuarioCpf: string;
  };

 
  return (
    <div
      className={` w-full h-[91vh] transition-all duration-1000 flex items-center justify-center flex-col gap-10 ${
        pegarTema === "dark" ? "bg-[#202020] text-white" : "bg-[#CEF3FF]"
      }`}
    >
      <div className="text-4xl">Account</div>
      {logedUser === "true" ? (
        <>
          {logedUser === "true" || User.length > 0 ? (
            <div className="flex flex-col gap-10 items-center justify-center h-[70%] w-[100%] rounded-2xl  text-lg ">
              <p>Cpf : {User[0]?.cpf}</p>
              <p>Email : {User[0]?.email}</p>
              
              <p>Sexo : {User[0]?.sexo}</p>
              {User[0]?.tipo === "admin" ? (
                <>
                  <p>Type : Admin</p>
                </>
              ) : (
                <></>
              )}

              <button
                onClick={logOut}
                className="border-violet-400 border-[2px] rounded-2xl px-4 py-4"
              >
                Logout
              </button>
            </div>
          ) : (
            <h1>Carregando dados do usuário...</h1>
          )}
        </>
      ) : (
        <h1>Você precisa estar logado</h1>
      )}
    </div>
  );
}
