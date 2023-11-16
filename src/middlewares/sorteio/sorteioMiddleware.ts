import { NextFunction, Request, Response } from "express";
import { db as prisma } from "../../shared/db";


export const validateIdRifa = async(req : Request, res : Response, next : NextFunction) => {

    const idRifa = req.params


    const idRifaExisting =  await prisma.rifa.findMany({
        where : {
            id : idRifa
        }
    })

    if(idRifaExisting.length <= 0){
        return res.status(203).json({
          message : "essa rifa não existe para fazer sorteio"
        })
    }
    else { 
        next()
    }

}