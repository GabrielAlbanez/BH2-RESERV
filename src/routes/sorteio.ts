import { Response, Router } from "express";
import { controllerSorteio } from "../controllers/sorteio/index";
import { ongsMiddleware } from "../middlewares/ongs/index";
import { middlewareSorteio } from "../middlewares/sorteio/index";
const rotaSorteio = Router()


rotaSorteio.post('/Drawlots',controllerSorteio.sorteioUsers)






export default rotaSorteio