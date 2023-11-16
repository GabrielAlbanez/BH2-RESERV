import React from 'react'
import { useAppSelector } from '../../store/intex';

export default function AvatarImg() {

  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
  }>;
   
  const typeUser = User[0]?.tipo


  const img = typeUser !== 'admin' ? 'https://cdn1.iconfinder.com/data/icons/website-internet/48/website_-_female_user-512.png' : 'https://cdn-icons-png.flaticon.com/512/1100/1100207.png'


  return (
    <div>
      <img src={img} alt="" className='w-10 2xl:w-12 '/>   
    </div>
  )
}
