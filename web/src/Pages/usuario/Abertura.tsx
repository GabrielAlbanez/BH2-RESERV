import React from "react";
import Logo from "../assets/imgs/Logo.png";
import Button from "../../components/Button";
import MyDrawer from "../../components/MyDrawer";
import imgFundo from "../../assets/imgs/Crianças-PNG.png";
import ButtonTradeTheme from "../../components/ButtonTradeTheme";
import { useTema } from "../../common/context/Tema";
import { useAppSelector } from "../../store/intex";


export default function Abertura() {
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };


  const isLoged = useAppSelector((state) => state.AuthToken.isLoged);

  return (
    <div
      className={` xl:overflow-hidden xl:w-full xl:h-[91vh] xl:flex transition-all duration-1000 ${
        pegarTema === "dark" ? "bg-[#202020] text-white" : "bg-[#CEF3FF]"
      }`}
    >
      <div className="flex flex-col items-center justify-center w-[100%] h-[90vh]">
  
        <div className="h-[90%] w-full flex flex-col items-center justify-center gap-10 sm:gap-20 2xl:gap-24">
          <div className="flex flex-col items-center sm:gap-3">
            <span className="text-xl sm:text-2xl 2xl:text-3xl">Faça Uma</span>
            <h1 className="text-3xl sm:text-4xl underline 2xl:text-5xl">Doação!</h1>
          </div>
          <div className="text-center text-lg 2xl:text-3xl">
            <p>"Compartilhe um pouco de amor </p>
            <p>e esperança através da sua doação"</p>
          </div>
        </div>
        <div className="h-[50%] w-[100%] flex items-end lg:justify-center">
          <img
            src={imgFundo}
            alt=""
            className="w-full  sm:h-[90%] lg:w-[90%] xl:w-[50%] 2xl:w-[50%]"
          />
        </div>
      </div>
      <div className="w-[0%] h-[0%] overflow-hidden xl:overflow-visible xl:w-[3%] 2xl:w-[3%] xl:h-[91vh]">
        <div className={` transition-all duration-1000 ${pegarTema === "dark" ? "bg-[#202020]" : "bg-[#CEF3FF]"} w-full h-full  xl:px-6 xl:py-4 flex flex-col justify-between items-end`}>
          <ButtonTradeTheme />
          <h1>Be Human</h1>
        </div>
      </div>

    </div>
  );
}