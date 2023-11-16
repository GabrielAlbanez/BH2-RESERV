import React from 'react';
import { useTema } from '../../common/context/Tema';
import toast from 'react-hot-toast';
import { BsSun, BsMoonStars } from 'react-icons/bs';

function ButtonTradeTheme() {
  const { pegarTema, setPegarTema } = useTema() as {
    pegarTema: string;
    setPegarTema: (value: string) => void;
  };

  const notify = () => {
    const novoTema = pegarTema === 'dark' ? 'light' : 'dark';
    setPegarTema(novoTema); 


    localStorage.setItem('tema', novoTema);

    toast(`Tema atualizado para ${novoTema}`, {
      icon: pegarTema === 'dark' ? '🌞' : '🌑',
      style: {
        borderRadius: '10px',
        background: pegarTema === 'dark' ? 'white' : '#333',
        color: pegarTema === 'dark' ? 'black' : 'white',
      },
    });
  };

  return (
    <div onClick={notify} className="mt-0 xl:mr-0">
      {pegarTema === 'dark' ? (
        <BsMoonStars size={23} />
      ) : (
        <BsSun size={30} />
      )}
    </div>
  );
}

export default ButtonTradeTheme;
