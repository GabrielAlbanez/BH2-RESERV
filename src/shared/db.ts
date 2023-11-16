import { PrismaClient } from "@prisma/client";
// esse prisma client vai fazer o intermedio entro o prisma e nossa aplicação

declare global {
  var cashPrisma: PrismaClient;
  //essa var é uma varivel global que vai fazer com que o prisma ficar em cache
}

let prisma : PrismaClient
if(process.env.NODE_ENV === "production"){
  prisma = new PrismaClient()
}else{
  if(!global.cashPrisma){
    global.cashPrisma = new PrismaClient()
  }
  prisma = global.cashPrisma
}
export const db = prisma
//essa var db server para guardar a instacina do prismaClient que vai fazer o intermedio entro o prisma e nossa aplicação

//esse codigo todo server para fazer um unica instancia do prisma client para cada cash feito                                           