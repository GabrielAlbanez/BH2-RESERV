import { NextFunction, Request, Response } from "express";
import { cpf as cpfValid } from "cpf-cnpj-validator";
import { db as prisma } from "../../shared/db";
import { cnpj as cnpjValid } from "cpf-cnpj-validator";

export const validateDataVoluntario = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { cpf, nome, cnpjOng } = req.body;

  const cpfValido = cpfValid.isValid(cpf)
  const cnpjValido = cnpjValid.isValid(cnpjOng);

  if(!cpf || !nome || !cnpjOng){
    return res.status(203).json({message : "por favor pre encha todos os campos"})
  }

  if(!cpfValido){
    return res.status(203).json({message : "cpf invalido " })
  }

  if(!cnpjValido){
    return res.status(203).json({message : "cnpj da ong invalido " })
  }

  const idsOng = await prisma.ong.findMany({
    where : {
      cnpj : cnpjOng
    },
    select : {
      cnpj : true
    }
  })

  const idssOng = idsOng.map((ong)=>ong.cnpj)
  const valuntarioExisting = await prisma.voluntarios.findMany({
    where : {
      cpf : cpf
    }
  })

  if(valuntarioExisting.length > 0){
    return res.status(203).json({message : "voluntario already exists"})
  }
  

  if(idssOng.includes(cnpjOng)){
    next()
  }
  else{
    res.status(203).json('essa ong n existe')
  }

   


};

export const validateTypeUser= async(
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const NameOrCpf = req.params.NameOrCpf;

  const nomeOng = await prisma.ong.findMany({
    where: {
      nome: NameOrCpf,
    },
    select: {
      nome: true,
    },
  });

  const ongNomes = nomeOng.map((nome) => nome.nome);


  const adminCpf = await prisma.usuario.findMany({
    where: {
      tipo: "admin",
    },
    select: {
      cpf: true,
    },
  });

  const adminCpfs = adminCpf.map((admin) => admin.cpf);

  if (ongNomes.includes(NameOrCpf) || adminCpfs.includes(NameOrCpf)) {
    next();
  } else {
    return res.status(203).json({ error: "Acesso não autorizado" });
  }
};


