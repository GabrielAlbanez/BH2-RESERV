import { NextFunction, Request, Response } from "express";
import { db as prisma } from "../../shared/db";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export const authLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(203).json({ error: "favor pre-encher todos os campos" });
  }



  const emailValid = await prisma.ong.findMany({
    where: {
      email: email,
    },
  });

  if (emailValid.length == 0) {
    return res.status(203).json({ error: "E-Mail Invalido" });
  }

  const senhaUser = await prisma.ong.findFirst({
    where: {
      email: email,
    },
    select: {
      senha: true,
    },
  });

  const senhaValida = await bcrypt.compare(senha, senhaUser.senha);

  if (!senhaValida) {
    return res.status(203).json({ error: "senha invalida" });
  }


  const dataOng = await prisma.ong.findMany({
    where : {
        email : email
    },
    select : {
         
         email : true,
         cnpj : true,
         endereco : true,
         Logo : true,
         nome : true,
         redesSociais : true,
         rifas : true,
         telefone : true,
         trabalhos : true,
         Voluntarios : true,
    }
  })


  const timeExpiressToken =  24 * 60 * 60; //24 hours
  const generateToken = jwt.sign({dataOng},"8080",{
    expiresIn : timeExpiressToken
  })
   
  if(generateToken){
    req.session['tokenOng'] = generateToken
    next()
  }


};
