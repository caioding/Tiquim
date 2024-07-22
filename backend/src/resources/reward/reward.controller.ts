import { Request, Response } from "express";
import { CreateRewardDto } from "./reward.types";
import {
  createReward,
  listRewards,
  readReward,
  deleteReward,
  updateReward,
} from "./reward.service";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

// Listar recompensas
const index = async (req: Request, res: Response) => {
  try {
    const campaignId = req.query.campaign ? req.query.campaign.toString() : "";
    const skip = req.query.skip ? parseInt(req.query.skip.toString()) : undefined;
    const take = req.query.take ? parseInt(req.query.take.toString()) : undefined;
    const rewards = await listRewards(campaignId, skip, take);
    res.status(StatusCodes.OK).json(rewards);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Criar uma nova recompensa
const create = async (req: Request, res: Response) => {
  const reward = req.body as CreateRewardDto;
  try {
    const newReward = await createReward(reward);
    res.status(StatusCodes.CREATED).json(newReward);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Ler uma recompensa pelo ID
const read = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reward = await readReward(id);
    if (!reward) return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(reward);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Atualizar uma recompensa pelo ID
const update = async (req: Request, res: Response) => {
  const reward = req.body as Partial<CreateRewardDto>;
  try {
    const updatedReward = await updateReward(req.params.id, reward);
    if (!updatedReward) return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(updatedReward);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// Deletar uma recompensa pelo ID
const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedReward = await deleteReward(id);
    if (!deletedReward) return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(deletedReward);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export default { index, create, read, update, remove };
