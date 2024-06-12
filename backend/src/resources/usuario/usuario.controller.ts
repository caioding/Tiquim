import { Request, Response } from "express";
import { CreateUsuarioDto, TipoUsuario, UsuarioDto } from "./usuario.types";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
  createUsuario,
  deleteUsuario,
  listUsuarios,
  readUsuario,
  updateUsuario,
} from "./usuario.service";

const index = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Lista todos os usuário.'
  #swagger.responses[200] = {
  schema: { $ref: '#/definitions/Usuario' }
  }
  */
  const skip = req.query.skip ? parseInt(req.query.skip.toString()) : undefined;
  const take = req.query.take ? parseInt(req.query.take.toString()) : undefined;
  try {
    const produtos = await listUsuarios(skip, take);
    res.status(StatusCodes.OK).json(produtos);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const usuario = req.body as CreateUsuarioDto;
  const tipoUsuario = req.query.tipoUsuario as TipoUsuario;
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
    const novoUsuario = await createUsuario(usuario, tipoUsuario);
    res.status(StatusCodes.OK).json(novoUsuario);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const read = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Mostra um usuário com base no ID.'
  #swagger.parameters['id'] = { description: 'ID do usuário' }
  #swagger.responses[200] = {
  schema: { $ref: '#/definitions/Usuario' }
  }
  */
  const { id } = req.params;
  try {
    const usuario = await readUsuario(id);
    if (!usuario) return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(usuario);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const update = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Modifica os atributos de um usuário.'
  #swagger.parameters['id'] = { description: 'ID do usuário' }
  #swagger.parameters['body'] = {
  in: 'body',
  schema: { $ref: '#/definitions/UpdateUsuarioDto' }
  }
  #swagger.responses[200] = {
  schema: { $ref: '#/definitions/Usuario' }
  }
  */
  const { id } = req.params;
  const produto = req.body as UsuarioDto;
  try {
    const updatedProduto = await updateUsuario(id, produto);
    res.status(StatusCodes.NO_CONTENT).json();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const remove = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Apaga um usuário com base no ID.'
  #swagger.parameters['id'] = { description: 'ID do usuário' }
  */
  const { id } = req.params;
  try {
    const deletedProduto = await deleteUsuario(id);
    res.status(StatusCodes.NO_CONTENT).json();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export default { index, create, read, update, remove };
