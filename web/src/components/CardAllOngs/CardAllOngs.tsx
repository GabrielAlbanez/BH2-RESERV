import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../uploads/1697800913136-921937213.jpg";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function CardAllOngs() {
  type dataOng = {
    Logo: string;
    nome : string;
    telefone : string;
    cnpj : string;


  };

  const [dataOng, setDataOng] = useState<dataOng[]>([]);




  useEffect(() => {
    const url = "http://localhost:8080/allOngs";
    axios.get(url).then((response) => {
      const data = response.data;
      setDataOng(data.ongs);
    });
  }, []);
  

  console.log(dataOng);

  const url = dataOng.map((valor) => valor.Logo.slice(16));
  const cnpjLimpo = dataOng.map((valor) => valor.cnpj.replace(/[^\d]/g, ''))
  console.log(url);

  return (
    <div className="flex gap-20  flex-wrap h-full w-full items-center justify-center ">
      {dataOng.map((ong, index) => (
        <Link to={`/Ong/${cnpjLimpo[index]}`}>
        <div key={index}>
          <Card className="w-80 shadow-xl shadow-purple-500">
            <CardHeader shadow={false} floated={false} className="h-64">
              <img
                src={require(`../../uploads/${url[index]}`)}
                alt="card-image"
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody className="text-black  text-xl w-full">
              <div className="mb-2 flex items-center justify-center">
                <Typography color="blue-gray" className="font-medium">
                  {ong.nome}
                </Typography>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                ripple={false}
                fullWidth={true}
                className="bg-blue-gray-900/10 text-black shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              >
                Ver mais...
              </Button>
            </CardFooter>
          </Card>
        </div>
        </Link>
      ))}
    </div>
  );
}
