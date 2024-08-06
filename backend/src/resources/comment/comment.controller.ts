import { Request, Response } from "express";
import { CreateCommentDto } from "./comment.types";
import { createComment, listComments } from "./comment.service";
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
    const comments = await listComments(campaignId, skip, take);
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
  const comment = req.body as CreateCommentDto;
  const uid = req.session.uid!;
  try {
    const newComment = await createComment(comment, uid);
    res.status(StatusCodes.OK).json(newComment);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export default { index, create };
