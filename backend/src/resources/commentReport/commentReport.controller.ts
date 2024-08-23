import { Request, Response } from "express";
import { CreateCommentReportDto } from "./commentReport.types";
import {
  createCommentReport,
  deleteAllCommentReport,
  deleteCommentReport,
  listCommentReports,
} from "./commentReport.service";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const index = async (req: Request, res: Response) => {
  /*
      #swagger.summary = 'Cria um usuário novo.'
      #swagger.parameters['tipoUsuario'] = { description: 'Tipo do usuário' }
      #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/CreateUsuarioDto' }
      }
      #swagger.responses[200] = {
      schema: { $ref: '#/definitions/Usuario' }
      }
  */
  const { campaignId } = req.params;
  const skip = req.query.skip ? parseInt(req.query.skip.toString()) : undefined;
  const take = req.query.take ? parseInt(req.query.take.toString()) : undefined;
  try {
    const comments = await listCommentReports(campaignId, skip, take);
    res.status(StatusCodes.OK).json(comments);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Cria um usuário novo.'
    #swagger.parameters['tipoUsuario'] = { description: 'Tipo do usuário' }
    #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/CreateUsuarioDto' }
    }
    #swagger.responses[200] = {
    schema: { $ref: '#/definitions/Usuario' }
    }
  */
  const comment = req.body as CreateCommentReportDto;
  const uid = req.session.uid!;
  try {
    const newComment = await createCommentReport(comment, uid);
    res.status(StatusCodes.OK).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const remove = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Cria um usuário novo.'
    #swagger.parameters['tipoUsuario'] = { description: 'Tipo do usuário' }
    #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/CreateUsuarioDto' }
    }
    #swagger.responses[200] = {
    schema: { $ref: '#/definitions/Usuario' }
    }
  */
  const { commentReportId } = req.params;
  try {
    await deleteCommentReport(commentReportId);
    res.status(StatusCodes.NO_CONTENT).json();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const removeAll = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Cria um usuário novo.'
    #swagger.parameters['tipoUsuario'] = { description: 'Tipo do usuário' }
    #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/CreateUsuarioDto' }
    }
    #swagger.responses[200] = {
    schema: { $ref: '#/definitions/Usuario' }
    }
  */
  const { commentId } = req.params;
  try {
    await deleteAllCommentReport(commentId);
    res.status(StatusCodes.NO_CONTENT).json();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export default { index, create, remove, removeAll };
