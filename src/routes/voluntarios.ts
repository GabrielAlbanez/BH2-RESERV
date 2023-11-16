import { controllerVoluntarios } from "../controllers/voluntarios/index"
import { middlewareVoluntario } from "../middlewares/voluntarios/index";
import { Router } from "express";



const voluntarioRouter = Router()

voluntarioRouter.get('/AllVoluntarios/:NameOrCpf',middlewareVoluntario.validateTypeUser,controllerVoluntarios.getAllVoluntarios)
voluntarioRouter.get('/voluntario/:NameOrCpf',middlewareVoluntario.validateTypeUser,controllerVoluntarios.getByIdVoluntario)
voluntarioRouter.post('/voluntarioOng/:NameOrCpf',middlewareVoluntario.validateTypeUser,controllerVoluntarios.getVoluntariosOng)
voluntarioRouter.post('/createVoluntario/:NameOrCpf',middlewareVoluntario.validateTypeUser,middlewareVoluntario.validateDataVoluntario,controllerVoluntarios.CreateVoluntarios)
voluntarioRouter.delete('/deleteVoluntario/:NameOrCp',middlewareVoluntario.validateTypeUser,controllerVoluntarios.deleteVoluntarios)



export default voluntarioRouter