import React, { useState } from "react";
import { useTema } from "../../common/context/Tema";
import { useTypeUser } from "../../common/context/typeUserCadastro";
import Button from "../../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { LogUser, takeToken } from "../../store/slices/AuthToken";
import { useAppSelector } from "../../store/intex";

export default function Login() {
  const { pegarTypeUser, setPegarTypeUser } = useTypeUser() as {
    setPegarTypeUser: (value: string) => void;
    pegarTypeUser: string;
  };

  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  const [dataLogin, setDataLogin] = useState({
    email: "",
    senha: "",
  });

  const navigator = useNavigate();

  const dispacht = useDispatch();

  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
  }>;

  const hanleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setDataLogin((dados) => ({
      ...dados,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log(dataLogin);
      const request = await axios.post(
        "http://localhost:8080/Login",
        dataLogin
      );
      const responseData = request.data;
      // console.log(responseData);
      localStorage.setItem("token", responseData?.token);
      const token = localStorage.getItem("token");

      dispacht(takeToken([token]));

      if ("error" in responseData) {
        const notify = () => {
          toast(`${responseData.error}`, {
            icon: `${pegarTema === "dark" ? "🌑" : " 🌞"}`,
            style: {
              borderRadius: "10px",
              background: `${pegarTema === "dark" ? "#333" : "white"}`,
              color: `${pegarTema === "dark" ? "white" : "black"}`,
            },
          });
        };

        notify();
      } else {
        const notify = () => {
          toast(`${responseData.message}`, {
            icon: `${pegarTema === "dark" ? "🌑" : " 🌞"}`,
            style: {
              borderRadius: "10px",
              background: `${pegarTema === "dark" ? "#333" : "white"}`,
              color: `${pegarTema === "dark" ? "white" : "black"}`,
            },
          });
        };

        setTimeout(() => {
          navigator("/Home");
          localStorage.setItem("isLoged", "true");
          window.location.reload();

          notify();
        }, 1000);
      }
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  };

  const handleSubmitOng = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const request = await axios.post(
        "http://localhost:8080/LoginOng",
        dataLogin
      );
      const responseData = request.data;
      localStorage.setItem("token", responseData?.token);
      if ("error" in responseData) {
        const notify = () => {
          toast(`${responseData.error}`, {
            icon: `${pegarTema === "dark" ? "🌑" : " 🌞"}`,
            style: {
              borderRadius: "10px",
              background: `${pegarTema === "dark" ? "#333" : "white"}`,
              color: `${pegarTema === "dark" ? "white" : "black"}`,
            },
          });
        };
        notify();
      } else {
        const notify = () => {
          toast(`${responseData.message}`, {
            icon: `${pegarTema === "dark" ? "🌑" : " 🌞"}`,
            style: {
              borderRadius: "10px",
              background: `${pegarTema === "dark" ? "#333" : "white"}`,
              color: `${pegarTema === "dark" ? "white" : "black"}`,
            },
          });
        };

        setTimeout(() => {
          navigator("/RfiasOng");
          localStorage.setItem("isLoged", "ongLogada");
          window.location.reload();

          notify();
        }, 1000);
      }
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  };

  return (
    <>
      {pegarTypeUser === "Ong" ? (
        <>
          <form
            onSubmit={handleSubmitOng}
            className={`transition-all duration-1000  w-full h-[91vh]  sm:h-[91vh] lg:h-[100%] xl:h-[91vh] 2xl:h-[91vh]  flex flex-col items-center justify-center gap-16  sm:gap-9 2xl:gap-16
            ${
              pegarTema === "dark" ? "bg-[#202020] text-white" : "bg-[#CEF3FF]"
            } 
            `}
          >
            <div>
              <p className="text-2xl sm:text-4xl">Login Ong</p>
            </div>
            <div className="flex flex-col gap-10 sm:gap-2 2xl:gap-16 w-[80%] justify-center items-center sm:w-[100%] ">
              <div className="flex gap-2 flex-col ">
                <label htmlFor="">email</label>
                <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh]  2xl:h-[6vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                  <input
                    value={dataLogin.email}
                    onChange={hanleInputChange}
                    name="email"
                    type="text"
                    placeholder="name@example.com.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>

              <div className="flex gap-2 flex-col ">
                <label htmlFor="">senha</label>
                <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                  <input
                    value={dataLogin.senha}
                    onChange={hanleInputChange}
                    name="senha"
                    type="text"
                    placeholder="name@example.com.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>
            </div>

            <div className=" bg flex items-center justify-center w-[80%] sm:w-[50%] xl:w-[30%] ">
              <Button type="submit">Enivar</Button>
            </div>
          </form>
        </>
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            className={`transition-all duration-1000  w-full h-[91vh]  sm:h-[91vh] lg:h-[100%] xl:h-[91vh] 2xl:h-[91vh]  flex flex-col items-center justify-center gap-16  sm:gap-9 2xl:gap-16
            ${
              pegarTema === "dark" ? "bg-[#202020] text-white" : "bg-[#CEF3FF]"
            } 
            `}
          >
            <div>
              <p className="text-2xl sm:text-4xl">Login</p>
            </div>
            <div className="flex flex-col gap-10 sm:gap-2 2xl:gap-16 w-[80%] justify-center items-center sm:w-[100%] ">
              <div className="flex gap-2 flex-col ">
                <label htmlFor="">Email</label>
                <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh]  2xl:h-[6vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                  <input
                    value={dataLogin.email}
                    onChange={hanleInputChange}
                    name="email"
                    type="text"
                    placeholder="name@example.com.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>

              <div className="flex gap-2 flex-col ">
                <label htmlFor="">Senha</label>
                <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                  <input
                    value={dataLogin.senha}
                    onChange={hanleInputChange}
                    name="senha"
                    type="text"
                    placeholder="name@example.com.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>
            </div>

            <div className=" bg flex items-center justify-center w-[80%] sm:w-[50%] xl:w-[30%] ">
              <Button type="submit">Enivar</Button>
            </div>
          </form>
        </>
      )}
    </>
  );
}
