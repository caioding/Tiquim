import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ChangeLangDto } from "./language.types";

const change_language = (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Troca o idioma da aplicação.'
  #swagger.parameters['body'] = {
  in: 'body',
  schema: { $ref: '#/definitions/ChangeLangDto' }
  }
  */
  const { lang } = req.body as ChangeLangDto;
  res.cookie("lang", lang);
  res.status(StatusCodes.NO_CONTENT).json();
};

export default { change_language };
