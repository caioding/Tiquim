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

export const listPaymentMethod = async (
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
    throw new Error("Método de pagamento não encontrado");
  }
  return paymentMethods;
};

export const readPaymentMethod = async (
  id: string,
  req: Request,
): Promise<PaymentMethodDto | null> => {
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
    throw new Error("Usuário não autorizado a atualizar esta campanha");
  }
  return paymentMethod;
};

export const updatePaymentMethod = async (
  id: string,
  updatedPaymentMethod: CreatePaymentMethodDto,
  req: Request,
): Promise<PaymentMethodDto | null> => {
  const paymentMethod = await prisma.paymentMethod.findUnique({
    select: { userId: true },
    where: { id },
  });

  if (!paymentMethod) {
    throw new Error("Campanha não encontrada");
  }

  if (paymentMethod.userId !== req.session.uid) {
    throw new Error("Usuário não autorizado a atualizar esta campanha");
  }

  return await prisma.paymentMethod.update({
    where: { id },
    data: updatedPaymentMethod,
  });
};

export const deletePaymentMethod = async (id: string, req: Request): Promise<PaymentMethod> => {
  const paymentMethod = await prisma.paymentMethod.findUnique({
    select: { userId: true },
    where: { id },
  });

  if (!paymentMethod) {
    throw new Error("Campanha não encontrada");
  }

  if (paymentMethod.userId !== req.session.uid) {
    throw new Error("Usuário não autorizado a remover esta campanha");
  }
  return await prisma.paymentMethod.delete({ where: { id } });
};
