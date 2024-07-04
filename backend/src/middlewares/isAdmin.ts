import { Request, Response, NextFunction } from "express";
import { UserType } from "../resources/userType/userType.constants";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const is_admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.tipoUsuarioId === UserType.ADMIN) next();
  else return res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
};

export const is_auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.tipoUsuarioId === UserType.CLIENT) next();
  else return res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
};
