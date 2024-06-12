import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { CompraDto } from "./compra.types";
import { v4 } from "uuid";
import { finishCompra } from "./compra.service";

const index = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Lista os produtos no carrinho.'
  #swagger.responses[200] = {
  schema: { $ref: '#/definitions/CompraDto' }
  }
  */
  const carrinho = req.session.carrinho || [];
  try {
    res.status(StatusCodes.OK).json(carrinho);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erro interno do servidor" });
  }
};

const create = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Adiciona um item no carrinho.'
  #swagger.parameters['produtoID'] = { description: 'ID do produto' }
  #swagger.parameters['body'] = {
  in: 'body',
  schema: { $ref: '#/definitions/QuantidadeCompra' }
  }
  #swagger.responses[200] = {
  schema: { $ref: '#/definitions/CompraDto' }
  }
  */
  const { produtoID } = req.params;
  const { quantidade } = req.body;
  const usuarioID = req.session.uid;
  const carrinho = req.session.carrinho || [];
  try {
    if (!quantidade || typeof quantidade !== "number" || quantidade < 1) {
      return res.status(400).json({ error: "Quantidade inválida" });
    }

    if (!usuarioID) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const produtoExistente = carrinho.find((item) => item.produtoID === produtoID);
    if (produtoExistente) {
      produtoExistente.quantidade += quantidade;
      return res.status(StatusCodes.CREATED).json(produtoExistente);
    }
    const novo: CompraDto = {
      id: v4(),
      usuarioID: usuarioID,
      produtoID: produtoID,
      quantidade: quantidade,
    };

    req.session.carrinho = req.session.carrinho || [];
    req.session.carrinho.push(novo);

    return res.status(StatusCodes.CREATED).json(novo);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

const read = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Mostra uma compra no carrinho com base no id da compra.'
  #swagger.parameters['compraID'] = { description: 'ID da compra' }
  #swagger.responses[200] = {
  schema: { $ref: '#/definitions/CompraDto' }
  }
  */
  const { compraID } = req.params;
  const carrinho = req.session.carrinho || [];
  try {
    const produtoExistente = carrinho.find((item) => item.id === compraID);
    if (produtoExistente) {
      return res.status(StatusCodes.OK).json(produtoExistente);
    } else {
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    }
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

const update = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Atualiza um item no carrinho.'
  #swagger.parameters['compraID'] = { description: 'ID da compra' }
  #swagger.parameters['body'] = {
  in: 'body',
  schema: { $ref: '#/definitions/QuantidadeCompra' }
  }
  #swagger.responses[200] = {
  schema: { $ref: '#/definitions/CompraDto' }
  }
  */
  const { compraID } = req.params;
  const { quantidade } = req.body;
  try {
    if (!quantidade || typeof quantidade !== "number" || quantidade < 1) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Quantidade inválida" });
    }

    const carrinho = req.session.carrinho || [];

    const compra = carrinho.find((item) => item.id === compraID);

    if (!compra) {
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    }

    compra.quantidade = quantidade;

    return res.status(StatusCodes.OK).json(compra);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

const remove = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Remove um item do carrinho.'
  #swagger.parameters['compraID'] = { description: 'ID da compra' }
  */
  const { compraID } = req.params;

  const carrinho = req.session.carrinho || [];
  try {
    const compra = carrinho.findIndex((item) => item.id === compraID);
    if (compra < 0) {
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    }
    req.session.carrinho = carrinho.splice(compra, 1);

    return res.status(StatusCodes.OK).json();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

const finish = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Finaliza a compra e salva os itens comprados no banco de dados.'
  #swagger.responses[200] = {
  schema: { $ref: '#/definitions/Compra' }
  }
  */
  const usuarioID = req.session.uid!;
  const carrinho = req.session.carrinho!;
  try {
    const inseridas = await finishCompra(usuarioID, carrinho);
    req.session.carrinho = [];
    res.status(StatusCodes.CREATED).json(inseridas);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

export default { index, create, read, update, remove, finish };
