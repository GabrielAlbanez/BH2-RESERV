import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import rotaUser from "./routes/users";
import routeOng from "./routes/ongs";
import rifasRoute from "./routes/rifas";
import voluntarioRouter from "./routes/voluntarios";
import trabalhosRotas from "./routes/trabalhos";
import rotaSorteio from "./routes/sorteio";
import session from "express-session";
import http from 'http';
import {configureSocketIO} from "./SocketIo/socket";
const app = express();
const server = http.createServer(app);
 export const ioo = configureSocketIO(server);

dotenv.config();
const porta = process.env.PORT || 5001;

app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:3000",
    methods : 'GET,POST',
    credentials: true,
    optionsSuccessStatus : 204
  })
);


app.use(
  session({
    secret: '8080',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false,maxAge: 3600000 },
     //tem que ativar isso com true no front end para enviar os cokies http
  })
);




app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome Be Human");
});

app.use(rotaUser,routeOng,rifasRoute,voluntarioRouter,trabalhosRotas,rotaSorteio)


server.listen(porta, () => {
  console.log(`server rodando na porta ${porta}`);
});
