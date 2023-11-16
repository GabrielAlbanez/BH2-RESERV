import { Router } from "express";
import { controllerTrablahos } from "../controllers/trabalho/index";
import { middlewareTrabalho } from "../middlewares/trabalho/index";

const trabalhosRotas = Router()

trabalhosRotas.get('/getAllWorks/:NameOrCpf',middlewareTrabalho.validateUserAdmOrOng,controllerTrablahos.getAlltrabalhos)
trabalhosRotas.get('/trabalho/:NameOrCpf',middlewareTrabalho.validateUserAdmOrOng,controllerTrablahos.getByWorksCnpjOng)
trabalhosRotas.post('/createTrabalho/:NameOrCpf',middlewareTrabalho.validateUserAdmOrOng,middlewareTrabalho.validateDataWokr,controllerTrablahos.createWorks)
trabalhosRotas.delete('/deleteTrabalhos/:NameOrCpf',middlewareTrabalho.validateUserAdmOrOng,controllerTrablahos.deleteWorks)




export default trabalhosRotas;