import React from "react";
import AvatarImgOng from "../../components/AvatarImgOng";
import { useAppSelector } from "../../store/intex";
import { useTema } from "../../common/context/Tema";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AccountOng() {
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  const navigator = useNavigate();

  const notify = () => {
    toast(`${"Ong Deslogado"}`, {
      icon: `${pegarTema === "dark" ? "🌑" : " 🌞"}`,
      style: {
        borderRadius: "10px",
        background: `${pegarTema === "dark" ? "#333" : "white"}`,
        color: `${pegarTema === "dark" ? "white" : "black"}`,
      },
    });
  };

  const handleLogoutOng = () => {
    notify();
    setTimeout(() => {
      localStorage.setItem("logoOng", "");
      localStorage.setItem("token", "");
      localStorage.setItem("isLoged", "");
      localStorage.setItem('isLoged','false')
      localStorage.setItem('cnpjOng',"")
      navigator("/");
      window.location.reload();
    }, 1500);
  };

  const logo = localStorage.getItem("logoOng");
  return (
    <div
      className={`transition-all duration-1000  ${
        pegarTema === "dark" ? "bg-[#202020] text-white" : "bg-[#CEF3FF]"
      } 
    flex  items-center mx-auto justify-evenly h-full w-full `}
    >
      <div className="w-full h-[91vh] flex items-center justify-center  ">
        <img
          src={require(`../../uploads/${logo}`)}
          alt=""
          className="  w-[58%] h-[68%] rounded-full   p-20"
          width={1000}
          height={1000}
        />
      </div>
      <div className="w-[80%]  flex flex-col justify-between  items-center h-[91vh] py-20">
        <h1>Data ong</h1>
        <button
          onClick={handleLogoutOng}
          className="px-3 py-3 w-32 border-red-400 border-[1px] rounded-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
