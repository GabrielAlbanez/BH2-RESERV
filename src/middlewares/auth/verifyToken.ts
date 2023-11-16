import { NextFunction, Request, Response } from "express";
import { ioo } from "../../index";
import * as jwt from "jsonwebtoken";
import {configureSocketIO,connectedUsers} from "../../SocketIo/socket";

export const  verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // const token = req.session['token'];

  const authHeader = req.headers['authorization'];


  if (!authHeader) {
    return res.status(203).json({ message: "Você precisa estar logado" });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: "Formato de token inválido" });
  }

  // O token JWT está na segunda parte (índice 1) do array
  const token2 = parts[1];

  try {
    // const decodedToken = jwt.verify(token, "8080");
    const decodedToken2 = jwt.verify(token2,"8080")
    res.status(201).json({data : decodedToken2})
    ioo.emit('allUserConected',{
      usuarios : {
        connectedUsers
      }
    })
    next()
  } catch (err) {
    return res.status(203).json({ error: "Token expirado ou inválido", recomendation:  "fazer login novamente" });
  }
};