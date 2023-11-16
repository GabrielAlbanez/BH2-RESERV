import React, { createContext, ReactNode, useContext, useState } from "react";

type TypeUserCadastro = {
  pegarTypeUser: string;
  setPegarTypeUser: React.Dispatch<React.SetStateAction<string>>;
};

const TypeUserContext = createContext<TypeUserCadastro | undefined>(undefined);

type TypeUserProps = {
  children: ReactNode;
};

export default function TypeUserProvider({ children }: TypeUserProps) {
  const [pegarTypeUser, setPegarTypeUser] = useState<string>("");

  return (
    <TypeUserContext.Provider value={{ pegarTypeUser, setPegarTypeUser }}>
      {children}
    </TypeUserContext.Provider>
  );
}

export function useTypeUser() : TypeUserCadastro | undefined{
    const typeUser = useContext(TypeUserContext)
    return typeUser
}
