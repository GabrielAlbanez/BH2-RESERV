import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/intex";
import { useNavigate } from "react-router-dom";
import { useTema } from "../../common/context/Tema";
import CardAllOngs from "../../components/CardAllOngs/CardAllOngs";
import ButtonTradeTheme from "../../components/ButtonTradeTheme";
import toast from "react-hot-toast";
import sockett from "../../common/io/io";
import ModaWinOrLoseRifa from "../../components/Modal/ModaWinOrLoseRifa";




export default function Home() {
  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
  }>;

  const navigator = useNavigate();
  const typeUser = User[0]?.tipo;


  type resultadoSorteio = {
    dadosGanhador : {
      nome : string;
      email : string;
      cpf : string
    },
    ganhador : {
      numero : number;
      rifa : {
        imgRifa : string;
        idOng : string;
        nome : string ;
        preco : string
      }
    } | null

  }

  const [resultadoSorteio, setResultadoSorteio] = useState<resultadoSorteio[]>([]);
  const [open,setOpen] = useState<boolean>(false)

 const handleClose = ()=>{
  setOpen(false)
 }

  const { pegarTema } = useTema() as {
    pegarTema: string;
  };




  const logedUser = localStorage.getItem('isLoged')

  const logedUserr = useAppSelector((state) => state.AuthToken.isLoged);

  console.log(logedUser)




  const notify = (message : string) => {
    toast(message, {
      icon: `${pegarTema === "dark" ? "🌑" : " 🌞"}`,
      style: {
        borderRadius: "10px",
        background: `${pegarTema === "dark" ? "#333" : "white"}`,
        color: `${pegarTema === "dark" ? "white" : "black"}`,
      },
    });

    
  };

  useEffect(() => {
  

    console.log(logedUser);

    if(logedUser === 'false' ){
      notify('vc precisa estar logado para acessar essa pagina')
      navigator('/')

    }
     const cpf = User[0]?.cpf
    setTimeout(()=>{
      sockett.emit('authenticate', cpf);
      sockett.on('sorteioConcluido', (dados : any) => {
        console.log('Recebeu sorteioConcluido:', dados);
  
   
        setResultadoSorteio([dados]);
        
      });

    },2000)

  
    console.log('sorteio',resultadoSorteio)

    
   
    if (resultadoSorteio.length > 0 && resultadoSorteio[0]?.dadosGanhador.cpf.length > 0) {
     if (resultadoSorteio[0]?.dadosGanhador.cpf === cpf) {
       console.log('Você ganhou');
      
     } else {
       console.log('Você perdeu');
   
     }
     setOpen(true); // Mova esta linha para fora do bloco condicional
   }
    




  }, [resultadoSorteio]);

  useEffect(()=>{
    if (typeUser === "admin") {
      navigator("/DashBoarddUsuarios");
    }
  },[typeUser])





  const cpf = User[0]?.cpf


  const url = resultadoSorteio.map((valor)=>valor.ganhador?.rifa.imgRifa.slice(24))

  console.log(url)


  return (
    <div
      className={` w-full h-[100%] sm:h-[91vh] transition-all duration-1000 flex items-center justify-center flex-col gap-12 py-5 sm:py-0 ${
        pegarTema === "dark" ? "bg-[#202020] text-white" : "bg-[#CEF3FF]"
      }`}
    >
      <div>
        <h1 className="text-4xl ">Ongs</h1>
      </div>
      <div className="w-full h-[100%]">
            <ModaWinOrLoseRifa open={open} onClose={handleClose}>
              <div className="text-black w-full h-full flex flex-col gap-3 " key={resultadoSorteio[0]?.dadosGanhador.cpf}>
                <div className="flex items-center justify-center gap-3">
                <h1>Rifa:</h1>
                <h1>{resultadoSorteio[0]?.ganhador?.rifa.nome}</h1>
                </div>
                <h1 className="text-center text-3xl">{resultadoSorteio[0]?.dadosGanhador.cpf === cpf ? 'vc ganhou!' : 'voce perdeu'}</h1>
                {url.length > 0 ?  <img src={require(`../../uploadsImgRifas/${url}`)} alt="" className="w-full h-full rounded-xl" /> : '' }
                <p>numero da rifa sorteado: {resultadoSorteio[0]?.ganhador?.numero}</p>
                <p>nome do ganhador: {resultadoSorteio[0]?.dadosGanhador.nome}</p>
               
              </div>
            </ModaWinOrLoseRifa>
             <CardAllOngs/>
      </div>
    </div>
  );
}
