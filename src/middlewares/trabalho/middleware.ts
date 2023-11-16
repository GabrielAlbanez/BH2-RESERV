import { NextFunction, Request, Response } from "express";
import { db as prisma } from "../../shared/db";
import { cnpj as cnpjValid } from "cpf-cnpj-validator";

export const validateDataWokr = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nome, descricao, cnpjOng } = req.body;
  const cnpjValido = cnpjValid.isValid(cnpjOng);

  if (!nome || !descricao || !cnpjOng) {
    return res.status(203).json({
      message: "pre encha todos os campos",
    });
  }

  if (!cnpjValido) {
    return res.status(203).json({ error: "cnpj inválido" });
  }

  const nameWorks = await prisma.trabalho.findMany({
    where : {
      nome : nome
    },
    select : {
      nome : true
    }
  })

  const names = nameWorks.map((work)=>work.nome)


  const cnpjssOng = await prisma.ong.findMany({
    where: {
      cnpj: cnpjOng,
    },
    select: {
      cnpj: true,
    },
  });

  const pegarTodos = cnpjssOng.map((ong) => ong.cnpj);

  if (pegarTodos.includes(cnpjOng) && !names.includes(nome)) {
    next();
  } else {
    return res.status(404).json({
      message: "essa ong n existe, ou o trabalho ja esta cadastrado",
    });
  }
};

export const validateUserAdmOrOng = async (
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
