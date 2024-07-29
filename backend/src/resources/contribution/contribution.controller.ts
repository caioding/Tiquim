import { Request, Response } from "express";
import { CreateContributionDto } from "./contribution.types";
import {
  calculatePercentage,
  createContribution,
  listContributions,
  readContribution,
} from "./contribution.service";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const index = async (req: Request, res: Response) => {
  try {
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
    const campaignId = req.query.campaign ? req.query.campaign.toString() : "";
    const skip = req.query.skip ? parseInt(req.query.skip.toString()) : undefined;
    const take = req.query.take ? parseInt(req.query.take.toString()) : undefined;
    const uid = req.session.uid ? req.session.uid : "";
    const contributions = await listContributions(campaignId, uid, skip, take);
    res.status(StatusCodes.OK).json(contributions);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const contribution = req.body as CreateContributionDto;
  try {
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
    const uid = req.session.uid!;
    const newContribution = await createContribution(contribution, uid);
    res.status(StatusCodes.OK).json(newContribution);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const read = async (req: Request, res: Response) => {
  try {
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
    const { id } = req.params;
    const uid = req.session.uid!;
    const contribution = await readContribution(id, uid);
    if (!contribution) return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(contribution);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const readPercentage = async (req: Request, res: Response) => {
  const { campaignId } = req.params;
  try {
    const sum = await calculatePercentage(campaignId);
    if (!sum) return res.status(StatusCodes.OK).json(0);
    res.status(StatusCodes.OK).json(sum);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export default { index, create, read, readPercentage };
