import { Request, Response } from "express";
import { PaymentMethod, PrismaClient } from "@prisma/client";
import { PaymentMethodDto, CreatePaymentMethodDto } from "./paymentMethod.types";

const prisma = new PrismaClient();

export const createPaymentMethod = async (
  paymentMethod: CreatePaymentMethodDto,
  req: Request,
): Promise<PaymentMethodDto> => {
  const userId = req.session.uid as string;
  return await prisma.paymentMethod.create({
    select: {
      id: true,
      type: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
    data: {
      ...paymentMethod,
      userId: userId,
    },
  });
};

export const listPaymentMethods = async (
  req: Request,
  skip?: number,
  take?: number,
): Promise<PaymentMethodDto[]> => {
  const paymentMethods = await prisma.paymentMethod.findMany({
    select: {
      id: true,
      type: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { userId: req.session.uid },
    skip,
    take,
  });
  if (!paymentMethods) {
    throw new Error("Nenhum método de pagamento foi encontrado");
  }
  return paymentMethods;
};

export const readPaymentMethod = async (id: string, req: Request): Promise<PaymentMethodDto> => {
  const paymentMethod = await prisma.paymentMethod.findUnique({
    select: {
      id: true,
      type: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { id },
  });
  if (!paymentMethod) {
    throw new Error("Método de pagamento não encontrado");
  }
  if (paymentMethod.userId !== req.session.uid) {
    throw new Error("Usuário não autorizado a visualizar este método de pagamento");
  }
  return paymentMethod;
};

export const updatePaymentMethod = async (
  id: string,
  updatedPaymentMethod: CreatePaymentMethodDto,
  req: Request,
): Promise<PaymentMethodDto> => {
  const paymentMethod = await prisma.paymentMethod.findUnique({
    select: { userId: true },
    where: { id },
  });

  if (!paymentMethod) {
    throw new Error("Método de pagamento não encontrado");
  }

  if (paymentMethod.userId !== req.session.uid) {
    throw new Error("Usuário não autorizado a atualizar este método de pagamento");
  }

  return await prisma.paymentMethod.update({
    where: { id },
    data: updatedPaymentMethod,
  });
};

export const deletePaymentMethod = async (id: string, req: Request): Promise<PaymentMethodDto> => {
  const paymentMethod = await prisma.paymentMethod.findUnique({
    select: { userId: true },
    where: { id },
  });

  if (!paymentMethod) {
    throw new Error("Método de pagamento não encontrado");
  }

  if (paymentMethod.userId !== req.session.uid) {
    throw new Error("Usuário não autorizado a remover este método de pagamento");
  }
  return await prisma.paymentMethod.delete({ where: { id } });
};
