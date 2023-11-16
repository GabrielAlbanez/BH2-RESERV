import React from 'react'
import { useAppSelector } from '../../store/intex';


interface typeProsAvatar{
  largura : number;
  altura : number;
}

export default function AvatarImgOng({largura,altura} : typeProsAvatar) {

    const ong = useAppSelector((state) => state.AuthToken.dataOng) as Array<{
        Logo: string;
      }>;
     
      console.log(ong)

      const logoOng = ong[0]?.Logo.slice(16)

      localStorage.setItem('logoOng', logoOng)



  return (
    <div>
      <img  src={require(`../../uploads/${logoOng}`)} alt="" className={`w-${largura} h-${altura} 2xl:w-12 h-12 rounded-full object-cover `}/>   

    </div>
  )
}
