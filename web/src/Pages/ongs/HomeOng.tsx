import React from 'react'
import CardRifas from '../../components/CardRifas'
import { useAppSelector } from '../../store/intex';
import { useTema } from '../../common/context/Tema';



export default function HomeOng() {


    const ong = useAppSelector((state) => state.AuthToken.dataOng) as Array<{
    cnpj: string;
  }>;


  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

 


  

  return (
    <div className={`transition-all duration-1000  ${
      pegarTema === "dark" ? "bg-zinc-950 text-white" : "bg-[#CEF3FF]"
    } flex w-full  h-[100%] py-10 xl:h-[91vh]  flex-col items-center justify-center gap-16`}>
      <h1 className='text-4xl '>Rifas</h1>
      <CardRifas/>
    </div>
  )
}
