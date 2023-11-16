import { db as prisma } from "../../shared/db";
import { Request, Response } from "express";

export const getAllVoluntarios = async (req: Request, res: Response) => {
  try {
    const allVoluntarios = await prisma.voluntarios.findMany({
      include: {
        ong: true,
      },
    });

    res.status(200).json({ voluntarios: allVoluntarios });
  } catch (error) {
    res.status(404).json({ error: `erro ao buscar voluntarios ${error}` });
  }
};

export const getByIdVoluntario = async (req: Request, res: Response) => {
  try {
    const cpf = req.body;

    const Voluntario = await prisma.voluntarios.findMany({
      where: {
        cpf: cpf,
      },
      include: {
        ong: true,
      },
    });

    res.status(200).json({ voluntarios: Voluntario });
  } catch (error) {
    res.status(404).json({ error: `erro ao buscar voluntario ${error}` });
  }
};

export const getVoluntariosOng = async (req: Request, res: Response) => {
  try {
    const cnpjOng = req.body.cnpjOng;

    const Voluntarios = await prisma.voluntarios.findMany({
      where: {
        idOng: cnpjOng,
      },
      include: {
        ong: true,
      },
    });

    res.status(200).json({ voluntarios: Voluntarios });
  } catch (error) {
    res.status(404).json({ error: `erro ao buscar voluntarios ${error}` });
  }
};

export const CreateVoluntarios = async (req: Request, res: Response) => {
  try {
    const { cpf, nome, cnpjOng } = req.body;

    const createVoluntario = await prisma.voluntarios.create({
      data: {
        cpf,
        nome,
        idOng : cnpjOng,
      },
    });

    res.status(201).json({ VoluntarioCriado: createVoluntario });
  } catch (error) {
    res.status(404).json({ error: `erro ao criar voluntarios ${error}` });
  }
};

export const deleteVoluntarios = async (req: Request, res: Response) => {
  try {
    const { cpf } = req.body;

    const deleteVolturio = await prisma.voluntarios.delete({
      where: {
        cpf,
      },
    });

    res.status(201).json({ VoluntarioCriado: deleteVolturio });
  } catch (error) {
    res.status(404).json({ error: `erro ao buscar voluntarios ${error}` });
  }
};
