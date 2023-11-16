import { cnpj } from "cpf-cnpj-validator";
import { db as prisma } from "../../shared/db";
import { Request, Response } from "express";

export const getAllRifas = async(req: Request, res: Response)=>{

  try{

    const allrifas  = await prisma.rifa.findMany({
      include : {
        ong : true,
        NumeroComprado : true,
      }
    })
    res.status(200).json({rifas : allrifas})

  }
  catch(error){
    res.status(404).json({message : `error ao buscar rifas ${error}`})
  }

}

export const getByRifasOng  = async(req : Request, res : Response)=>{
  try{

    const cnpjOng = req.body.cnpjOng;


    const AllRifasOng = await prisma.rifa.findMany({
      where : {
        idOng : cnpjOng
      },
      select : {
          imgRifa : true,
          nome : true,
          descricao : true,
          preco : true,
          idOng : true,
          id : true
          

      }
    })

    res.status(200).json({rifas : AllRifasOng})

  }
  catch(error){
    res.status(404).json({message : `erro ao busca rifa de um certa ong${error}`})
  }
}

export const createRifas = async(req : Request, res : Response)=>{

  try{

    const {nome,preco,descricaon,cnpj} = req.body


    const file = req.file

    const createRifa = await prisma.rifa.create({
      data : {
        nome : nome,
        preco : preco,
        descricao : descricaon,
        idOng : cnpj,
        imgRifa : file.path
      }
    })

    res.status(201).json({rifaCriada : createRifa})

  }
  catch(error){
    res.status(404).json({err : error})
  }
}

export const deleteRifa = async(req : Request, res : Response) => {

  try{

     const idRifa = req.body.idRifa

     const deleteRifa = await prisma.rifa.delete({
      where : {
        id : idRifa
      }
     })

     res.status(203).json({sucess : deleteRifa})


  }
  catch(error){
    res.status(404).json({err : `erro ao deletar rifa ${error}`})
  }

}

export const getRifaByid = async(req : Request, res : Response) => {


  const id = req.params.id

  const idInt = parseInt(id);

  try {



    const getRifaByyId = await prisma.rifa.findMany({
      where : {
       id : idInt
      },
      select : {
        imgRifa : true,
        NumeroComprado : true,
        nome : true,
        preco : true,
        descricao : true
      }
    })

    res.status(201).json({rifa : getRifaByyId})

    
  } catch (error) {
    res.status(404).json({err : `erro ao buscar rifa ${error}`})
  }

}

export const getByRifasForCpfUser = async (req: Request, res: Response)=>{
  
  const {cpf} = req.body

  try {

    const rifasUser = await prisma.usuario.findMany({
      where : {
        cpf : cpf
      },
      select : {
        numerosComprados : {
          where : {
            usuarioCpf : cpf
          },
          select : {
            numero : true,
            rifa : {
              select : {
                id : true,
                imgRifa : true,
                nome : true,
                preco : true,
                descricao : true,
                sorteado : true,
                ong : {
                  select : {
                    nome : true
                  }
                }
              }
            },
           
            
          }
        }
      }
    })

    res.status(201).json({message : rifasUser})
    
  } catch (error) {
    res.status(404).json({error : `erro ao buscar as rifas ${error.message}`})

  }

}


export const getByRifasForCnpjOng = async (req: Request, res: Response)=>{


  const cnpjOng = req.body.cnpjOng


  try {


    const rifas = await prisma.ong.findMany({
      where : {
        cnpj : cnpjOng
      },
      select : {
        nome : true,
        Logo : true,
        trabalhos : true,
        Voluntarios : true,
        rifas : true,
        endereco : true,
        redesSociais : true,
        telefone : true
      }
    })

    res.status(200).json({dataOng : rifas})


    
  } catch (error) {
     res.status(404).json({error : `erro ao buscar as rifas ${error.message}`})
  }

}