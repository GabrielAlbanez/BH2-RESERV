import { Router } from "express";
import { ControlerUsers } from "../controllers/users/indexl";
import { userMiddlewares } from "../middlewares/users/index";
import { authLogin } from "../middlewares/auth/auth";
import { verifyToken } from "../middlewares/auth/verifyToken";



const Rotauser  = Router()


Rotauser.get('/allUsers/:cpfValidate',userMiddlewares.validTypeUser,ControlerUsers.getAllUsers)
Rotauser.get('/user/:userCpf',ControlerUsers.getByCpfUser)
Rotauser.post('/createUser',userMiddlewares.validateDataUser,ControlerUsers.createUser)
Rotauser.delete('/deleteUser/:cpfValidate',userMiddlewares.validTypeUser,ControlerUsers.deleteUser)
Rotauser.post('/byRifas',userMiddlewares.validateByRifas,ControlerUsers.byRifas)
Rotauser.post('/Login',authLogin,ControlerUsers.Login)
Rotauser.get('/verificarToken',verifyToken,(req,res)=>{
    res.status(200).json({message : "Logado"})
})





export default Rotauser

