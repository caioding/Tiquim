import { Request, Response, NextFunction } from "express";
import { TiposUsuarios } from "../resources/tipoUsuario/tipoUsuario.constants";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.tipoUsuarioID === TiposUsuarios.ADMIN) next();
  else return res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.tipoUsuarioID === TiposUsuarios.CLIENT) next();
  else return res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
};
