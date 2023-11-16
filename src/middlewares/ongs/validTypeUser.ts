import { NextFunction, Request, Response } from "express";
import { db as prisma } from "../../shared/db";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { cnpj as cnpjValid } from "cpf-cnpj-validator";
import * as EmailValidator from "email-validator";
import nodemailer from "nodemailer";
import fetch from 'node-fetch';

export const validTypeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userCPf = req.params.userCPf;

  const adminCpf = await prisma.usuario.findMany({
    where: {
      tipo: "admin",
    },
    select: {
      cpf: true,
    },
  });

  const adminCpfs = adminCpf.map((admin) => admin.cpf);

  if (adminCpfs.includes(userCPf)) {
    //se bater quer dizer que o cpf do cara e de adm
    return next();
  } else {
    return res.status(403).json({ error: "Acesso não autorizado" });
  }
};


export const validateDataOnsForAdmin = async (req: Request,
res: Response,
next: NextFunction
) => {

  const { nome, endereco,cnpj,email,senha,telefone,redesSociais } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail", // Exemplo: "Gmail", "Outlook", ou use as configurações SMTP do seu serviço de email
    auth: {
      user: "gabriel.g.albanez@gmail.com", // Seu endereço de email
      pass: "b f b q q r x n b g a b u u j u", // A senha do seu email
    },
  });

  const approveLink = `http://localhost:8080/avaliar-ong/${cnpj}`;
 const  negarLink  = `http://localhost:8080/naoAvaliar-ong/${cnpj}`;
  

  const mailOptions = {
    from: "gabriel.g.albanez@gmail.com", // Seu endereço de email
    to: "gabriel.g.albanez@gmail.com", // O endereço de email do destinatário
    subject: "Dados da ongs para serem avaliados",
    text: `
      Nome: ${nome}
      Endereço: ${endereco}
      CNPJ: ${cnpj}
      Email: ${email}
      Senha: ${senha}
      Telefone: ${telefone}
      Redes Sociais: ${redesSociais}
      <a href="${approveLink}">Aprovar</a>
      <a href="${negarLink}">Não Avaliar</a>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
  
      return res.status(500).json({ error: `erro ao eviar o email ${error}` });
    } else {
      next()
  
    }
  });



}

export const validaDataOngs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nome, endereco,cnpj,email,senha,telefone,redesSociais } = req.body;

  const file = req.file

  const cnpjValido = cnpjValid.isValid(cnpj);
  const emailValido = EmailValidator.validate(email);
  const phoneNumberObject = parsePhoneNumberFromString(telefone);

  if (!nome || !endereco || !cnpj || !email || !senha || !telefone || !redesSociais) {
    return res.status(201).json({ error: "pré encha todos os campos" });
  }

   if(!file){
    return res.status(201).json({ error: 'Nenhum arquivo foi enviado.' });
   }
  
  if (!emailValido) {
    return res.status(201).json({ error: "Email inválido" });
  }


  const emailExisting = await prisma.ong.findMany({
    where : {
      email : email,
    }
  })

  if(emailExisting.length > 0){
    return res.status(201).json({error : "email ja cadastrado"})
  }







  if (!cnpjValido) {
    return res.status(201).json({ error: "cnpj inválido" });
  }
 
  const cnpjValidoExisting = await prisma.ong.findMany({
    where : {
       cnpj : cnpj,
    }
  })

  if(cnpjValidoExisting.length > 0){
    return res.status(201).json({error : "cnpj ja cadastrado"})
  }






  if (!phoneNumberObject || !phoneNumberObject.isValid()) {
    return res.status(201).json({error : "telefone invalido"})
  } 

  
  const telefoneExisting = await prisma.ong.findMany({
    where : {
       telefone : telefone,
    }
  })


  if(telefoneExisting.length > 0){
    return res.status(201).json({error : "telefone ja cadastrado"})
  }



  const nameOngs = await prisma.ong.findMany({
    where: {
      nome: nome,
    },
  });

  const enderecoOng = await prisma.ong.findMany({
    where: {
      endereco: endereco,
    },
  });

  if (nameOngs.length > 0) {
     return res.status(201).json({ error: "ong ja cadastrada" });
  }

  if (enderecoOng.length > 0) {
   return res.status(201).json({ error: "ong ja cadastrada" });
  }

  next();
};
