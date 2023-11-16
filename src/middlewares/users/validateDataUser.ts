import { NextFunction, Request, Response } from "express";
import { cpf as cpfValid } from "cpf-cnpj-validator";
import * as EmailValidator from "email-validator";
import { db as prisma } from "../../shared/db";
import { parsePhoneNumberFromString } from 'libphonenumber-js';



export const validTypeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cpfValidate = req.params.cpfValidate;

  const adminCpf = await prisma.usuario.findMany({
    where: {
      tipo: "admin",
    },
    select: {
      cpf: true,
    },
  });

  const adminCpfs = adminCpf.map((admin) => admin.cpf);

  if (adminCpfs.includes(cpfValidate)) {
    //se bater quer dizer que o cpf do cara e de adm
    return next();
  } else {
    return res.status(203).json({ error: "Acesso não autorizado" });
  }
};









export const validateDataUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cpf, nome, email, senha, sexo, endereco, type, telefone } = req.body;
  const cpfValido = cpfValid.isValid(cpf);
  const emailValido = EmailValidator.validate(email);
  const phoneNumberObject = parsePhoneNumberFromString(telefone);


  if (!nome || !email || !cpf || !senha || !sexo || !endereco  || !telefone) {
    return res.status(203).json({ error: "favor pre-encher todos os dados" });
  }

  if (!emailValido) {
    return res.status(203).json({ error: "Email inválido" });
  }

  const existingEmail = await prisma.usuario.findMany({
    where: {
      email: email,
    },
  });

  if (existingEmail.length > 0) {
    return res.status(203).json({ error: "Email ja cadastrado" });
  }

  if (!cpfValido) {
    return res.status(203).json({ error: "cpf inválido" });
  }

  const cpfExisting = await prisma.usuario.findMany({
    where: {
      cpf: cpf,
    },
  });

  if (cpfExisting.length > 0) {
    return res.status(200).json({ error: "cpf ja cadastrado" });
  }

  if (sexo !== "masculino" && sexo !== "feminino") {
    return res.status(203).json({ error: "sexo nao existente" });
  }


  
 
if (!phoneNumberObject || !phoneNumberObject.isValid()) {
  return res.status(203).json({error : "telefone invalido"})
} 

  const telefoneExisting = await prisma.usuario.findMany({
    where : {
      telefone : telefone
    }
  })

  if(telefoneExisting.length > 0){
    return res.status(203).json({error : "telefone ja cadastrado"})
  }

  next();
};

export const validateByRifas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cpf, id, numero } = req.body;

  if (!cpf || !id || !numero) {
    return res.status(203).json({ message: "pre encha todos os campos" });
  }

  const cpfValido = cpfValid.isValid(cpf);

  if (!cpfValido) {
    return res.status(203).json({ err: "cpf invalid" });
  }

  const idssRRifas = await prisma.rifa.findMany({
    where: {
      id: id,
    },
    select: {
      id: true,
    },
  });

  const TodosIds = idssRRifas.map((rifa) => rifa.id);

  const cpfsUSers = await prisma.usuario.findMany({
    where: {
      cpf: cpf,
    },
    select: {
      cpf: true,
    },
  });

  const pegarCpf = cpfsUSers.map((user) => user.cpf);

  if (!pegarCpf.includes(cpf)) {
    return res.status(203).json({ error: "cpf invalido" });
  }

  if (!TodosIds.includes(id)) {
    return res.status(203).json({ message: "rifa inexistente" });
  }
  // else{
  //  return  res.status(404).json('rifa ou cpf inexistente')
  // }

  const numerosComprados = await prisma.numeroComprado.findMany({
    where: {
      numero: numero,
    },
  });

  if (numerosComprados.length > 0) {
    return res.status(203).json({ message: "esse numero ja foi comprado" });
  }

  next();
};
