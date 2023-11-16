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
    return res
      .status(203)
      .json({ error: "favor pre-encher todos os campos" });
  }

  const emailValid = await prisma.usuario.findMany({
    where: {
      email: email,
    },
  });

  if (emailValid.length == 0) {
    return res.status(203).json({ error: "E-Mail Invalido" });
  }

  const senhaUser = await prisma.usuario.findFirst({
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

  const dataUser = await prisma.usuario.findMany({
    where : {
        email : email
    },
    select : {
        cpf : true,
        email : true,
        numerosComprados :true,
        sexo  : true,
        tipo : true
    }
  })

  const timeExpiressToken =  24 * 60 * 60; //24 hours
  const generateToken = jwt.sign({dataUser},"8080",{
    expiresIn : timeExpiressToken
  })
   
  if(generateToken){
    req.session['token'] = generateToken
    next()
  }

};
