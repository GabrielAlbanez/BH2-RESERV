import { Router } from "express";
import { ControlerOngs } from "../controllers/ongs/index";
import { ongsMiddleware } from "../middlewares/ongs/index";
import upload from "../Config/multer";
import { authLogin } from "../middlewares/auth/authOng";
import { verifyToken } from "../middlewares/auth/verifiyTokenOng";

const routeOng = Router();

//routeOng.get('/allOngs/:userCPf', ongsMiddleware.validTypeUser,ControlerOngs.getAllOngs)
routeOng.get("/allOngs", ControlerOngs.getAllOngs);
routeOng.get(
  "/Ongs/:userCPf",
  ongsMiddleware.validTypeUser,
  ControlerOngs.getByNameOng
);
//  routeOng.post('/createOngs',ongsMiddleware.validaDataOngs,ongsMiddleware.validateDataOnsForAdmin,ControlerOngs.createOng)
//  depois dessa rota estiver 100%  feita colocar o middleware do email
routeOng.post(
  "/createOngs",upload.single('logo'),
  ongsMiddleware.validaDataOngs,
  ControlerOngs.createOng
);
routeOng.delete(
  "/deleteOngs/:userCPf",
  ongsMiddleware.validTypeUser,
  ControlerOngs.deleteOng
);
routeOng.get("/avaliar-ong/:cnpj", ControlerOngs.AvaliarOng);
routeOng.get("/naoAvaliar-ong/:cnpj", ControlerOngs.DesaAvaliarOng);

routeOng.post('/LoginOng',authLogin,ControlerOngs.LoginOng)
routeOng.get('/verificarTokenOng',verifyToken,(req,res)=>{
  res.status(200).json({message : "Logado"})
})

export default routeOng;
